//return an array of location object with source
const Util = {
    formatData(locDataList, source) {
        return locDataList.filter(el => {
            if (el != null) {
                switch (source) {
                    case "generalRegEx":
                        el.rank = 1;
                        break;
                    case "ggMap":
                        el.rank = 2;
                        break;
                    case "jsonLd":
                        el.rank = 3;
                        break;
                    default:
                        el.rank = -1;
                }
                el.foundFrom = [{
                    source,
                    count: 1
                }];
                return el;
            }
        });
    },
    validateGoogleMapLink(url) {
        return /google.*?\.com\/maps.+/.test(url);
    },
    sortLocationData(locationList) {
        let sortedList = [];
        locationList.map(element => {
            if (sortedList.length > 0) {
                //if current lat/lon is not in list
                let foundLatLon = this.existLatLon(element, sortedList);
                if (!foundLatLon.exist) {
                    sortedList.push(element);
                }
                //if item is already in list, combine the source, add rank and add counter to the corresponding source object
                else {
                    let found = sortedList[foundLatLon.index];
                    let sourceOverlap = false;
                    found.foundFrom.map((item, idx) => {
                        if (item.source.includes(element.foundFrom[0].source)) {
                            found.foundFrom[idx].count++;
                            sourceOverlap = true;
                        }
                    });
                    if (!sourceOverlap) {
                        found.foundFrom.push({
                            source: element.foundFrom[0].source,
                            count: element.foundFrom[0].count
                        });
                    }
                    //add new key(s)
                    Object.keys(element).map(key => {
                        if (!found.hasOwnProperty(key)) {
                            found[key] = element[key];
                        }
                    });
                    debugger;
                    found.rank = found.rank + element.rank;
                }
            } else {
                sortedList.push(element);
            }
        });
        sortedList.sort((a, b) => {
            return a.rank < b.rank ? 1 : -1;
        });
        return sortedList;
    },
    // check if lat/lon pair exist in array
    existLatLon(locationObject, array) {
        let exist = false;
        let index = null;
        array.map(function (item, i) {
            if (locationObject.lat == item.lat && locationObject.lon == item.lon) {
                exist = true;
                index = i;
            }
        });
        return {
            exist,
            index
        };
    }
};

module.exports = Util;