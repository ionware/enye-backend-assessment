/* eslint-disable no-underscore-dangle */
class Rate {
  /**
   * Constructor function.
   *
   * @param {string} base the base currency
   * @param {string} currency the currencies user want to have returned.
   * @param {function} loader the mechnasim used to fetch currency rates
   */
  constructor(loader, base = 'EUR', currency = null) {
    this.base = base;

    // currency must be typeof string.
    if (currency && typeof currency !== 'string')
      throw new Error('Expected currency parameter to be a string');

    this.currency = currency; // the currencies needed as rate

    // set rates to an empty object
    this.rates = Object.create(null);

    /**
     * the loader is the mechanism we use to get rates. (Seperation of Concern)
     * so our code can be easily tested.
     */
    this.loader = loader;
  }

  /**
   * Get whatever rate was fetched.
   */
  get() {
    if (!this.currency) return this.rates;

    // Select only currency rate(s) requested.
    return this.currency
      .split(',')
      .map((currency) => currency.trim().toUpperCase())
      .reduce(
        (currencies, currency) => ({
          ...currencies,
          [currency]: this.rates[currency],
        }),
        {}
      );
  }

  /**
   * Load rates from loader.
   */
  async loadRates() {
    // get rates from API exchange
    const result = await this.loader(this.base);

    // ensure rate is in correct data type.
    if (!(result && result instanceof Object))
      throw new Error('Invalid value for rate returned from rate Loader.');

    this.rates = result;

    return this;
  }
}

module.exports = Rate;
