// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Profile {
    struct User {
        string username;
        string bio;
        address owner;
    }

    mapping(address => User) public users;

    event ProfileCreated(address indexed owner, string username);
    event ProfileUpdated(address indexed owner, string username);

    function createProfile(string calldata username, string calldata bio) external {
        User storage u = users[msg.sender];
        require(u.owner == address(0), "Profile exists");
        u.username = username;
        u.bio = bio;
        u.owner = msg.sender;
        emit ProfileCreated(msg.sender, username);
    }

    function updateProfile(string calldata username, string calldata bio) external {
        User storage u = users[msg.sender];
        require(u.owner == msg.sender, "Not owner");
        u.username = username;
        u.bio = bio;
        emit ProfileUpdated(msg.sender, username);
    }
}
