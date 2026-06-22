const { expect } = require("chai");

describe("RewardToken", function () {
  let Reward;
  let reward;
  let owner, other;

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    Reward = await ethers.getContractFactory("RewardToken");
    reward = await Reward.deploy(1000);
    await reward.deployed();
  });

  it("initial supply minted to deployer", async function () {
    const bal = await reward.balanceOf(owner.address);
    expect(bal.toNumber()).to.equal(1000);
  });

  it("can mint new tokens", async function () {
    await reward.connect(owner).mint(other.address, 500);
    const bal = await reward.balanceOf(other.address);
    expect(bal.toNumber()).to.equal(500);
  });
});
