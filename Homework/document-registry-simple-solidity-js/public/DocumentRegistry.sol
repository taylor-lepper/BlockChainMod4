// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.3;

contract DocumentRegistry {
    struct Document {
        string hash;
        uint dateAdded;
    }

    Document[] private documents;
    address contractOwner;

    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Not a contract owner");
        _;
    }

    constructor() public{
        contractOwner = msg.sender;
    }

    function add(string memory hash) public onlyOwner returns (uint dateAdded){
        uint currentTime = block.timestamp;
        Document memory doc = Document(hash, currentTime);
        documents.push(doc);
        return currentTime;
    }

    function getDocumentsCount() public view returns (uint documentCount){
        return documents.length;
    }

    function getDocument(uint index) public view returns (string memory hash, uint dateAdded){
        Document memory document = documents[index];
        return (document.hash, document.dateAdded);
    }
}