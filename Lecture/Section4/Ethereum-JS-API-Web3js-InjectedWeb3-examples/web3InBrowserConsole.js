

// _______________________________________________________________________________________________

// ---Using web3 with MetaMask

// MetaMask still work with web3.js with @metamask/legacy-web3. This package is a drop-in replacement for
// window.web3.

// You can use a <script> in web page:

// <head>
// <!-- The legacy-web3 script must run BEFORE your other scripts. -->
// <script src="https://unpkg.com/@metamask/legacy-web3@latest/dist/metamask.web3.min.js"></script>
// </head>


//  navigate to html page that has the above ^^

// then try: 

if (window.ethereum) {

window.web3 = new Web3(ethereum);
try {
// Request account access if needed
await ethereum.enable();
} catch (error) {
// User denied account access...
}

}

// or:

web3.eth.getBalance(
"0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
(err, result) => {
console.log(result.toString(10))
}
);


// or 


const contractAddress = '0x7f6757d662dd6391ee76de4dd7823bfbaa23110e';
const contractABI =
[{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];


let contract = web3.eth.contract(contractABI).at(contractAddress);


contract.get(function(err, res) {
if (err) return err;
console.log(res.toNumber());
});