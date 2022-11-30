let ethers = require('ethers');
let provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

let wallet = new ethers.Wallet('16e6fdc7d75f061170a5b6d637497ab17ab1b990d17843f8cf1b26d73fbdad52', provider);

const address = '0xe64dffa7ff28753096d87765853e9aab26f7b76c';
const abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

let contract = new ethers.Contract(address, abi, wallet);
contract.get().then(console.log)
