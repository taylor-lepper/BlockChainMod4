// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University, All Rights Reserved.
pragma solidity ^0.8.4;
contract Facts {
  string[] private facts;
  address private contractOwner = msg.sender;
  function add(string memory newFact) public {
    require(msg.sender == contractOwner);
    facts.push(newFact);
  }
  function count() view public returns (uint) {
    return facts.length;
  }
  function getFact(uint index) view public returns (string memory) {
    return facts[index];
  }
}