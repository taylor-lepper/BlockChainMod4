let Web3 = require("web3");
const infuraKey = "88a0f67ff73e46fea3a578a43190a150";

const web3 = new Web3(new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/${infuraKey}`));

web3.eth.getBalance("0x9B4a2c00e361aAC4927899A616C2C2942408Cc3E").then(console.log);