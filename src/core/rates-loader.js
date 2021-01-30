const axios = require('axios');

module.exports = async function ratesLoader(base = 'EUR') {
  const URL = `https://api.exchangeratesapi.io/latest?base=${base}`;

  const { data } = await axios.get(URL); // get rates from API in currency base,
  if (!data.rates) throw new Error('Unrecognized currency base.');

  return data.rates;
};
