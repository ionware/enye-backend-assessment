// eslint-disable-next-line no-unused-vars
function getRates(base, currency) {
  // call rates services.

  return {
    rates: {
      EUR: 1.54322434,
      CZK: 2.33443345,
    },
  };
}

module.exports = {
  getRates: async (httpRequest) => {
    const { query } = httpRequest;

    return {
      body: { result: getRates(), query },
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  },
};
