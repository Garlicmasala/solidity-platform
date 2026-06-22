const { expect } = require("chai");

describe("Post", function () {
  let Post;
  let post;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Post = await ethers.getContractFactory("Post");
    post = await Post.deploy();
    await post.deployed();
  });

  it("creates posts and increments id", async function () {
    const tx = await post.connect(owner).createPost("Qmhash1");
    const receipt = await tx.wait();
    const ev = receipt.events.find(e => e.event === "PostCreated");
    expect(ev.args.id.toNumber()).to.equal(0);
    const tx2 = await post.connect(owner).createPost("Qmhash2");
    const r2 = await tx2.wait();
    const ev2 = r2.events.find(e => e.event === "PostCreated");
    expect(ev2.args.id.toNumber()).to.equal(1);
  });
});
