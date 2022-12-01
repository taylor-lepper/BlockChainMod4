/*
etherscan url for the contract:

https://goerli.etherscan.io/address/0x18a73e8d9ab8cb37cf63b52190f281c66762a1e9

*/

const ethers = require('ethers');
const Contract = ethers.Contract;
const fs = require('fs-extra');
const solc = require('solc');


// set up infura provider with key
const network = "goerli";
const provider = ethers.getDefaultProvider(network, {
    infura: "88a0f67ff73e46fea3a578a43190a150",
});

const privateKey = "fd45ad3d26b563232da01788b117ff526b63702543a28d267309790c4cf4335d";
// pK2 is to test onlyOwner() --it was send a scatTon of data into terminal....just kill it...trans will show on etherscan eventually
const privateKey2 = "481cdfa7a4c201106ac1d1c6f4e90caa27c94ff3338383a1edfc1eb25bb38a37";

const contractAddr = "0x18a73e8D9Ab8CB37cF63b52190F281c66762a1e9";
const txHashContract = "0x324027154419e956f243913ba83fa87bdd706a1f49011081697e47b245b425e6";

// read file function 
function readFile(fileName){
    return fs.readFileSync(fileName, "utf8");
}

// compile contract function 
function compileContract(fileName, contractName){
    let contractStr = readFile(fileName);
    let input = JSON.stringify({
        language: 'Solidity',
        sources: {
            'source_1': {
                content: contractStr
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    });
    let output = JSON.parse(solc.compile(input)).contracts['source_1'];
    return output[contractName];
}


// deploy contract function
function deployContract(privateKey, fileName, contractName){
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = compileContract(fileName, contractName);
    let bytecode = "0x" + contract.evm.bytecode.object;
    let abi = contract.abi;
    let factory = new ethers.ContractFactory(abi, bytecode, wallet);
    return factory.deploy().then((contract) => {
        console.log("Transaction created: ");
        console.log(contract.deployTransaction);
        console.log("Contract address: " + contract.address);
        return contract;
    });
}


// async self-invoking to run compile and execute functions
(async() =>{
    // compile contract
    console.log("\nCOMPILING CONTRACT");
    const compiledContract = compileContract("./ArrayOfFacts.sol", "ArrayOfFacts");
    console.log(compiledContract);
    const abi = compiledContract.abi;
   
    // deploy contract
    /*
    console.log("\nDEPLOYING CONTRACT");
    let contract = await deployContract(privateKey, "./ArrayOfFacts.sol", "ArrayOfFacts");
    console.log("\nAWAITING FOR CONTRACT TO BE MINED");
    await contract.deployed();
    let contractAddress = contract.address;
    console.log(contractAddress);
    */

    // call addFact function
    
    // console.log("\nADDING A FACT");
    // let fact = "The Time 03/Jan/2009 Chancellor on brink of second bailout for the banks!";
    // let fact2 = "A new fact for you"
    // let tx = await addFact(privateKey, abi, contractAddr, fact2);
    // console.log("\nAWAITING FOR TRANSACTION TO BE MINED");
    // await tx.wait();
    

    // call getFact function
    // console.log("\nGETTING FACT");
    // await getFact(provider, abi, contractAddr, 0);

    // // call getFactsCount function
    console.log("\nGETTING FACTS COUNT");
    await getFactsCount(provider,abi,contractAddr);
})();


// ----------------- interact with the contract -----------------


// call the function addFact from the smart contract
function addFact(privateKey, abi, contractAddr, fact){
    let wallet = new ethers.Wallet(privateKey, provider);
    let contract = new ethers.Contract(contractAddr, abi, wallet);

    return contract.add(fact).then((transaction) => {
        console.log("Transaction:  ");
        console.log(transaction);
        return transaction;
    });
}

// call the function getFact from the smart contract
function getFact(provider, abi, addr, index){
    let contract = new ethers.Contract(addr, abi, provider);

    return contract.getFact(index).then((fact) => {
        console.log("Fact " + index +1 + " : " + fact);
    });
}

// call the function getFactsCount from the smart contract
function getFactsCount(provider, abi, addr){
    let contract = new ethers.Contract(addr, abi, provider);
    
    return contract.count().then((count) => {
        console.log(ethers.BigNumber.from(count).toNumber());
    });
}

