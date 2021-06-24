console.log("Client side Javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

fetch("http://localhost:3000/weather?address=!").then((response) => {
  response.json().then((info) => {
    if (info.error) {
      console.log("Unable to find the location. Use another search term");
    } else {
      //   console.log(info);
      console.log(info.location);
      console.log(info.forecast);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
// messageOne.textContent = "From Javascript";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  if (!location) {
    return (messageOne.textContent = "You must provide an address!");
  }
  const url = "http://localhost:3000/weather?address=" + location;

  fetch(url).then((response) => {
    response.json().then((info) => {
      if (info.error) {
        messageOne.textContent =
          "Unable to find the location. Use another search term";
      } else {
        //   console.log(info);
        messageOne.textContent = info.location;
        messageTwo.textContent = info.forecast;
      }
    });
  });
});
