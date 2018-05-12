const request = require('request');

function getWeather(address, lat, lng) {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/57e3d1c023f235197ab8fe1a8380e5f3/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve({
          address,
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        reject('Unable to fetch weather.');
      }
    });
  });
}

module.exports = {
  getWeather
};
