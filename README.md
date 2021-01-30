## Enye Backend Assessment
It is simple and straightforward—just a basic API on Express framework with a single `rate` endpoint.
> Test it live on https://enye-bk.herokuapp.com/api/rates

### Made with (and on)
~~Noteworthy~~ tools that were used
- NodeJS
- Express.js Framework
- Axios
- Jest

### Getting it to run on your machine
Get it to run in 3 steps. Of course, I assume that you have Node and NPM installed on your machine already.
If you don't, visit [Node.js depot](https://nodejs.org/en/download/) to download or just Google the guide.
1. Clone the repository, and navigate into the folder
   ```git
   git clone https://github.com/ionware/enye-backend-assessment.git && cd enye-backend-assessment
   ```
2. Install dependencies
   ```npm
   npm install
   ```
3. Start the server
   ```npm
   npm start
   ```
### The Endpoint
Sorry, I cannot provide a Open API specification guide (fka Swagger doc) for this API, so, to get the rates, simply make a 

<p>`GET /api/rates` request to the server, and your expected response will be in the format described below

```json
{
  "results": {
    "base": "EUR",
    "date": "2021-01-30",
    "rates": {
      "CZK": 0.35457343,
      "INR": 1.2477434,
      // ... and more
    }
  }
}
```

#### Supported Query Parameters
1. You can set the `base` currency. The default base is `EUR`. **Beware of limited currency is supported, if you specify an unsupported currency, you will get an response of `404`**.
   ```http
   GET /api/rates?base=USD
   ```
2. You can specify the currency you want the rates in, or comma seperated list of currencies.
   ```http
   GET /api/rates?currency=USD
   ```
   or
   ```http
   GET /api/rates?currency=USD,INR,CZK
   ```

### What I did differently (maybe?)
Aside from the fact that my code architecture is elegant, scalable, and my core modules (including my controller) are unopinionated about the framework (Express in this case), I optimized request time and reduced bandwidth with Caching (or call it memoization) in the rate loader module.
Instead of loading the rates from external API, all the time request is made (which is bad in our case), why not Cache it with date validity. That was what I did, and you can [check the rate loader module](src/core/rates-loader.js) for this implementation.

### Thank you!
For taking the time to check out my work, I'd love your honest feedback (code review).