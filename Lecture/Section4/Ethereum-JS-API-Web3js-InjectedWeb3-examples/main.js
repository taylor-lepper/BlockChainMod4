let Web3 = require("web3");
let web3 = new Web3("http://localhost:8545");

// get first account and balance

function firstAccountAndBalance() {
  web3.eth.getCoinbase().then(function (addr) {
    console.log("First account address: " + addr);
    console.log("Balance of first account: ");
    web3.eth.getBalance(addr).then(console.log);
  });
}

// get the account for mining rewards (default)

function mainAccount() {
  web3.eth.getCoinbase().then(function (addr) {
    console.log("Main account (mining rewards): " + addr);
  });
}

//get all accounts

function allAccounts() {
  console.log("All accounts: ");
  console.log("\n");
  let accounts = web3.eth.accounts;
  console.log(accounts);
}

// create contract object

async function createContractInstance() {
  const contractAddress = "0xf39228c50CD0586071c1697ee305542DF08485Eb";

  const contractABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "get",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  let contract = new web3.eth.Contract(contractABI, contractAddress);
  //   console.log(contract);

  contract.methods
    .get()
    .call({ from: "0xed22C8F336A93F66D68aE1Bf35c39Ea0DF2621B9" })
    .then(console.log);
}

function infuraGetBalance() {
  const web3Addition = new Web3(new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150"
  ));

  // random address from etherscan below
  web3Addition.eth
    .getBalance("0x1D78323C836d6e6681Fe77128aE55923C8D5e0f0")
    .then(console.log);
}

// allAccounts();
// console.log("___________________________________________________________");
// console.log("\n");
// mainAccount();
// firstAccountAndBalance();
// createContractInstance();
infuraGetBalance();
