const cheerio = require('cheerio')
const axios = require('axios')
const googleDirectionLinks = require('./googleMap')
const Util = require('./util')
// const validate = require('./validate-url')
const generalRegEx = {
    async scrapeLocation({url}) {
        if(Util.validateGoogleMapLink(url)) { return [] }
        try {
            url.replace(/(\r\n|\n|\r)/gm,"");
            const response = await axios.get(url,{crossdomain: true})
            const data = response.data
            // load html markup to cheerio for transversing html structure
            const $ = cheerio.load(data,{decodeEntities: false})
            // convert to string
            const textContent = $.html();
            let locationData = []
            //find lat/lon values
            const REGEX = /(lat|lon|lng)[^{};]*?(=|:)"*?\s?(-?\d+\.?\d+)/ig
            let found = REGEX.exec(textContent)
            let locObj = {}
            while (found != null) {
                key = found[1]
                value = found[3]
                //check if lat/lon is valid
                if (-90 < Number(value) && Number(value) < 90) {
                    locObj.lat = Number(value);
                }
                else if (-180 < Number(value) && Number(value) < 180) {
                    if(locObj.hasOwnProperty('lat')) {
                        locObj.lon = Number(value);
                        locationData.push(locObj);
                        locObj= {}
                    }
                }
                found = REGEX.exec(textContent);
            }
            //find latLon pair hiding under functions or other patterns
            const PAIRLOCREGEX = /(lat(lo?ng?)?)\("*?\s?(-?\d+\.?\d+),\s?(-?\d+\.?\d+)/igm
            let foundPair = PAIRLOCREGEX.exec(textContent);
            while (foundPair != null) {
                locationData.push({lat: Number(foundPair[3]), lon: Number(foundPair[4])});
                foundPair = PAIRLOCREGEX.exec(textContent);
            }
            let result = Util.formatData(locationData, 'generalRegEx');
            const ggMapLinks  = $("[href]")
            ggMapLinks.each((index, el) => {
                // found all links in html
                let url = $(el).attr('href').toString()
                // check for google map direction link
                if (Util.validateGoogleMapLink(url)) {
                    result = result.concat(googleDirectionLinks.scrapeLocation({url}));
                }
            })
            if (result.length) {
                return result;
            }        
            return [];
        } catch (error) {
            console.log('regEx', error);
        }
    }

}

module.exports = generalRegEx