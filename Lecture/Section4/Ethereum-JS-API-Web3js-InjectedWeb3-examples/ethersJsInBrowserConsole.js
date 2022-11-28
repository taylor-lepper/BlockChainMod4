// in the browswer console at remix ide


// create instance
await window.ethereum.enable()
const provider = new _ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();


// list accounts and get balance of account
await provider.listAccounts();
await provider.getBalance('accountAddressHere');

const contractAddress = "0xde3D07c3Ffe10fEaF9343879Bd9A7DEBeAf4C929";
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

// pass a provider when initiating a contract for read only queries
let contractReadOnly = new _ethers.Contract(contractAddress, contractABI, provider);
let valueReadOnly = await contractReadOnly.get();

valueReadOnly;

// pass a signer to create a contract instance for state changing operations
let contract = new _ethers.Contract(contractAddress, contractABI, signer);
await contract.set(7);
let value = await contract.get();

value;