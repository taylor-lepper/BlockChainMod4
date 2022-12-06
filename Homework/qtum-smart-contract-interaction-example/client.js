// ====== information from account and contract

// address = qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj (contract creator)

//  "txid": "42b529895a7b8fdbb9bfcefefa20d59447d9aa4a9fb90c5f90fb45756e031f93",
//  "sender": "qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj",
//  "hash160": "6e7874e84f5baa7d636c96ee26477c549c3844b2",
//  "address": "4b5d8efb0eea0e800b4df1b63c2ed6273760504c" (of the contract)


const {Qweb3} = require('qweb3');
const username = "username";
const password = "password";
const rpcAddress = `http://${username}:${password}@localhost:13889`;
const qweb = new Qweb3(rpcAddress);

const fs = require('fs');
const contractAddress = "4b5d8efb0eea0e800b4df1b63c2ed6273760504c";
let ABI = fs.readFileSync("./SimpleStorage_sol_Storage.abi").toString();
ABI = JSON.parse(ABI);


// ====== contract instance ======
const contract = qweb.Contract(contractAddress, ABI);

// ====== send transaction ======

const transaction = {
    methodArgs: [1234567890], // the data which will be saved
    gasLimit: 1000000, // Gas limit
    senderAddress: "qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj" // sender addresss also contract owner
};

const methodName = "set";

// contract.send(methodName, transaction).then(result => {
//     console.log(result);
// });


// ====== get transaction ======

const transactionGet = {
    methodArgs: [],
    gasLimit: 1000000,
    senderAddress: "qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj"
};

const methodNameGet = "get";

contract.call(methodNameGet, transactionGet).then(result => {
    console.log(result.executionResult.formattedOutput[0].toString());
});