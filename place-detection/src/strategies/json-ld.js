/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
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
        const jsonLdObject = object['json-ld'];
        jsonLdObject.map((element, i) => {
          // this will return an array of object
          collection.push(this.extractObjects(element, allObjects = [], path = `jsonLd[${i}]`));
        });
        // filter location Object
        collection.map((el) => {
          locationObjects = el.filter((element, i) => types.includes(element['@type']));
          const locationInfo = [];
          const placeName = [];
          locationObjects.map((obj) => {
            latLonObject = {};
            destinationObject = {};
            if (obj['@type'].indexOf('PostalAddress') >= 0) {
              destinationObject.location = this.concatAddress(obj);
              destinationObject.path = obj.path;
              locationInfo.push(destinationObject);
            } else if (obj['@type'].indexOf('GeoCoordinates') >= 0) {
              latLonObject.lat = obj.latitude;
              latLonObject.lon = obj.longitude;
              latLonObject.path = obj.path;
              locationInfo.push(latLonObject);
            } else if (obj.name) {
              destinationName = {};
              destinationName.name = obj.name;
              destinationName.path = obj.path;
              placeName.push(destinationName);
            }
          });
          // now we have an array with @GeoCoordinates and @PostalAddress types
          placeName.map((placeObject) => {
            locationInfo.map((v) => {
              // match everything up to the last "."
              const parentPath = v.path.match(/.*\./i)[0].slice(0, -1);
              if (placeObject.path.indexOf(parentPath) >= 0) {
                // combine object
                Object.keys(v).map((key) => {
                  if (!key.includes('path')) {
                    placeObject[key] = v[key];
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
      console.log('error found', error);
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
