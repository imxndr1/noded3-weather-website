const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

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
    textMessage: "I'm here to help you if you want!",
    name: "Alexander Sazon",
    end: "If there's any problem, I'm willing to help!",
  });
});

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
app.get("*", (req, res) => {
  res.render("page404", {
    title: "404",
    name: "Alexander Sazon",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
