const rateLoader = require('../core/rates-loader');
const Rate = require('../services/Rate');
const makeGetRates = require('./get-rates');

module.exports = {
  getRates: async (httpRequest) => {
    // Simply a closure function to abstract away rates loader.
    const RateLoader = (base, currency) => new Rate(rateLoader, base, currency || null);

    return makeGetRates({ httpRequest, RateLoader });
  },
};
