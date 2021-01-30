module.exports = async function makeGetRates({ httpRequest, RateLoader }) {
  // call rates services.
  const { query } = httpRequest;

  const base = query.base || 'EUR'; // Euro as the default base.
  const currency = query.currency || null; // get desired currency in result.

  const rateLoader = RateLoader(base, currency);
  try {
    const rates = (await rateLoader.loadRates()).get();

    return {
      body: {
        results: {
          base,
          date: new Date().toISOString().split('T')[0],
          rates,
        },
      },
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (exception) {
    return {
      body: { error: exception.message || `A temporary error occured on the server.` },
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
