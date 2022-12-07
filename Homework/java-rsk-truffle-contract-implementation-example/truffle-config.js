module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*",
      gas: 2500000,
      from: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
    },
  },
  compilers: {
    solc: {
      version: "0.6.0",
    },
  },
};
