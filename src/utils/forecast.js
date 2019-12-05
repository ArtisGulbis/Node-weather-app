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
            const { temperature, precipProbability, icon } = body.currently;
            const { summary } = body.daily.data[0];
            callback(undefined, {
                summary,
                temperature,
                precipProbability,
                icon,
            });
            //`${summary} It is currently ${temperature} degrees out.There is a ${precipProbability} % chance of rain`
        }
    });
}

module.exports = forecast;