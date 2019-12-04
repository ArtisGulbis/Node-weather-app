const request = require('request');

const forecast = (lat, lon, callback) => {

    const options = '?units=si';
    const url = `https://api.darksky.net/forecast/5cdffbdc5e31022ee322447c2f895fea/${lat},${lon}${options}`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const { temperature, precipProbability } = body.currently;
            const { summary } = body.daily.data[0];
            callback(undefined, `${summary} It is currently ${temperature} degrees out.There is a ${precipProbability} % chance of rain`);
        }
    });
}

module.exports = forecast;