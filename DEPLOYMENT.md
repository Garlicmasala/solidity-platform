# Deployment Guide

Complete step-by-step guide to deploy Solidity Platform to different networks.

## Prerequisites

- Node.js ≥16
- MetaMask installed
- Sufficient testnet ETH (for testnet deployment)
- `.env` file with proper configuration

## Local Deployment (Hardhat)

### 1. Start Hardhat Local Node

```bash
npx hardhat node
```

This will:
- Start a local blockchain at `http://localhost:8545`
- Generate 20 test accounts with 10,000 ETH each
- Display private keys (save these)

Output:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
Accounts:
0 - 0x... (private key: 0x...)
1 - 0x... (private key: 0x...)
...
```

### 2. Deploy Contracts

In a new terminal:

```bash
npm run deploy
```

This will:
1. Compile all contracts
2. Deploy Profile, Post, Follow, RewardToken, ContentNFT
3. Log contract addresses and deployment summary

Output:
```
Deploying Solidity Platform contracts...
Deploying with account: 0x...
✓ Profile deployed to: 0x5FbDB2315678afccb333f8a9c21a7a1d9e1f1234
✓ Post deployed to: 0x5FbDB2315678afccb333f8a9c21a7a1d9e1f5678
... etc
```

### 3. Update Frontend Config

Copy the contract addresses to `frontend/src/contracts/config.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  Profile: '0x5FbDB2315678afccb333f8a9c21a7a1d9e1f1234',
  Post: '0x5FbDB2315678afccb333f8a9c21a7a1d9e1f5678',
  Follow: '0x5FbDB2315678afccb333f8a9c21a7a1d9e1f9abc',
  RewardToken: '0x5FbDB2315678afccb333f8a9c21a7a1d9e1fdeff',
  ContentNFT: '0x5FbDB2315678afccb333f8a9c21a7a1d9e1f0123'
}
```

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 5. Connect MetaMask

1. Open MetaMask
2. Add Network:
   - Name: Hardhat Localhost
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency: ETH
3. Import Account:
   - Use one of the private keys from Hardhat node output
   - MetaMask will auto-populate with 10,000 ETH

### 6. Test dApp

- Navigate to `http://localhost:5173`
- Click "Connect Wallet"
- Go to Profile tab and create a profile
- Go to New Post tab and create a post
- Check browser console for transaction hashes

## Testnet Deployment (Sepolia)

### 1. Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
DEPLOYER_PRIVATE_KEY=0x... (your private key)
```

Get these from:
- **RPC URL:** [Infura](https://infura.io) (free tier available)
- **Private Key:** MetaMask → Account Details → Private Key (save securely!)

### 2. Update Hardhat Config

In `hardhat.config.js`, add Sepolia network:

```javascript
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.19" }]
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY]
    }
  }
};
```

### 3. Fund Deployer Account

Get testnet ETH from Sepolia faucet:
- [Sepolia Faucet](https://www.sepoliafaucet.com/)
- [Infura Faucet](https://infura.io/faucet/sepolia)

Send ~0.5 ETH to your deployer address.

### 4. Deploy Contracts

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

This will:
- Connect to Sepolia testnet via RPC
- Deploy all contracts
- Log addresses (save these!)

Deployment may take 30-60 seconds per contract.

### 5. Update Frontend Config

Copy addresses to `frontend/src/contracts/config.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  Profile: '0x...',      // from Sepolia deployment
  Post: '0x...',
  Follow: '0x...',
  RewardToken: '0x...',
  ContentNFT: '0x...'
}

export const RPC_URL = 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID'
```

### 6. Test Frontend

```bash
cd frontend
npm run dev
```

Then:
1. Connect MetaMask to Sepolia testnet
2. Visit dApp and test profile/post creation
3. Transactions will show in [Sepolia Scan](https://sepolia.etherscan.io/)

## Verify Deployment on Block Explorer

After deploying to testnet, verify contracts on Etherscan:

### 1. Get Verification Parameters

From deployment output:
- Contract address
- Constructor arguments (if any)
- Solidity version (0.8.19)

RewardToken constructor example:
```solidity
constructor(uint256 initialSupply) // initialSupply = 1000000000000000000000000 (1M with decimals)
```

### 2. Verify via Hardhat (Ethers Scan Plugin)

Install plugin:
```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
```

Add to `hardhat.config.js`:
```javascript
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  etherscan: {
    apiKey: "YOUR_ETHERSCAN_API_KEY"
  }
  // ...
};
```

Get API key from [Etherscan](https://etherscan.io/apis).

### 3. Verify Contract

```bash
npx hardhat verify --network sepolia 0x... "constructor_arg_1" "constructor_arg_2"
```

Example:
```bash
npx hardhat verify --network sepolia 0x5FbDB2315678afccb333f8a9c21a7a1d9e1fdeff 1000000000000000000000000
```

## Mainnet Deployment (Production)

⚠️ **WARNING:** Mainnet deploys real funds. Double-check everything!

### Steps

1. Get mainnet ETH (not testnet)
2. Update `.env` with MAINNET_RPC_URL and DEPLOYER_PRIVATE_KEY
3. Add mainnet network to `hardhat.config.js`
4. Deploy:
   ```bash
   npx hardhat run scripts/deploy.js --network mainnet
   ```
5. Verify on [Etherscan](https://etherscan.io)

### Cost Estimate

Current Sepolia gas costs (as of 2024):
- Each contract: ~300-500K gas
- All 5 contracts: ~1.5-2.5M gas
- At 30 Gwei: ~0.045-0.075 ETH total

Mainnet costs will be higher (gas prices vary).

## Troubleshooting

### "Provider must be set"
**Problem:** Trying to deploy without Hardhat node running or without `.env` set.
**Solution:** Start Hardhat node or add `--network localhost` flag.

### "Insufficient funds for gas"
**Problem:** Deployer account doesn't have enough ETH.
**Solution:** Get more testnet ETH from faucet or send funds.

### "Invalid transaction (underpriced)"
**Problem:** Gas price too low for mainnet.
**Solution:** Increase `gasPrice` in `hardhat.config.js`.

### Deployment succeeds but frontend shows "0x0 address"
**Problem:** Frontend config not updated.
**Solution:** Copy addresses from deploy output to `frontend/src/contracts/config.js`.

## Next Steps After Deployment

1. ✅ Run frontend tests
2. ✅ Verify contracts on block explorer
3. ✅ Add access control to minting functions
4. ✅ Deploy subgraph for querying events
5. ✅ Setup CI/CD for automated deployments
6. ✅ Create documentation site

---

**Need Help?** Check `README.md` or open an issue.
