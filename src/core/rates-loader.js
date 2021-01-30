/* eslint-disable import/no-dynamic-require, global-require, no-param-reassign */
const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * Helper function to create date for cache files.
 */
function getISODate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Fetch a rate from the cache if it already exists.
 * @param {string} base currency base
 */
function resolveRatesFromCache(base) {
  const filePath = path.resolve(__dirname, '../../_cache', `${base}-${getISODate()}.json`);
  // check for cache existence.
  if (!fs.existsSync(filePath)) return null;

  return require(filePath);
}

/**
 * Save a new rate with date to cache.
 *
 * @param {string} base currency base.
 * @param {Object} data response from Rate API
 */
function saveRatesToCache(base, data) {
  const filePath = path.resolve(__dirname, '../../_cache', `${base}-${getISODate()}.json`);
  // check for cache existence.
  if (fs.existsSync(filePath)) return null;

  // write to cache.
  fs.writeFileSync(filePath, JSON.stringify(data));
  return true;
}

/**
 * The Rate Loader Module.
 * @param {string} base currency base.
 */
module.exports = async function ratesLoader(base = 'EUR') {
  base = base.toUpperCase();

  // A little optimization with caching.
  const ratesFromCache = resolveRatesFromCache(base);
  if (ratesFromCache) return ratesFromCache;

  const URL = `https://api.exchangeratesapi.io/latest?base=${base}`;

  try {
    const { data } = await axios.get(URL); // get rates from API in currency base,
    if (!data.rates) throw new Error('Unrecognized currency base.');

    // save to cache for future optimization
    saveRatesToCache(base, data.rates);

    return data.rates;
  } catch (error) {
    throw new Error(`We cannot process ${base} base currency`);
  }
};
