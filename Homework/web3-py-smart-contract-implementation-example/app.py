from web3 import Web3, HTTPProvider

import json

PROVIDER = "https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150"
w3 = Web3(HTTPProvider(PROVIDER))
#w3.eth.enable_unaudited_featurns()

CONTRACT_ADDRESS = "0x4Ff11F1Acd4e6Ba24eC43c9f011555A4A82124b4"
PRIVATE_KEY = ""
PRIVATE_KEY2 = ""
ADDRESS = ""
ADDRESS2 = ""

ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "fact",
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
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "factCount",
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
				"name": "fact",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

CONTRACT_INSTANCE = w3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)


# add fact function

def add_fact(contract_instance, private_key, address, fact):
    nonce = w3.eth.getTransactionCount(address)
    add_transaction = contract_instance.functions.add(fact).buildTransaction({
        'gas': 4600000,
        'nonce': nonce
    })

    print(add_transaction)
   

    signed_txn = w3.eth.account.signTransaction(add_transaction, private_key= private_key)
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)

fact = "This is also a great fact to know"
add_fact(CONTRACT_INSTANCE, PRIVATE_KEY2, ADDRESS, fact)



# get fact function
def get_fact(contract_instance, index):
    fact = contract_instance.functions.getFact(index).call()
    print(fact)

# get_fact(CONTRACT_INSTANCE, 0)


# get facts count function
def facts_count(contract_instance):
    numberOfFacts = contract_instance.functions.count().call()
    print("Stored facts in the contract: ", numberOfFacts)

# facts_count(CONTRACT_INSTANCE)


