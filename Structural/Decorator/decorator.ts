import { getKey } from "./api.js";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
    "X-RapidAPI-Key": getKey(),
  },
};

fetch(
  "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
