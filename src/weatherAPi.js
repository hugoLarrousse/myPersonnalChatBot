

const request = require('request-promise');
const config = require('./config');


console.log('config.lang :', config.lang);
console.log('config.units :', config.units);
console.log('config.city :', process.env.WEATHER_API_KEY);

const weather = async (lang, units, city) => {
  const options = {
    url: process.env.WEATHER_CURRENT_URL,
    qs: {
      APPID: process.env.WEATHER_API_KEY,
      lang: lang || config.lang,
      units: units || config.units,  //celsius, fahrenheit.?...
      q: city || config.city, //to be change
    }
  }
  try {
    console.log('body :');
    const body = await request(options);
    console.log('body :', body);
    if (body) {
      return body;
    }
    return null;
  } catch (e) {
    throw new Error(e.error.message);
  }
}

exports.weather = weather;