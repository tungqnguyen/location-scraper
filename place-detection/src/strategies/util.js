/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
// return an array of location object with source
const Util = {
  formatData(locDataList, source) {
    return locDataList.filter((el) => {
      if (el != null) {
        switch (source) {
          case 'generalRegEx':
            el.score = 1;
            break;
          case 'ggMap':
            el.score = 2;
            break;
          case 'jsonLd':
            el.score = 3;
            break;
          default:
            el.score = -1;
        }
        el.foundFrom = [{
          source,
          count: 1,
        }];
        return el;
      }
    });
  },
  validateGoogleMapLink(url) {
    return /google.*?\.com\/maps.+/.test(url);
  },
  sortLocationData(locationList) {
    const sortedList = [];
    locationList.map((element) => {
      if (sortedList.length > 0) {
        // if current lat/lon is not in list
        const foundLatLon = this.existLatLon(element, sortedList);
        if (!foundLatLon.exist) {
          sortedList.push(element);
        // if item is already in list, combine the source, add rank and add counter to the corresponding source object
        } else {
          const found = sortedList[foundLatLon.index];
          let sourceOverlap = false;
          found.foundFrom.map((item, idx) => {
            if (item.source.includes(element.foundFrom[0].source)) {
              found.foundFrom[idx].count += 1;
              sourceOverlap = true;
            }
          });
          if (!sourceOverlap) {
            found.foundFrom.push({
              source: element.foundFrom[0].source,
              count: element.foundFrom[0].count,
            });
          }
          // add new key(s)
          Object.keys(element).map((key) => {
            if (!found.hasOwnProperty(key)) {
              found[key] = element[key];
            }
          });
          found.score += element.score;
        }
      // push if list is empty
      } else {
        sortedList.push(element);
      }
    });
    sortedList.sort((a, b) => (a.score < b.score ? 1 : -1));
    return sortedList;
  },
  // check if lat/lon pair exist in array
  existLatLon(locationObject, array) {
    let exist = false;
    let index = null;
    array.map((item, i) => {
      if (locationObject.hasOwnProperty('lat') && locationObject.hasOwnProperty('lon') && locationObject.lat == item.lat && locationObject.lon == item.lon) {
        exist = true;
        index = i;
      }
    });
    return {
      exist,
      index,
    };
  },
};

module.exports = Util;
