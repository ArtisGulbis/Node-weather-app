const request = require('request');

const forecast = (lat, lon, lang, callback) => {

    const options = `?units=si&lang=${lang}`;
    const url = `https://api.darksky.net/forecast/5cdffbdc5e31022ee322447c2f895fea/${lat},${lon}${options}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const { summary, moonPhase, temperatureLow, temperatureHigh, } = body.daily.data[1];
            const { temperature, time } = body.currently
            const timezone = body.timezone
            callback(undefined, {
                time,
                timezone,
                summary,
                moonPhase,
                temperatureLow,
                temperatureHigh,
                temperature
            });
        }
    });
}

module.exports = forecast;