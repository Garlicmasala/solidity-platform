const { expect } = require("chai");

describe("Profile", function () {
  let Profile;
  let profile;
  let owner, other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    Profile = await ethers.getContractFactory("Profile");
    profile = await Profile.connect(owner).deploy();
    await profile.deployed();
  });

  it("creates and updates profile", async function () {
    const tx = await profile.connect(owner).createProfile("alice", "bio1");
    const r = await tx.wait();
    const ev = r.events.find(e => e.event === "ProfileCreated");
    expect(ev.args.owner).to.equal(owner.address);
    const u = await profile.users(owner.address);
    expect(u.username).to.equal("alice");
    const tx2 = await profile.connect(owner).updateProfile("alice2", "bio2");
    const r2 = await tx2.wait();
    const ev2 = r2.events.find(e => e.event === "ProfileUpdated");
    expect(ev2.args.owner).to.equal(owner.address);
    const u2 = await profile.users(owner.address);
    expect(u2.username).to.equal("alice2");
  });

  it("prevents duplicate create", async function () {
    await profile.connect(owner).createProfile("a", "b");
    try {
      await profile.connect(owner).createProfile("x", "y");
      throw new Error("Expected revert");
    } catch (e) {
      expect(e.message).to.include("Profile exists");
    }
  });
});
