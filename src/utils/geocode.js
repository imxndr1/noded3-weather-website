const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaW14bmRyMSIsImEiOiJja3E4MHNyOWkwMW1hMm9udGlleWl4dDI0In0.ytowVcv3-ZePgCAXcog86g&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find the location, try again with different search item",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
