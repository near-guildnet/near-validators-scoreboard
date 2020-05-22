const axios = require("axios");
const fs = require("fs");

const URL = "http://localhost:3000/api/countries";

async function apiRequest(url) {
  return await axios.get(url);
}

const getData = async (url) => {
  try {
    const response = await apiRequest(url);
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getData(URL);

// const delayInterval = setInterval(apiCall, 2000, url);

// setTimeout(() => {
//   clearInterval(delayInterval);
//   console.log("stop");
// }, 6000);

// Ex1
// const asyncFunc = async () => {
//   for (let i = 0; i < 5; i++) {
//     console.log("index: ", i);
//     await delayPromise(1000);
//   }
// };
// const delayPromise = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// asyncFunc();
