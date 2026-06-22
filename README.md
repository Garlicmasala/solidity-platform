# Solidity Platform

A Web3 social media dApp built with Solidity smart contracts and a React frontend. Users can create profiles, post content, follow others, and earn/tip tokens—all decentralized via wallet authentication.

## 📋 Project Overview

**Smart Contracts (Solidity):**
- `Profile.sol` — User profiles stored on-chain
- `Post.sol` — Posts with content hashes (IPFS-ready)
- `Follow.sol` — Social graph (followers/following)
- `RewardToken.sol` — ERC20 token for rewards/tips
- `ContentNFT.sol` — ERC721 NFTs for content ownership

**Frontend (React + Vite):**
- MetaMask wallet integration
- Profile creation & management
- Feed with posts (mock data)
- Post creation
- Styled UI with contract calls

## 🚀 Quick Start

### Prerequisites
- Node.js ≥16
- MetaMask browser extension
- (Optional) Hardhat localhost node or testnet RPC

### Setup

1. **Clone & install:**
   ```bash
   git clone <repo>
   cd solidity-platform
   npm install
   ```

2. **Compile contracts:**
   ```bash
   npm run compile
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Deploy (local Hardhat node):**
   ```bash
   # Terminal 1: Start Hardhat node
   npx hardhat node

   # Terminal 2: Deploy contracts
   npm run deploy

   # Copy contract addresses to frontend/src/contracts/config.js
   ```

5. **Run frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Connect MetaMask:**
   - Connect to localhost:8545
   - Import accounts from Hardhat node (private keys in terminal output)
   - Test Profile, Post, and Follow pages

## 📦 Project Structure

```
solidity-platform/
├── contracts/                    # Solidity smart contracts
│   ├── Profile.sol
│   ├── Post.sol
│   ├── Follow.sol
│   ├── RewardToken.sol
│   └── ContentNFT.sol
├── test/                        # Contract tests (Hardhat + Chai)
│   ├── profile.test.js
│   ├── post.test.js
│   ├── follow.test.js
│   ├── reward.test.js
│   └── content.test.js
├── scripts/
│   └── deploy.js               # Deployment script
├── frontend/                    # React dApp
│   ├── src/
│   │   ├── contracts/          # ABIs, config, utilities
│   │   ├── pages/              # Profile, Feed, PostCreate
│   │   ├── components/         # WalletConnect
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── hardhat.config.js           # Hardhat configuration
├── package.json                # Root dependencies
├── .env.example                # Environment template
└── README.md                   # This file
```

## 🧪 Testing

All contracts have unit tests:

```bash
npm test
```

**Test Coverage:**
- ✓ Profile creation & updates
- ✓ Post creation with ID tracking
- ✓ Follow/unfollow logic
- ✓ Token minting & transfers
- ✓ NFT minting

Output: 7 tests passing (~900ms)

## 🌐 Deployment

### Local (Hardhat localhost)

```bash
# Start Hardhat node (Terminal 1)
npx hardhat node

# Deploy contracts (Terminal 2)
npm run deploy

# Output example:
# ✓ Profile deployed to: 0x5FbDB2315678afccb333f8a9c21a7a1d9e1f1234
# ✓ Post deployed to: 0x5FbDB2315678afccb333f8a9c21a7a1d9e1f5678
# ... etc
```

### Testnet (Sepolia)

1. **Setup environment:**
   ```bash
   cp .env.example .env
   # Add SEPOLIA_RPC_URL and DEPLOYER_PRIVATE_KEY to .env
   ```

2. **Deploy:**
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

3. **Update frontend config:**
   ```bash
   # Copy addresses to frontend/src/contracts/config.js
   # Update RPC_URL to testnet endpoint
   ```

### Mainnet

Same as testnet but use mainnet RPC and be careful with gas!

## 🔗 Contract Interaction

**From Frontend:**
- All pages use `useProfile`, `usePost`, `useFollow` hooks
- Calls go through `contractUtils.js` → ethers.js → contract ABIs
- MetaMask prompts for transaction signing

**From CLI (Hardhat):**
```bash
npx hardhat console --network localhost
# Inside console:
# > const Profile = await ethers.getContractFactory("Profile");
# > const p = await Profile.attach("0x...");
# > await p.createProfile("alice", "bio");
```

## 📝 Key Files

| File | Purpose |
|------|---------|
| `contracts/*.sol` | Smart contract logic |
| `test/*.test.js` | Contract unit tests |
| `scripts/deploy.js` | Deploy all contracts + log addresses |
| `frontend/src/contracts/abis.js` | Auto-generated contract ABIs |
| `frontend/src/contracts/config.js` | Contract addresses + RPC URL |
| `frontend/src/contracts/contractUtils.js` | Ethers.js wrapper functions |
| `frontend/src/contracts/hooks.js` | React hooks for contract calls |

## 🛠️ Available Scripts

**Root (Hardhat):**
```bash
npm install           # Install dependencies
npm run compile       # Compile contracts
npm test             # Run tests
npm run deploy       # Deploy to localhost (requires Hardhat node)
npm run clean        # Clean build artifacts
```

**Frontend:**
```bash
cd frontend
npm install          # Install frontend deps
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔐 Security Notes

- **Private Keys:** Never commit `.env` with real private keys
- **Contract Audits:** These are scaffold contracts; audit before mainnet
- **Access Control:** Add Ownable/roles to restrict minting functions
- **Gas Optimization:** Consider batch operations for production

## 🔄 Workflow

1. **Develop:** Write contract features + tests
2. **Test locally:** `npm test` on localhost
3. **Deploy:** `npm run deploy` to testnet
4. **Frontend test:** Update config + run `npm run dev`
5. **Iterate:** Repeat steps 1-4

## 📚 Resources

- [Hardhat Docs](https://hardhat.org)
- [Solidity Docs](https://docs.soliditylang.org)
- [Ethers.js Docs](https://docs.ethers.io)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

## 🚧 Next Steps

- [ ] Add The Graph subgraph for querying posts/events
- [ ] Integrate IPFS for content uploads (web3.storage or Pinata)
- [ ] Add access control (Ownable/AccessControl) to minting functions
- [ ] Implement like/reaction mechanics
- [ ] Add gas optimization (events instead of heavy reads)
- [ ] Create GitHub Actions CI/CD workflow
- [ ] Deploy to Sepolia testnet
- [ ] Add frontend error boundaries & better UX

## 📄 License

MIT

## 👥 Contributing

This is a scaffold/template project. Feel free to fork, modify, and use as a starting point for your own Web3 social platform!

---

**Questions?** Open an issue or refer to `DEPLOYMENT.md` for detailed deployment steps.