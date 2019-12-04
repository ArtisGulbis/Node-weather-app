const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJ0dXgyOCIsImEiOiJjazNwcjdlNmwwNXBwM21tb3FmNGo3czdzIn0.xat60LDr5hblvB9Bq0-bAw&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            //const { latitude, longitude, location } = response.body.features[0];
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geoCode;