To start the project...


--- install packages ---
run:
npm install
-in the project folder



--- compile contract ---
run:
solcjs SimpleStorage.sol --bin --abi
-in the project folder
-creates bin and abi files :)



--- start daemon ---
-open a terminal in the qtum-0.19.0.1 folder
-cd to bin folder

run:
qtumd.exe --regtest --datadir=. --rpcuser=username --rpcpassword=password --rpcport=13889
-leave this daemon running till end of project



--- create accounts, add value etc ---
-open a terminal in same location as above

run: 
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getnewaddress
-to get new address

run: 
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 600 YOURNEWADDRESS
-this will mine 600 blocks and reward that address

run:
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getwalletinfo
-this will give wallet info including balance



--- deploy contract ---
-in the same terminal

run: 
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 createcontract YourBinStoredInFileCreatedFromFirstCommand
-use the bytecode created in the SimpleStorage_sol_Storage.bin file
-save the results for later! 
-tx_id //transaction ID
-sender //contract creators address
-address //of contract

run: 
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 generatetoaddress 1 CONTRACTcreatorsADDRESSS
-use the contract creators address from above
-mines 1 block

run: 
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 gettransaction INSERT_TRANSACTION_ID
-use the tx_id from above!
-check whether tx in confirmed ("confirmations")

run:
qtum-cli.exe --regtest --rpcuser=username --rpcpassword=password --rpcport=13889 getaccountinfo INSERT_CONTRACT_ADDRESS
-insert contract address from above
-checks what is behind the address of the contract




--- interact with contract ---

-open client.js file
run:
node client.js

-you may need to comment out certain function calls for send and get
-you may also need to plug in your own info created above (tx, address, contract etc)