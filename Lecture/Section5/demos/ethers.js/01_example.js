let ethers = require('ethers');
let provider = ethers.getDefaultProvider('ropsten');

let wallet = new ethers.Wallet('16e6fdc7d75f061170a5b6d637497ab17ab1b990d17843f8cf1b26d73fbdad52', provider);

wallet.getBalance().then(console.log);


