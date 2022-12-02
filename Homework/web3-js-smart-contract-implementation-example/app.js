const Web3 = require("web3");
const solc = require("solc");
const fs = require("fs");

const providerURL =
  "https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150";
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

const privateKey =
  "fd45ad3d26b563232da01788b117ff526b63702543a28d267309790c4cf4335d";
  const privateKey2 = "843275c86c0e6ede99de929efc1067a71a70423248c45486f6183746bb8401b5";

const contractAddr = "0x1545b2B200473ba68B05AA860Fdd61d5E9046ea7";

const contractCode = fs.readFileSync("./ArrayOfFacts.sol").toString();

let standardCompilerInput = {
  language: "Solidity",
  sources: {
    contract: {
      content: contractCode,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

// -----compile contract -----
standardCompilerInput = JSON.stringify(standardCompilerInput);

let compiledContract = solc.compile(standardCompilerInput);
compiledContract = JSON.parse(compiledContract);
compiledContract = compiledContract["contracts"]["contract"]["ArrayOfFacts"];

// console.log(compiledContract);

// -----deploy contract-----

web3.eth.accounts.wallet.add(privateKey);
const ABI = compiledContract['abi'];
const BYTECODE = "0x" + compiledContract['evm']['bytecode']['object'];

// let contract = new web3.eth.Contract(ABI, null, {
//     data: BYTECODE,
//     from: web3.eth.accounts.wallet[0].address,
//     gas: 4600000
// });

// contract.deploy().send().then(contractInstance => {
//     console.log("Contract created at " + contractInstance.options.address);
//     console.log(`View contract at https://goerli.etherscan.io/address/${contractInstance.options.address}`)
// });

const fact = "NASA means 'not a space agency'";
const fact2 = "NASA never actually sent astraunots";

const contract = new web3.eth.Contract(ABI, contractAddr);solc


// ----- add function -----
// contract.methods
//   .add(fact2)
//   .send(
//     {
//       from: web3.eth.accounts.wallet[0].address,
//       gas: 4600000,
//     },
//     (err, transactionID) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Transaction Hash: " + transactionID);
//       }
//     }
//   )
//   .then((transaction) => {
//     console.log("Transaction Information: ");
//     console.log(transaction);
//     console.log(`\nTo check the transaction visit https://goerli.etherscan.io/tx/${transaction.transactionHash}`);
//   });



// ----- get fact function -----
const factIndex = 0;
contract.methods.getFact(factIndex).call().then((result) => {
    console.log(`Fact ${factIndex}: ${result}`)
});

// ----- get count function -----
contract.methods.count().call().then((result) => {
    console.log(`Total recorded facts: ${result}`);
});