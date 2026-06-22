const { expect } = require("chai");

describe("ContentNFT", function () {
  let Content;
  let content;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Content = await ethers.getContractFactory("ContentNFT");
    content = await Content.deploy();
    await content.deployed();
  });

  it("mints NFT with content hash", async function () {
    const tx = await content.connect(owner).mint("Qmcontent");
    const receipt = await tx.wait();
    const tokenId = 1; // first token
    expect(await content.ownerOf(tokenId)).to.equal(owner.address);
    expect(await content.tokenContentHash(tokenId)).to.equal("Qmcontent");
  });
});
