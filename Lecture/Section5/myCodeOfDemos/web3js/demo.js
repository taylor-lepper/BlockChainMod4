// run command "ganache-cli" in terminal

let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");

web3.eth.getCoinbase().then(function (addr) {
  console.log(addr);
  web3.eth.getBalance(addr).then(console.log);
});

//  use different provider

let altWeb3Provider = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8545")
);

// get default account for mining rewards

altWeb3Provider.eth.getBalance('0xe4fF4Ea4522C0E185E7b407Da2816f21F31f8568').then(console.log);

// get all accounts

let accounts = web3.eth.accounts;
// console.log(accounts);

// create contract object instance

let jsonInterface;
let address;
let options;

// let contract = new web3.eth.Contract(jsonInterface, address, options);

// deploy new contract

// contract.deploy({ data: "bytecode", arguments: ["constructor arugments"] });

