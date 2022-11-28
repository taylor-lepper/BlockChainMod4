let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150'));

const contractAddress = "0xbDD083DB3DAE51c89bA6BAa7b35487934616B047";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.get().call().then(console.log);


// address from
// {from: "0x9B4a2c00e361aAC4927899A616C2C2942408Cc3E"}