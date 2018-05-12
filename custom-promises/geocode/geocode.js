const request = require('request');

function geocodeAddress(address) {
  const encodedAddress = encodeURIComponent(address);

  return new Promise((resolve, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCVgj9r7EO05v6sGpa5HmnBQZjr49nzOuc`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find the address.');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
}

module.exports = {
  geocodeAddress
};
