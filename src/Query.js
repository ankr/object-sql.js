'use strict';

const noop = _ => _;

/**
 * Query object
 */
module.exports = class Query {

  /**
   * Constructor
   */
  constructor() {
    this.selector = null;
    this.tables = [];
    this.conditions = [];
    this.groupers = [];
    this.sorter = null;
    this.filters = [];

    this.hasJoin = false;
  }

  /**
   * select
   *
   * @param {Function} selector
   * @return {this}
   */
  select(selector) {
    this.selector = selector || noop;

    return this;
  }

  /**
   * from
   *
   * @param {...Array} tables Tables to search
   * @return {this}
   */
  from(...tables) {
    if (this.tables.length > 0) {
      throw new Error('Tables already defined.');
    }
    this.tables = tables;

    if (tables.length > 1) {
      this.hasJoin = true;
    }

    return this;
  }

  /**
   * where
   *
   * @param {...Function} conditions
   * @return {this}
   */
  where(...conditions) {
    this.conditions.push(conditions);

    return this;
  }

  /**
   * group
   *
   * @param {...Function} groupers
   * @return {this}
   */
  group(...groupers) {
    if (!groupers || !groupers.length) {
      return this;
    }

    this.groupers = this.groupers.concat(groupers);

    return this;
  }

  /**
   * having
   *
   * @param {...Function} filters
   * @return {this}
   */
  having(...filters) {
    this.filters.push(filters);

    return this;
  }

  /**
   * order
   *
   * @param {Function} sorter
   * @return {this}
   */
  order(sorter) {
    this.sorter = sorter;

    return this;
  }

  /**
   * execute
   *
   * @return {Array}
   */
  execute() {
    let result = this.tables[0] || [];

    // Join tables - currently only supports two tables
    if (this.hasJoin) {
      result = this.tables[0].reduce((res, row) => {
        return res.concat(this.tables[1].map((r) => [row, r]));
      }, []);
    }

    // where()
    result = result.filter((row) => {
      return this.conditions.every((rules) => {
        return rules.some((rule) => rule(row));
      });
    });

    // group()
    if (this.groupers.length) {
      /** @recursive */
      const reducer = (buckets, i = 0) => {
        const grouper = this.groupers[i];

        if (!grouper) {
          return buckets;
        }

        return buckets.map((bucket) => {
          bucket[1] = bucket[1].reduce((res, row) => {
            const name = grouper(row);
            const group = res.find(e => e[0] === name);

            if (group) {
              group[1].push(row);
            } else {
              res.push([name, [row]]);
            }

            return res;
          }, []);

          return [bucket[0], reducer(bucket[1], i + 1)];
        });
      };

      result = reducer([['_root', result]])[0][1];
    }

    // having()
    if (this.filters.length) {
      result = result.filter((group) => {
        return this.filters.every((rules) => {
          return rules.some((rule) => rule(group));
        });
      });
    }

    // order()
    if (this.sorter) {
      result = result.sort(this.sorter);
    }

    // select()
    // First a check in case it was never called (it's optional)
    if (!this.selector) {
      this.selector = noop;
    }

    return result.map((row) => this.selector(row));
  }
}
