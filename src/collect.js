const axios = require("axios");
const fs = require("fs");

const URL = "https://rpc.betanet.near.org";

async function getValidators(url, blockHeight) {
  const { data } = await axios.post(url, {
    jsonrpc: "2.0",
    id: "dontcare",
    method: "validators",
    params: [blockHeight],
  });
  if (!data || !data.result || !data.result.epoch_start_height) {
    throw Error(`Unknown API response: ${data}`);
  }
  return data;
}

const getCurrentEpochStart = async (url) => {
  try {
    const response = await getValidators(url, null);
    const { epoch_start_height: epochStartHeight } = response.result;
    return epochStartHeight;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

const sendRequestsForGivenPeriod = async (url) => {
  let lastBlockHeightInPreviousEpoch = (await getCurrentEpochStart(url)) - 1;
  while (true) {
    const currentValidators = await getValidators(
      url,
      lastBlockHeightInPreviousEpoch
    );
    if (currentValidators.result) {
      return {
        lastBlockHeightInPreviousEpoch,
        validators: currentValidators.result.current_validators,
      };
    }
    --lastBlockHeightInPreviousEpoch;
  }
};

const writeFile = ({ lastBlockHeightInPreviousEpoch, validators }) => {
  const jsonData = JSON.stringify(validators, null, 2);
  try {
    fs.mkdirSync('stats');
  } catch {}
  fs.writeFileSync(`stats/${lastBlockHeightInPreviousEpoch}.json`, jsonData);
};

sendRequestsForGivenPeriod(URL).then(writeFile);

// const delayInterval = setInterval(sendData, 2000);

