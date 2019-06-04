const strategies = [require('./strategies/googleMap'), require('./strategies/general-regEx'), require('./strategies/json-ld')];
const Util = require('./strategies/util')
const scrapeUrl = async (url, options = {}) => {
    return scrape({url}, options);
  };
  
const scrapeHtml = async (html, options = {}) => {
    return scrape({html}, options);
  };

const scrape = async (data, options={}) => {
  let locationCollection =  [];
  let locationData = await Promise.all(strategies.map(strategy => strategy.scrapeLocation(data, options)));
  locationData.map((collection) => {
    locationCollection = locationCollection.concat(collection);
  })
  return Util.sortLocationData(locationCollection);
}

exports.scrape = scrape;
exports.scrapeHtml = scrapeHtml;
exports.scrapeUrl = scrapeUrl;