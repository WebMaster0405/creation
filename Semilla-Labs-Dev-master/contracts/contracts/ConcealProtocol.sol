// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConcealProtocol {

    mapping (address => uint) private balances;
    address public owner;

    event Deposit(address sender, uint amount);
    event Transfer(address sender, address receiver, uint amount);

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getUserBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function transfer(address payable sender, address payable receiver, uint amount) public {
        require(balances[sender] >= amount, "Insufficient funds");
        emit Transfer(sender, receiver, amount);
        if(!receiver.send(amount)){
            revert("transaction failed");
        }
        balances[sender] -= amount;
        balances[receiver] += amount;
    }

    function deposit(address payable sender, uint256 amount) payable public {
        require(msg.value == amount);
        emit Deposit(msg.sender, msg.value);
        balances[sender] += msg.value;
    }
}