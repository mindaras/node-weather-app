const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
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

geocode.geocodeAddress(argv.address)
  .then(response => {
    return weather.getWeather(response.address, response.latitude, response.longitude);
  })
  .then(response => {
    let responseString = `It's currently ${response.temperature} degrees in ${response.address}`;

    if (parseInt(response.temperature) !== parseInt(response.apparentTemperature)) {
      responseString += `, but it feels like ${response.apparentTemperature}.`;
    } else {
      responseString += '.';
    }

    console.log(responseString);
  })
  .catch(error => console.log(error));
