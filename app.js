const yargs = require('yargs'),
      axios = require('axios'),
      argv = yargs
              .options({
                a: {
                  demand: true,
                  alias: 'address',
                  describe: 'Address to fetch weather for',
                  string: true
                }
              })
              .help()
              .alias('help', 'h')
              .argv;

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&key=AIzaSyCVgj9r7EO05v6sGpa5HmnBQZjr49nzOuc`)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find the address.');
    }

    let address = response.data.results[0].formatted_address,
        lat = response.data.results[0].geometry.location.lat,
        lng = response.data.results[0].geometry.location.lng;

    console.log(`Address: ${address}`);

    return axios.get(`https://api.darksky.net/forecast/57e3d1c023f235197ab8fe1a8380e5f3/${lat},${lng}`)
  })
  .then(response => {
    let temperature = response.data.currently.temperature,
        apparentTemperature = response.data.currently.apparentTemperature,
        responseString = `It's currently ${temperature} degrees`;

    if (parseInt(temperature) !== parseInt(apparentTemperature)) {
      responseString += `, but it feels like ${apparentTemperature}.`;
    } else {
      responseString += '.';
    }

    console.log(responseString);
  })
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.');
    } else {
      console.log(error.message);
    }
  })
