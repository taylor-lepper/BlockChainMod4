let ethers = require('ethers');

// connect to default providers
let provider = ethers.getDefaultProvider('goerli');

// connect infura
let provider2 = new ethers.providers.InfuraProvider("goerli" , "88a0f67ff73e46fea3a578a43190a150" );


const privateKey = ""; //from MEW

let wallet = new ethers.Wallet(privateKey, provider);
let wallet2 = new ethers.Wallet(privateKey, provider2);

wallet.getBalance().then(console.log);
wallet2.getBalance().then(console.log);



