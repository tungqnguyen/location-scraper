/* eslint-disable global-require */
const strategies = [require('./strategies/googleMap'), require('./strategies/general-regEx'), require('./strategies/json-ld')];
const Util = require('./strategies/util');


const scrape = async (data, options = {}) => {
  let locationCollection = [];
  const locationData = await Promise.all(strategies.map(strategy => strategy.scrapeLocation(data, options)));
  locationData.map((collection) => {
    locationCollection = locationCollection.concat(collection);
  });
  return Util.sortLocationData(locationCollection);
};
const scrapeUrl = async (url, options = {}) => scrape({ url }, options);

const scrapeHtml = async (html, options = {}) => scrape({ html }, options);

exports.scrape = scrape;
exports.scrapeHtml = scrapeHtml;
exports.scrapeUrl = scrapeUrl;
