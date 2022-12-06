// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6;

contract Storage {

    uint256 number;

    function set(uint256 num) public {
        number = num;
    }


    function get() public view returns (uint256){
        return number;
    }
}


// address = qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj

//  "txid": "42b529895a7b8fdbb9bfcefefa20d59447d9aa4a9fb90c5f90fb45756e031f93",
//  "sender": "qTdVncGF8tjKpYBSR7fVKn1WPMESFUGtgj",
//  "hash160": "6e7874e84f5baa7d636c96ee26477c549c3844b2",
//  "address": "4b5d8efb0eea0e800b4df1b63c2ed6273760504c"