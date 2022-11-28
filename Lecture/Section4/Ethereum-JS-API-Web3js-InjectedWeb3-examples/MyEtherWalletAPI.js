let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider('https://api.myetherwallet.com/rop'));

web3.eth
.getBalance("0x1D78323C836d6e6681Fe77128aE55923C8D5e0f0")
.then(console.log);


// 'https://api.myetherwallet.com/rop'
// 'https://api.myetherwallet.com/eth'