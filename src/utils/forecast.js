const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8d6966836d56ee600d645d08f0100da7&query=" +
    latitude +
    "," +
    longitude +
    "&unit=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}.`
      );
    }
  });
};

module.exports = forecast;
