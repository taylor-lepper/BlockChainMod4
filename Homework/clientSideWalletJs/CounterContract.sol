// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract Counter{
    int private count = 0;

    function incrementCounter() public{
        count += 1;
    }

    function decrementCounter() public{
        count -= 1;
        
    }

    function getCount() public view returns(int){
        return count;
    }


}