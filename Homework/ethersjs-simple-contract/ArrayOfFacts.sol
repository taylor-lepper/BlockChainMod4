// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

contract ArrayOfFacts{

    string[] private facts;
    address private owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only contract owner can do this!");
        _;
    }

    function add(string memory fact) public onlyOwner{
        facts.push(fact);
    }

    function count()public view returns (uint factCount){
        return facts.length;
    }

    function getFact(uint index) public view returns (string memory fact){
        return facts[index];
    }
}