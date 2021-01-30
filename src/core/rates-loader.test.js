const ratesLoader = require('./rates-loader');

describe('Rates loader', () => {
  test('loads rates correctly from API with EUR as base currency', async () => {
    const result = await ratesLoader();

    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('USD');
  });

  test('throws an error for unrecognized base currency', async () => {
    const fetchRates = async () => {
      await ratesLoader('UNRECOGIZED');
    };

    await expect(fetchRates).rejects.toThrow();
  });
});
