// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MicrogridSmartContract {
    address public owner;
    string public name="Microgrid_Block";

    // Struct to represent a transaction between two participants
    struct EnergyTransaction {
        address sender;
        address receiver;
        uint256 amount; // Amount of energy in kilowatt-hours
        uint256 timestamp;
        bool completed;
    }

    EnergyTransaction[] public transactions;

    // Event to notify when a new energy transaction is initiated
    event EnergyTransactionInitiated(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 timestamp
    );

    // Event to notify when an energy transaction is completed
    event EnergyTransactionCompleted(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        uint256 timestamp
    );

    // Modifier to ensure that only the owner can execute certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Permission denied. Only the owner can call this function");
        _;
    }

    // Contract constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to initiate an energy transaction
    function initiateTransaction(address _receiver, uint256 _amount) external {
        require(_receiver != address(0), "Invalid receiver address");
        require(_amount > 0, "Invalid amount");

        // Create a new transaction
        EnergyTransaction memory newTransaction = EnergyTransaction({
            sender: msg.sender,
            receiver: _receiver,
            amount: _amount,
            timestamp: block.timestamp,
            completed: false
        });

        // Add the transaction to the transactions array
        transactions.push(newTransaction);

        // Emit an event to notify the initiation of the transaction
        emit EnergyTransactionInitiated(msg.sender, _receiver, _amount, block.timestamp);
    }

    // Function to complete an energy transaction
    function completeTransaction(uint256 _transactionIndex) external onlyOwner {
        require(_transactionIndex < transactions.length, "Invalid transaction index");
        require(!transactions[_transactionIndex].completed, "Transaction already completed");

        // Mark the transaction as completed
        transactions[_transactionIndex].completed = true;

        // Emit an event to notify the completion of the transaction
        emit EnergyTransactionCompleted(
            transactions[_transactionIndex].sender,
            transactions[_transactionIndex].receiver,
            transactions[_transactionIndex].amount,
            block.timestamp
        );
    }

    // Function to get the number of transactions
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

     function accountBalance(address _address) public view returns(uint){
        return (_address).balance;
    }
}

//0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8
