const Util = require('./util');

const googleDirectionLinks = {
  // return latLon object if can extract otherwise null
  extractLatLon(text) {
    const found = text.match(/(-?\d+.?\d+),(-?\d+.?\d+)/);
    if (found) {
      return { lat: Number(found[1]), lon: Number(found[2]) };
    }
    return null;
  },
  extractFromGoogleDirectionsLink(url) {
    const params = (new URL(url)).searchParams;
    const locationFound = [];
    params.forEach((value, key) => {
      // eslint-disable-next-line max-len
      const found = key.match(/query|query_place_id|origin|origin_place_id|destination|destination_place_id|center|viewpoint|waypoints|waypoint_place_id/);
      if (found) {
        // if value is a lat long pair
        const latLon = this.extractLatLon(value);
        if (latLon) {
          locationFound.push(latLon);
        } else {
          locationFound.push({ [key]: decodeURIComponent(value).replace(/\+/g, ' ') });
        }
      }
    });
    return locationFound;
  },
  extractFromGoogleMapLinks(url) {
    let locationFound = null;
    const found = url.match(/(place|dir)\/+(.+)\/@(-?\d+.?\d+),(-?\d+.?\d+)/);
    if (found) {
      locationFound = {};
      if (found[1] != undefined && found[2] != undefined) {
        locationFound.name = decodeURIComponent(found[2]).replace(/\+/g, ' ');
      }
      if (Number(found[3]) && Number(found[4])) {
        locationFound.lat = Number(found[3]);
        locationFound.lon = Number(found[4]);
      }
    }
    return locationFound;
  },
  scrapeLocation({ url }) {
    url.replace(/(\r\n|\n|\r)/gm, '');
    let locationData = [];
    if (Util.validateGoogleMapLink(url)) {
      locationData = locationData.concat(this.extractFromGoogleDirectionsLink(url));
      locationData.push(this.extractFromGoogleMapLinks(url));
    }
    const result = Util.formatData(locationData, 'ggMap');
    if (result.length) {
      return result;
    }
    return [];
  },


};

module.exports = googleDirectionLinks;
