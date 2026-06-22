// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Follow {
    // mapping of follower => followed => bool
    mapping(address => mapping(address => bool)) public isFollowing;
    mapping(address => address[]) public followers;

    event Followed(address indexed follower, address indexed followed);
    event Unfollowed(address indexed follower, address indexed followed);

    function follow(address _user) external {
        require(_user != msg.sender, "Cannot follow self");
        require(!isFollowing[msg.sender][_user], "Already following");
        isFollowing[msg.sender][_user] = true;
        followers[_user].push(msg.sender);
        emit Followed(msg.sender, _user);
    }

    function unfollow(address _user) external {
        require(isFollowing[msg.sender][_user], "Not following");
        isFollowing[msg.sender][_user] = false;
        // note: we do not remove from followers array to save gas in this minimal scaffold
        emit Unfollowed(msg.sender, _user);
    }
}
