// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Post {
    struct PostStruct {
        uint256 id;
        address author;
        string contentHash; // IPFS or content pointer
        uint256 timestamp;
    }

    uint256 public nextPostId;
    mapping(uint256 => PostStruct) public posts;

    event PostCreated(uint256 indexed id, address indexed author, string contentHash);

    function createPost(string calldata contentHash) external returns (uint256) {
        uint256 id = nextPostId++;
        posts[id] = PostStruct({id: id, author: msg.sender, contentHash: contentHash, timestamp: block.timestamp});
        emit PostCreated(id, msg.sender, contentHash);
        return id;
    }
}
