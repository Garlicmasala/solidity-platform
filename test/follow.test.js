const { expect } = require("chai");

describe("Follow", function () {
  let Follow;
  let follow;
  let a, b;

  beforeEach(async function () {
    [a, b] = await ethers.getSigners();
    Follow = await ethers.getContractFactory("Follow");
    follow = await Follow.deploy();
    await follow.deployed();
  });

  it("allows follow and unfollow", async function () {
    const tx = await follow.connect(a).follow(b.address);
    const r = await tx.wait();
    const ev = r.events.find(e => e.event === "Followed");
    expect(ev.args.follower).to.equal(a.address);
    const isF = await follow.isFollowing(a.address, b.address);
    expect(isF).to.equal(true);
    const tx2 = await follow.connect(a).unfollow(b.address);
    const r2 = await tx2.wait();
    const ev2 = r2.events.find(e => e.event === "Unfollowed");
    expect(ev2.args.follower).to.equal(a.address);
    const isF2 = await follow.isFollowing(a.address, b.address);
    expect(isF2).to.equal(false);
  });
});
