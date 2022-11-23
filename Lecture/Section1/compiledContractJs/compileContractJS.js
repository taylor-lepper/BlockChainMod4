const solc = require("solc");

var input = {
  language: "Solidity",
  sources: {
    "test.sol": {
      content: "contract C {function f() public {}}",
    },
  },
  settings: { outputSelection: { "*": { "*": ["*"] } } },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['test.sol']['C'];
var bytecode = contract.evm.bytecode.object;
var abi = contract.abi;

console.log("-----BYTECODE-----");
console.log(bytecode);

console.log("\n-----ABI-----");
console.log(abi);

