from collections.abc import Mapping,MutableMapping

from web3 import Web3, HTTPProvider
web3 = Web3(HTTPProvider("http://localhost:8545"))
web3.eth.defaultAccount = web3.eth.accounts[0]

CONTRACT_ADDRESS = '0x217cc6417604a1694D661294A3edd1f15137aeDe'
ABI = '''[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newFact",
				"type": "string"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "count",
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
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getFact",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]'''
contract = web3.eth.contract(address=Web3.toChecksumAddress(CONTRACT_ADDRESS), abi=ABI)


fact = 'Random fact' 
nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount)
transaction = contract.functions.add(fact).buildTransaction({
    'nonce': nonce, 'gas': 4600000 })
signed_txn = web3.eth.account.signTransaction(transaction, '0x8cf3d214220b5a169f95074bc84be98032637a9135c9a6cbb7cd79052bab0777')
web3.eth.sendRawTransaction(signed_txn.rawTransaction)


count = contract.functions.count().call()
print(count)