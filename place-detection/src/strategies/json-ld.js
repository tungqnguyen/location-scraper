/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
const axios = require('axios');
const types = require('./place_types_in_schema_org');
const Util = require('./util');

const jsonLd = {
  async scrapeLocation({ url }) {
    try {
      const response = await axios.get('https://gko60c14wf.execute-api.ap-southeast-2.amazonaws.com/dev',
        { crossdomain: true, params: { url } });
      const object = response.data;
      const collection = [];
      const locationCollection = [];
      if (object.hasOwnProperty('json-ld')) {
        const jsonLdArray = object['json-ld'];
        jsonLdArray.map((element, i) => {
          // this will return an array of object
          collection.push(this.extractObjects(element, [], `jsonLd[${i}]`));
        });
        // filter location Object
        collection.map((el) => {
          // only take object with types relate to places
          const locationObjects = el.filter((element, i) => types.includes(element['@type']));
          const locationInfo = [];
          const placeName = [];
          locationObjects.map((obj) => {
            const latLonObject = {};
            const destinationObject = {};
            // get full address and lat/lon of the place object
            if (obj['@type'].indexOf('PostalAddress') >= 0) {
              destinationObject.location = this.concatAddress(obj);
              destinationObject.path = obj.path;
              locationInfo.push(destinationObject);
            } else if (obj['@type'].indexOf('GeoCoordinates') >= 0) {
              latLonObject.lat = obj.latitude;
              latLonObject.lon = obj.longitude;
              latLonObject.path = obj.path;
              locationInfo.push(latLonObject);
              // get name of place of the object
            } else if (obj.name) {
              const destinationName = {};
              destinationName.name = obj.name;
              destinationName.path = obj.path;
              placeName.push(destinationName);
            }
          });
          // now we have an array with @GeoCoordinates and @PostalAddress types
          placeName.map((placeObject) => {
            locationInfo.map((element) => {
              // match everything up to the last "." to check if name object matches any lat/lon pair or geo coordinates
              const parentPath = element.path.match(/.*\./i)[0].slice(0, -1);
              if (placeObject.path.indexOf(parentPath) >= 0) {
                // combine object
                Object.keys(element).map((key) => {
                  if (!key.includes('path')) {
                    placeObject[key] = element[key];
                  }
                });
              }
            });
            locationCollection.push(placeObject);
          });
        });
      }
      const result = Util.formatData(locationCollection, 'jsonLd');
      if (result.length) {
        return result;
      }
      return [];
    } catch (error) {
      console.log('jsonLd error', error);
    }
  },
  extractObjects(object, allObjects, path) {
    object.path = path;
    allObjects.push(object);
    Object.keys(object).map((key, i) => {
      if (typeof object[key] === 'object') {
        return this.extractObjects(object[key], allObjects, `${path}.${key}`);
      }
    });
    return allObjects;
  },
  concatAddress(addressObject) {
    let address = '';
    const addressProps = ['addressCountry', 'addressLocality', 'addressRegion', 'postOfficeBoxNumber', 'postalCode', 'streetAddress'];
    Object.keys(addressObject).map((key) => {
      if (addressProps.includes(key)) {
        address = `${address + addressObject[key]} `;
      }
    });
    return address;
  },
};


module.exports = jsonLd;
