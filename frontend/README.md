# Frontend (Vite + React)

Minimal dApp frontend with MetaMask wallet integration and contract calls.

## Setup

```bash
cd frontend
npm install
npm run dev
```

## Features

- **Wallet Connect:** MetaMask integration via `window.ethereum`
- **Contract ABIs:** Automatically extracted from compiled contracts
- **Contract Calls:** Profile creation, post publishing, follow/unfollow
- **Pages:** Feed, Profile, New Post

## Contract Integration

Contract ABIs are in `src/contracts/abis.js` (auto-generated from Hardhat build).

Contract addresses in `src/contracts/config.js` (update after deployment).

Utils in `src/contracts/contractUtils.js` and hooks in `src/contracts/hooks.js`.

## To Deploy & Connect

1. Deploy contracts to testnet/mainnet
2. Update contract addresses in `src/contracts/config.js`
3. Update RPC URL if not using Hardhat localhost
4. Run frontend and connect MetaMask to the same network

## Next Steps

- Integrate The Graph for querying posts/events (instead of mock data in Feed)
- Add IPFS integration for content uploads
- Add error boundaries and better UI feedback
- Add access control to contract mint functions

