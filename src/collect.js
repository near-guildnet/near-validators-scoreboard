const axios = require("axios");
const fs = require("fs");
const process = require("process");

const NEAR_RPC_URL = process.env.NEAR_RPC_URL || "https://rpc.openshards.io/";

async function getValidators(url, blockHeight) {
  const { data } = await axios.post(url, {
    jsonrpc: "2.0",
    id: "dontcare",
    method: "validators",
    params: [blockHeight],
  });
  if (
    !data ||
    (!data.error && (!data.result || !data.result.epoch_start_height))
  ) {
    throw Error(`Unknown API response: ${data}`);
  }
  return data;
}

async function getEpochStart(url, blockHeight) {
  try {
    const response = await getValidators(url, blockHeight || null);
    if (response.error) {
      throw Error(response.error);
    }
    const { epoch_start_height: epochStartHeight } = response.result;
    return epochStartHeight;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
}

async function fetchValidationStats(url, blockHeight) {
  if (!blockHeight) {
    blockHeight = (await getEpochStart(url)) - 1;
  }
  while (true) {
    console.log(
      "Trying to fetch validation stats for the block #",
      blockHeight
    );
    const currentValidators = await getValidators(url, blockHeight);
    if (currentValidators.result) {
      return {
        blockHeight,
        validators: currentValidators.result.current_validators,
      };
    }
    --blockHeight;
  }
}

function writeFile({ blockHeight, validators }) {
  const jsonData = JSON.stringify(validators, null, 2);
  try {
    fs.mkdirSync("stats");
  } catch {}
  fs.writeFileSync(`stats/${blockHeight}.json`, jsonData);
  console.log("Saved validation stats as of block #", blockHeight);
}

async function fetchHistoricalValidationStats(url) {
  let blockHeight;
  while (true) {
    const validationStats = await fetchValidationStats(url, blockHeight);
    writeFile(validationStats);
    blockHeight = (await getEpochStart(url, validationStats.blockHeight)) - 1;
  }
}

fetchValidationStats(NEAR_RPC_URL).then(writeFile);
//fetchHistoricalValidationStats(NEAR_RPC_URL);

// const delayInterval = setInterval(sendData, 2000);
