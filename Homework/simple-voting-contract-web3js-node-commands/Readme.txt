commands :)

// setup

npm install

node 
--to start node terminal

---(seperate terminal)---

ganache-cli



---inside node---

// compile the contract

Web3 = require('web3')

const OPTIONS = {defaultBlock :"latest", transactionConfirmationBlocks: 1, transactionBlockTimeout: 5}

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"), null, OPTIONS)

web3.eth.getAccounts().then(web3Accounts => {accounts = web3Accounts})

accounts

code = fs.readFileSync('contracts/Voting.sol').toString()

solc = require('solc')

compiledCode = solc.compile(code)


________________________________________________________
-----if(error){run code below} else {skip}-----

var solcInput = {
language: "Solidity",
sources: {
contract: {
content: code
}
},
settings: {
optimizer: {
enabled: true
},
evmVersion: "byzantium",
outputSelection: {
"*": {
"": ["legacyAST", "ast"],
"*": [
"abi",
"evm.bytecode.object",
"evm.bytecode.sourceMap",
"evm.deployedBytecode.object",
"evm.deployedBytecode.sourceMap",
"evm.gasEstimates"
]
}
}
}
};

solcInput = JSON.stringify(solcInput);

compiledCode = solc.compile(solcInput);

________________________________________________________

// deploy contract

abiDefinition = JSON.parse(compiledCode)['contracts']['contract']['Voting']['abi']

VotingContract = new web3.eth.Contract(abiDefinition)

byteCode = JSON.parse(compiledCode)['contracts']['contract']['Voting']['evm']['bytecode']['object']

VotingContract.deploy({data:byteCode}).send({from:accounts[0],gas: 4700000}).then(instance => {contractInstance = instance})

contractInstance



// interact with the contract

contractInstance.methods.addCandidate('Tristan').send({from: accounts[1]}).then(result => console.log(result))
contractInstance.methods.addCandidate('Rave').send({from: accounts[1]}).then(result => console.log(result))

contractInstance.methods.voteForCandidate('Rave').send({from: accounts[1]}).then(result => console.log(result))
contractInstance.methods.voteForCandidate('Tristan').send({from: accounts[2]}).then(result => console.log(result))
contractInstance.methods.voteForCandidate('Rave').send({from: accounts[3]}).then(result => console.log(result))


// check balances of accounts

balances = accounts.map(account => web3.eth.getBalance(account))
balances

// check votes (read)

contractInstance.methods.totalVotesFor('Rave').call({from: accounts[5]}).then(result => console.log(result.toString()))
contractInstance.methods.totalVotesFor('Tristan').call({from: accounts[5]}).then(result => console.log(result.toString()))

// check balances again to verify read is free (optional)

balances = accounts.map(account => web3.eth.getBalance(account))
balances
