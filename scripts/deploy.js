const hre = require("hardhat");

async function main() {
  console.log("Deploying Solidity Platform contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log(`Deploying with account: ${deployer.address}\n`);

  // Deploy Profile
  const Profile = await ethers.getContractFactory("Profile");
  const profile = await Profile.deploy();
  await profile.deployed();
  console.log("✓ Profile deployed to:", profile.address);

  // Deploy Post
  const Post = await ethers.getContractFactory("Post");
  const post = await Post.deploy();
  await post.deployed();
  console.log("✓ Post deployed to:", post.address);

  // Deploy Follow
  const Follow = await ethers.getContractFactory("Follow");
  const follow = await Follow.deploy();
  await follow.deployed();
  console.log("✓ Follow deployed to:", follow.address);

  // Deploy RewardToken (1M initial supply)
  const RewardToken = await ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy(ethers.utils.parseEther("1000000"));
  await rewardToken.deployed();
  console.log("✓ RewardToken deployed to:", rewardToken.address);

  // Deploy ContentNFT
  const ContentNFT = await ethers.getContractFactory("ContentNFT");
  const contentNFT = await ContentNFT.deploy();
  await contentNFT.deployed();
  console.log("✓ ContentNFT deployed to:", contentNFT.address);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("Deployment Summary");
  console.log("=".repeat(60));
  console.log("PROFILE_ADDRESS=" + profile.address);
  console.log("POST_ADDRESS=" + post.address);
  console.log("FOLLOW_ADDRESS=" + follow.address);
  console.log("REWARD_TOKEN_ADDRESS=" + rewardToken.address);
  console.log("CONTENT_NFT_ADDRESS=" + contentNFT.address);
  console.log("=".repeat(60));
  console.log("\nUpdate frontend/src/contracts/config.js with these addresses.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
