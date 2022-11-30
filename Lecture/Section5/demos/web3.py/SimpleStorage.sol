// SPDX-License-Identifier: (c) Copyright 2020 Kingsland University, All Rights Reserved.
pragma solidity ^0.8.4;
contract SimpleStorage {
  uint private storedData;
  function set(uint x) public { storedData = x; }
  function get() view public returns (uint) {
    return storedData;
  }
}