#!/usr/bin/python3

from web3 import Web3, HTTPProvider

web3 = Web3(HTTPProvider("https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150"))

CONTRACT_ADDRESS = Web3.toChecksumAddress("0x0b54055f24F536bFCd8c3e2F413bC30ba5a14d96")
private_key = "0xfd45ad3d26b563232da01788b117ff526b63702543a28d267309790c4cf4335d"

ABI = [
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
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

contract = web3.eth.contract(address = Web3.toChecksumAddress(CONTRACT_ADDRESS), abi = ABI)



number_to_store = 15

getter = contract.functions.get().call()
print(getter)

