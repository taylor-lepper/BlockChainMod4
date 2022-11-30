// this should still all work as contract is on goerli network 

let ethers = require('ethers');

// connect to default providers
let provider = new ethers.getDefaultProvider('goerli');

// connect to localhost
let provider2 = new ethers.providers.JsonRpcProvider("http://localhost:8545");


// create wallet
const privateKey = "0xfd45ad3d26b563232da01788b117ff526b63702543a28d267309790c4cf4335d"; //from MEW
let wallet = new ethers.Wallet(privateKey, provider);



// deploy a contract
let bytecode = {
	"functionDebugData": {},
	"generatedSources": [],
	"linkReferences": {},
	"object": "608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636057361d1461003b5780636d4ce63c14610057575b600080fd5b6100556004803603810190610050919061009d565b610075565b005b61005f61007f565b60405161006c91906100d9565b60405180910390f35b8060008190555050565b60008054905090565b60008135905061009781610103565b92915050565b6000602082840312156100b3576100b26100fe565b5b60006100c184828501610088565b91505092915050565b6100d3816100f4565b82525050565b60006020820190506100ee60008301846100ca565b92915050565b6000819050919050565b600080fd5b61010c816100f4565b811461011757600080fd5b5056fea26469706673582212200f96788f1857a95a826c29ab1158dd37089405ec3dff0ebdde846756c35c086964736f6c63430008070033",
	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x150 DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x36 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6057361D EQ PUSH2 0x3B JUMPI DUP1 PUSH4 0x6D4CE63C EQ PUSH2 0x57 JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x55 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x50 SWAP2 SWAP1 PUSH2 0x9D JUMP JUMPDEST PUSH2 0x75 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x5F PUSH2 0x7F JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x6C SWAP2 SWAP1 PUSH2 0xD9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST DUP1 PUSH1 0x0 DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x97 DUP2 PUSH2 0x103 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0xB3 JUMPI PUSH2 0xB2 PUSH2 0xFE JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0xC1 DUP5 DUP3 DUP6 ADD PUSH2 0x88 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xD3 DUP2 PUSH2 0xF4 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0xEE PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0xCA JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x10C DUP2 PUSH2 0xF4 JUMP JUMPDEST DUP2 EQ PUSH2 0x117 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xF SWAP7 PUSH25 0x8F1857A95A826C29AB1158DD37089405EC3DFF0EBDDE846756 0xC3 0x5C ADDMOD PUSH10 0x64736F6C634300080700 CALLER ",
	"sourceMap": "199:351:0:-:0;;;;;;;;;;;;;;;;;;;"
};
let abi = [
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
let contractAddress = "0x9A17A5d002b5cA83B5Ba498c1f6e0A45093C177F";

//error in getDeployTransaction not a function below
// let deployTransaction = ethers.Contract.getDeployTransaction(bytecode, abi);
// wallet.sendTransaction(deployTransaction);


// instance of existing contract (see contract below)
let contract = new ethers.Contract(contractAddress, abi, wallet);

contract.store(15).then(console.log);

contract.get().then(console.log);



// example - add fact to 'array of facts' contract

// let fact = 'Random Fact';
// contract.add(fact);

// example - read fact from contract

// contract.getFact(index).then(fact => console.log(`Fact ${index}: ${fact}`));




// ---contract---

// contract Storage {

//     uint256 number;

//     /**
//      * @dev Store value in variable
//      * @param num value to store
//      */
//     function store(uint256 num) public {
//         number = num;
//     }

//     /**
//      * @dev Return value 
//      * @return value of 'number'
//      */
//     function get() public view returns (uint256){
//         return number;
//     }
// }