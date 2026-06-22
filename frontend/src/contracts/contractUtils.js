import { ethers } from 'ethers'
import { CONTRACT_ADDRESSES, RPC_URL } from './config'
import { ABIs } from './abis'

// Get provider from window.ethereum (MetaMask) or fallback to RPC
export function getProvider() {
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum)
  }
  return new ethers.providers.JsonRpcProvider(RPC_URL)
}

// Get signer from MetaMask
export function getSigner() {
  const provider = getProvider()
  return provider.getSigner()
}

// Create contract instance
export function getContract(contractName) {
  const signer = getSigner()
  return new ethers.Contract(
    CONTRACT_ADDRESSES[contractName],
    ABIs[contractName],
    signer
  )
}

// Profile contract calls
export async function createProfile(username, bio) {
  const contract = getContract('Profile')
  const tx = await contract.createProfile(username, bio)
  return await tx.wait()
}

export async function getProfile(address) {
  const contract = getContract('Profile')
  const provider = getProvider()
  const profileContract = new ethers.Contract(
    CONTRACT_ADDRESSES.Profile,
    ABIs.Profile,
    provider
  )
  return await profileContract.users(address)
}

// Post contract calls
export async function createPost(contentHash) {
  const contract = getContract('Post')
  const tx = await contract.createPost(contentHash)
  const receipt = await tx.wait()
  return receipt
}

export async function getPost(postId) {
  const contract = getContract('Post')
  const provider = getProvider()
  const postContract = new ethers.Contract(
    CONTRACT_ADDRESSES.Post,
    ABIs.Post,
    provider
  )
  return await postContract.posts(postId)
}

// Follow contract calls
export async function followUser(userAddress) {
  const contract = getContract('Follow')
  const tx = await contract.follow(userAddress)
  return await tx.wait()
}

export async function unfollowUser(userAddress) {
  const contract = getContract('Follow')
  const tx = await contract.unfollow(userAddress)
  return await tx.wait()
}

export async function getFollowers(userAddress) {
  const contract = getContract('Follow')
  const provider = getProvider()
  const followContract = new ethers.Contract(
    CONTRACT_ADDRESSES.Follow,
    ABIs.Follow,
    provider
  )
  return await followContract.followers(userAddress)
}

// RewardToken calls
export async function transferTokens(to, amount) {
  const contract = getContract('RewardToken')
  const tx = await contract.transfer(to, amount)
  return await tx.wait()
}

export async function getBalance(address) {
  const contract = getContract('RewardToken')
  const provider = getProvider()
  const tokenContract = new ethers.Contract(
    CONTRACT_ADDRESSES.RewardToken,
    ABIs.RewardToken,
    provider
  )
  return await tokenContract.balanceOf(address)
}

// ContentNFT calls
export async function mintContentNFT(contentHash) {
  const contract = getContract('ContentNFT')
  const tx = await contract.mint(contentHash)
  return await tx.wait()
}
