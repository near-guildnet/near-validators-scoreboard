const axios = require('axios');

async function main() {
  const response = await axios.post('https://rpc.betanet.near.org/', {
    jsonrpc: "2.0",
    id: "dontcare",
    method: "validators",
    params: [null],
  });
  console.log(response.data.result.start_epoch_height)
  console.log(response.data.result.current_validators)
}

setInterval(main, 1000);
