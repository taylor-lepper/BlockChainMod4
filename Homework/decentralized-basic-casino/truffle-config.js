/**
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 */

const HDWalletProvider = require("@truffle/hdwallet-provider");

const INFURA_KEY = "88a0f67ff73e46fea3a578a43190a150";  // REPLACE WITH YOUR OWN KEY
const MNEMONIC = "page hen earth work exact base reward crane nurse nominee match antenna";  // REPLACE WITH YOUR OWN MNEMONIC

module.exports = {
  /**
   * The default output directory for compiled contracts is ./build/contracts relative to the project root.
   * This can be changed with the contracts_build_directory key.
   */
  contracts_build_directory: "./src/contracts",
  
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions.
   * $ truffle migrate --network goerli
   */

  networks: {
    goerli: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://goerli.infura.io/v3/88a0f67ff73e46fea3a578a43190a150`
        ),
      network_id: 5, // Goerli's id
      gas: 4465030, // Infura rec
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      networkCheckTimeout: 10000
    },
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.0" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
