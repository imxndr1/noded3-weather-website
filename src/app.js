const path = require("path");
const express = require("express");
const hbs = require("hbs");
// const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Alexander Sazon",
    end: "Come and Explore!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Alexander Sazon",
    end: "That's all about me!",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "Heeeeeeelp",
    info: "I'm here to help you if you want!",
    name: "Alexander Sazon",
    end: "If there's any problem, I'm willing to help!",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>WEATHER</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Alex",
//       age: 25,
//     },
//     {
//       name: "Sarah",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  // console.log(req.query.address);
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        return res.send({
          location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("page404", {
    title: "404",
    name: "Alexande Sazon",
    errorMessage: "Help article not found",
  });
});
// * wild card sign that if the request details above not show in the list it will enter here in the wild card * where all request are accept here.
app.get("*", (req, res) => {
  res.render("page404", {
    title: "404",
    name: "Alexander Sazon",
    errorMessage: "Page not found",
  });
});

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
