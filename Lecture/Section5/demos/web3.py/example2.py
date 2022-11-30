from web3 import Web3, HTTPProvider
web3 = Web3(HTTPProvider("http://localhost:8545"))
web3.eth.defaultAccount = web3.eth.accounts[0]

CONTRACT_ADDRESS = Web3.toChecksumAddress('0x7b707bA976fbF233568ee790Fcb90531aF005c30')
ABI = '''[
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]'''

contract = web3.eth.contract(address=Web3.toChecksumAddress(CONTRACT_ADDRESS), abi=ABI)

val =  contract.functions.get().call()
print(val)

contract.functions.set(7).transact()
val =  contract.functions.get().call()
print(val)