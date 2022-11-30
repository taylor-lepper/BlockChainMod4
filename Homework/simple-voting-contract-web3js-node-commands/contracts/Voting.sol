// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

contract Voting{
    mapping (bytes32 => uint8) public votesReceived;
    string[] public candidateList;

    function addCandidate(string memory candidateNames) public {
     candidateList.push(candidateNames);
    }

    function totalVotesFor(string memory candidate) public view returns(uint8) {
        require(validCandidate(candidate), "Must be a valid candidate");
        return votesReceived[keccak256(bytes (candidate))];
    }

    function voteForCandidate(string memory candidate) public {
        require(validCandidate(candidate), "Must be a valid candidate");
        votesReceived[keccak256(bytes(candidate))] +=1;
    }

    function validCandidate(string memory candidate) public view returns(bool){
        for(uint i = 0; i < candidateList.length; i++) {
            if(keccak256(bytes(candidateList[i])) == keccak256(bytes (candidate))){
                return true;
            }
        }
        return false;
    }
}