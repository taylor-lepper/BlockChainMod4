// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract SimpleStorage {
    uint256 private data;

    constructor() public {
        data = 1234;
    }

    function set(uint256 num) public {
        data = num;
    }

    function get() public view returns (uint256) {
        return data;
    }
}
