let ipfsAPI = require("ipfs-http-client");
let ipfs = ipfsAPI("localhost", "5001", { protocol: "http" });

// add a file

const file = "My awesome file";

ipfs.add(Buffer.from(file), (err, fileInfo) => {
  if (err) console.log(err);
  console.log("Hash: ", fileInfo[0].hash);

//   get a file
  ipfs.cat(fileInfo[0].hash, (err, data) => {
    if (err) console.log(err);
    console.log("File content: ", data.toString());
  });
});
