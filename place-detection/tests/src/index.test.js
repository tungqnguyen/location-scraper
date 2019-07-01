/* eslint-disable no-undef */
const placeDetection = require('@alpaca-travel/place-detection');

describe('Extract from Web resource/jsonLd strategy', () => {
  test('Will parse in a web url', async () => {
    expect.assertions(1);
    const url = 'https://www.visitnsw.com/destinations/outback-nsw/broken-hill-area/broken-hill/attractions/broken-hill-regional-art-gallery';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -31.956376975, lon: 141.468313336, score: 8, foundFrom: [{ source: 'ggMap', count: 4 }],
    }, {
      lat: -31.9574, lon: 141.4651, score: 2, foundFrom: [{ source: 'generalRegEx', count: 2 }],
    }, {
      lat: -31.9594976, lon: 141.4634907, score: 2, foundFrom: [{ source: 'generalRegEx', count: 2 }],
    }, {
      lat: -31.9567631, lon: 141.4629789, score: 2, foundFrom: [{ source: 'generalRegEx', count: 2 }],
    }]);
  });

  test('extract lat/lon from another web url', async () => {
    expect.assertions(1);
    const url = 'https://www.bendigotourism.com/tours/bendigo-cbd/discovery-science-technology-centre';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -36.7656786, lon: 144.2822309, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }]);
  });

  test('extract lat/lon from another web url', async () => {
    expect.assertions(1);
    const url = 'https://www.broadsheet.com.au/sydney/restaurants/icebergs';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -33.895161, lon: 151.27436, score: 2, foundFrom: [{ source: 'generalRegEx', count: 2 }],
    }]);
  });

  test('extract lat/lon from another web url', async () => {
    expect.assertions(1);
    const url = 'https://www.timeout.com/sydney/restaurants/rockpool-bar-grill';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -33.866202, lon: 151.210188, score: 6, foundFrom: [{ source: 'generalRegEx', count: 3 }, { source: 'jsonLd', count: 1 }], name: 'Rockpool Bar & Grill', path: 'jsonLd[0]', location: '66 Hunter St Sydney 2000 AU ',
    }]);
  });

  test('extract lat/lon inside jquery functions from web url ', async () => {
    expect.assertions(1);
    const url = 'https://www.penguins.org.au/';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -38.48987570840978, lon: 145.20252227783203, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }]);
  });

  test('extract lat/lon from uberEats', async () => {
    expect.assertions(1);
    const url = 'https://www.ubereats.com/en-AU/melbourne/food-delivery/derby-thai-caulfield/IWlmsFA2TEeHPvGGqtkbbg/';
    const data = await placeDetection.scrape({ url });
    expect(data[0]).toEqual({
      lat: -37.876475, lon: 145.041992, score: 5, foundFrom: [{ source: 'generalRegEx', count: 2 }, { source: 'jsonLd', count: 1 }], name: 'Derby Thai Caulfield', path: 'jsonLd[0]', location: '4 Derby Rd Caulfield East VIC 3145 AU ',
    });
  }, 10000);

  test('extract from hotels.com', async () => {
    expect.assertions(1);
    const url = 'https://au.hotels.com/ho475465/?q-check-out=2019-05-27&FPQ=3&q-check-in=2019-05-26&WOE=1&WOD=7&q-room-0-children=0&pa=1&tab=description&JHR=2&q-room-0-adults=2&YGF=2&MGT=1&ZSX=0&SYE=3';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -37.80929, lon: 144.962711, score: 4, foundFrom: [{ source: 'generalRegEx', count: 1 }, { source: 'jsonLd', count: 1 }], name: 'Brady Hotel Central Melbourne', path: 'jsonLd[0]', location: 'Australia Melbourne VIC 3000 30 Little La Trobe Street ',
    }]);
  }, 10000);

  test('extract from The Royal Melbourne Hospital ', async () => {
    expect.assertions(1);
    const url = 'https://www.thermh.org.au/contact';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -37.799615, lon: 144.956562, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.7988963, lon: 144.9550146, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.798052, lon: 144.956896, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.7788135, lon: 144.9467542, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.778827, lon: 144.948609, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.778646, lon: 144.947702, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }, {
      lat: -37.777899, lon: 144.947358, score: 1, foundFrom: [{ source: 'generalRegEx', count: 1 }],
    }]);
  });
});

describe('Google Directions Strategy', () => {
  test('Will parse a variation of get directions by URL', async () => {
    const url = 'https://www.google.com/maps/dir/?api=1&destination=-33.4545414,151.28826979999997';
    const data = await placeDetection.scrape({ url });
    expect(data)
      .toEqual([{
        lat: -33.4545414, lon: 151.28826979999997, score: 2, foundFrom: [{ source: 'ggMap', count: 1 }],
      }]);
  });

  test('Will parse a google directions URL directly from google', async () => {
    const url = 'https://www.google.com/maps/dir//Alpaca+Travel,+17+Marine+Parade,+Abbotsford+VIC+3067/@-37.8034086,144.9986108,17z/data=!4m16!1m6!3m5!1s0x6ad643016be71877:0x19e583e4d05be942!2sAlpaca+Travel!8m2!3d-37.8034129!4d145.0007995!4m8!1m0!1m5!1m1!1s0x6ad643016be71877:0x19e583e4d05be942!2m2!1d145.0007995!2d-37.8034129!3e2';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      name: 'Alpaca Travel, 17 Marine Parade, Abbotsford VIC 3067', lat: -37.8034086, lon: 144.9986108, score: 2, foundFrom: [{ source: 'ggMap', count: 1 }],
    }]);
  });

  test('Will parse a variation of get directions by URL with transportation mode', async () => {
    const url = 'https://www.google.com/maps/dir/?api=1&destination=-41.4340812,147.1373496&travelmode=driving';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      lat: -41.4340812, lon: 147.1373496, score: 2, foundFrom: [{ source: 'ggMap', count: 1 }],
    }]);
  });

  test('Will parse a google directions with multiple waypoints URL directly from google', async () => {
    expect.assertions(1);
    const url = 'https://www.google.com/maps/dir/Alpaca+Travel,+17+Marine+Parade,+Abbotsford+VIC+3067/Springvale+Shopping+Centre,+Buckingham+Avenue,+Springvale+VIC/North+Richmond+Railway+Station%2FVictoria+St,+Abbotsford+VIC/@-37.8768995,145.002363,12z/data=!3m1!4b1!4m20!4m19!1m5!1m1!1s0x6ad643016be71877:0x19e583e4d05be942!2m2!1d145.0007995!2d-37.8034129!1m5!1m1!1s0x6ad614c79e989387:0x47033acb2317c96e!2m2!1d145.1510859!2d-37.9508086!1m5!1m1!1s0x6ad642e49494eb55:0x4338263b5794fc27!2m2!1d144.9929598!2d-37.8096854!3e2';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      name: 'Alpaca Travel, 17 Marine Parade, Abbotsford VIC 3067/Springvale Shopping Centre, Buckingham Avenue, Springvale VIC/North Richmond Railway Station/Victoria St, Abbotsford VIC', lat: -37.8768995, lon: 145.002363, score: 2, foundFrom: [{ source: 'ggMap', count: 1 }],
    }]);
  });

  test('Will parse a google map static URL', async () => {
    const url = 'http://maps.google.com/maps/api/staticmap?center=Rosalind+Park+Bendigo%2C+Bendigo+Central';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{ center: 'Rosalind Park Bendigo, Bendigo Central', score: 2, foundFrom: [{ source: 'ggMap', count: 1 }] }]);
  });

  test('Will parse a variation of get directions by URL with transportation mode', async () => {
    const url = 'https://www.google.com/maps/place/Back+Bar/@-37.8526825,144.9907765,17z/data=!4m5!3m4!1s0x6ad6683a5e3173fb:0x697ec54f5035747f!8m2!3d-37.853189!4d144.9927926';
    const data = await placeDetection.scrape({ url });
    expect(data).toEqual([{
      name: 'Back Bar', lat: -37.8526825, lon: 144.9907765, score: 2, foundFrom: [{ source: 'ggMap', count: 1 }],
    }]);
  });
});
