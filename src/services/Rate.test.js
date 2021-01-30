const Rate = require('./Rate');
const loader = require('../core/rates-loader');

describe('The Rate service', () => {
  test('load rates from API with specified loader', async () => {
    const rate = new Rate(loader);
    await rate.loadRates();
    const response = rate.get();

    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('USD');
  });

  test('return rate for only one currency', async () => {
    const rate = new Rate(loader, 'eur', 'usd');
    await rate.loadRates();
    const response = rate.get();

    expect(Object.keys(response)).toHaveLength(1);
    expect(response).toHaveProperty('USD');
    expect(response).not.toHaveProperty('CAD');
  });

  test('return rates for multiple currencies', async () => {
    const rate = new Rate(loader, 'eur', 'usd,cad, inr');
    await rate.loadRates();
    const response = rate.get();

    expect(Object.keys(response)).toHaveLength(3);
    expect(Object.keys(response)).toEqual(expect.arrayContaining(['USD', 'CAD', 'INR']));
    expect(response).not.toHaveProperty('GBP');
  });

  test('spazz out for unrecognized currency', async () => {
    const rate = new Rate(loader, 'unrecognized');

    await expect(async () => {
      await rate.loadRates();
    }).rejects.toThrow();
  });
});
