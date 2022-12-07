Open a bash terminal in workspace...

run:
java -Drsk.conf.file=node.conf -cp rskj-core-1.3.0-WASABI-all.jar co.rsk.Start

verify connected to rskj
-open terminal in workspace in vscode

run:
truffle console
web3.eth.getAccounts()

add 1st account to truffle-config.js!!!!

run:
truffle compile
truffle migrate

...in the truffle console...
run:
var contract = null
SimpleStorage.deployed().then((instance) => {contract = instance})
contract

contract.get()
contract.set(55555)
contract.get()