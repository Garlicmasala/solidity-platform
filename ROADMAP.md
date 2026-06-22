# Roadmap & Milestone Planning

Prioritized user stories grouped into milestones with effort estimates and dependencies.

## Estimation Framework

**Effort Sizes (Story Points):**
- 🟢 **1-2 pts:** Trivial (hours)
- 🟡 **3-5 pts:** Small (1-2 days)
- 🟠 **8-13 pts:** Medium (3-5 days)
- 🔴 **21+ pts:** Large (1-2 weeks+)

**Status Legend:**
- ✅ Done
- 🔨 In Progress
- 📋 Todo
- ❌ Blocked

---

## 🎯 MVP (Milestone 0) — Shipped ✅

**Timeline:** Completed  
**Total Effort:** ~50 pts

### Contracts
- ✅ **US-A1** — Wallet-based login (via ethers.js) — 🟢 2 pts
- ✅ **US-A2** — Create decentralized profile (Profile.sol) — 🟡 5 pts
- ✅ **US-A3** — Update profile metadata — 🟡 3 pts
- ✅ **US-B1** — Create a post (Post.sol) — 🟡 5 pts
- ✅ **US-C1** — Follow another user (Follow.sol) — 🟡 5 pts
- ✅ **US-D2** — Tip creators (RewardToken.sol) — 🟡 4 pts
- ✅ **US-D3** — Mint content as NFT (ContentNFT.sol) — 🟡 4 pts

### Frontend
- ✅ React + Vite scaffold — 🟡 5 pts
- ✅ MetaMask wallet integration — 🟡 3 pts
- ✅ Profile page — 🟡 3 pts
- ✅ Post creation page — 🟡 3 pts
- ✅ Feed page (mock data) — 🟡 3 pts

### Infrastructure
- ✅ Hardhat setup + tests (7 passing) — 🟡 4 pts
- ✅ Deployment script — 🟡 2 pts
- ✅ Documentation (README, DEPLOYMENT, TESTING) — 🟡 3 pts
- ✅ GitHub Actions CI/CD — 🟡 3 pts

**MVP Deliverables:** Working dApp with profiles, posts, follows, tips, NFTs.

---

## 📍 Phase 1 — Core Features (Weeks 1-3)

**Timeline:** 3 weeks  
**Total Effort:** ~80 pts

### 1.1 — Enhanced Feed & Discovery 🟠 21 pts

- 📋 **US-B2** — View posts (with filtering, pagination) — 🟠 8 pts
  - **Tasks:**
    - Query past posts from contract events (ethers.js filter)
    - Add pagination (10 posts per page)
    - Display author, timestamp, content hash
    - Link to IPFS (placeholder)
  - **Dependencies:** Post.sol ✅
  - **Frontend:** Feed.jsx enhancement
  - **Testing:** 3 unit tests

- 📋 **US-B3** — Like/react to posts — 🟠 13 pts
  - **Tasks:**
    - Add `Reaction.sol` contract (mapping postId → likes)
    - Prevent duplicate likes
    - Emit ReactionAdded/Removed events
    - Frontend: Like button + UI feedback
    - Tests: 4 unit tests
  - **Dependencies:** Post.sol ✅
  - **Contracts:** New Reaction.sol
  - **Frontend:** Like button in Feed
  - **Testing:** 4 unit tests

### 1.2 — Follow Graph Enhancements 🟡 13 pts

- 📋 **US-C2** — View followers/following — 🟡 8 pts
  - **Tasks:**
    - getFollowers(address) → returns count + paginated list
    - getFollowing(address) → returns following list
    - Frontend: Profile page stats (followers count)
  - **Dependencies:** Follow.sol ✅
  - **Frontend:** Profile.jsx enhancement
  - **Testing:** 2 unit tests

- 📋 **US-C3** — Portability of social graph — 🟡 5 pts
  - **Tasks:**
    - Document social graph on-chain persistence
    - Export follower list as JSON
    - Future: Bridge to other protocols (not implemented yet)
  - **Dependencies:** Follow.sol ✅, C2 complete

### 1.3 — Token Rewards 🟠 21 pts

- 📋 **US-D1** — Earn tokens for engagement — 🟠 13 pts
  - **Tasks:**
    - Add `RewardDistributor.sol` contract
    - Track post likes, calculate rewards (e.g., 1 token per 10 likes)
    - Distribute rewards on-chain (batch or trigger-based)
    - Frontend: Show earned tokens in Profile
  - **Dependencies:** RewardToken.sol ✅, Reaction.sol (Phase 1.1)
  - **Contracts:** New RewardDistributor.sol
  - **Frontend:** Earnings display
  - **Testing:** 5 unit tests

- 📋 **US-D2** — Already in MVP but enhance — 🟡 5 pts
  - **Tasks:**
    - Add recipient profile lookup in UI
    - Transaction history (Tip ledger)
    - Gas optimization
  - **Dependencies:** RewardToken.sol ✅
  - **Frontend:** Tip UI enhancements
  - **Testing:** 2 unit tests

- 📋 **US-D4** — Collect posts — 🟡 3 pts
  - **Tasks:**
    - Frontend: "Collect" button on posts
    - Mints ContentNFT when user collects
    - Tracks collection count
  - **Dependencies:** ContentNFT.sol ✅, Feed
  - **Frontend:** Collect button
  - **Testing:** 1 unit test

### 1.4 — IPFS Integration 🟠 13 pts

- 📋 **US-F1** — Store content on decentralized storage — 🟠 13 pts
  - **Tasks:**
    - Integrate web3.storage or Pinata SDK
    - Upload content before posting
    - Return IPFS hash to Post.sol
    - Display content from IPFS gateway
  - **Dependencies:** Post.sol ✅, B1 ✅
  - **Frontend:** File upload in PostCreate
  - **Testing:** 3 integration tests

**Phase 1 Subtotal: 80 pts**

---

## 🗺️ Phase 2 — Governance & Moderation (Weeks 4-6)

**Timeline:** 3 weeks  
**Total Effort:** ~60 pts

### 2.1 — Content Moderation 🟠 21 pts

- 📋 **US-E2** — Report content — 🟡 8 pts
  - **Tasks:**
    - Add `ContentReport.sol` contract
    - Report structure: postId, reason, reporter address
    - Emit ReportCreated event
    - Frontend: Report button on posts
  - **Dependencies:** Post.sol ✅
  - **Contracts:** New ContentReport.sol
  - **Frontend:** Report modal/form
  - **Testing:** 3 unit tests

- 📋 **US-E3** — Decentralized moderation — 🟠 13 pts
  - **Tasks:**
    - Add `ModerationDAO.sol` contract
    - Voting on reported content (approve/reject)
    - Action: mark post as removed (flag only, not deleted)
    - Reward voters with governance tokens
  - **Dependencies:** ContentReport.sol (E2), RewardToken ✅
  - **Contracts:** New ModerationDAO.sol
  - **Frontend:** Moderator dashboard (gated to voters)
  - **Testing:** 4 unit tests

### 2.2 — Governance Participation 🟠 21 pts

- 📋 **US-E1** — Participate in governance — 🟠 21 pts
  - **Tasks:**
    - Create `GovernanceToken.sol` (mintable DAO token)
    - Add voting mechanics (vote on platform rules)
    - Voting contract: proposal storage, vote tracking
    - Frontend: Governance page with active proposals
  - **Dependencies:** RewardToken ✅
  - **Contracts:** New GovernanceToken.sol, Voting.sol
  - **Frontend:** Governance page (new route)
  - **Testing:** 6 unit tests

### 2.3 — Transparency & Auditing 🟡 13 pts

- 📋 **US-F3** — Transparency of actions — 🟡 8 pts
  - **Tasks:**
    - Document all contract events
    - Add event indexing (subgraph)
    - Show action timeline on profile
  - **Dependencies:** All contracts
  - **Frontend:** Activity feed on profile
  - **Testing:** 2 unit tests

- 📋 **US-F2** — Ensure censorship resistance — 🟡 5 pts
  - **Tasks:**
    - Document: data on-chain + IPFS = censorship resistant
    - Add redundancy (backup IPFS nodes)
    - No-op: protocol is already censorship-resistant by design
  - **Dependencies:** F1 ✅
  - **Documentation:** Update README

**Phase 2 Subtotal: 60 pts**

---

## 🚀 Phase 3 — Scale & Optimize (Weeks 7-9)

**Timeline:** 3 weeks  
**Total Effort:** ~50 pts

### 3.1 — Advanced Features 🟠 21 pts

- 📋 **US-B4** — Comment on posts — 🟠 13 pts
  - **Tasks:**
    - Add `Comment.sol` contract
    - Comment structure: postId, authorId, content hash
    - Threading (reply to comments)
    - Frontend: Comment section on post detail
  - **Dependencies:** Post.sol ✅, IPFS ✅
  - **Contracts:** New Comment.sol
  - **Frontend:** Comment UI component
  - **Testing:** 4 unit tests

- 📋 **Enhanced Notifications** — 🟡 8 pts
  - **Tasks:**
    - Notify user on: follow, like, tip, comment, governance vote
    - Store notifications on-chain (lightweight)
    - Frontend: Notification bell + dropdown
  - **Dependencies:** All interaction contracts
  - **Contracts:** New Notification.sol
  - **Frontend:** Notification component
  - **Testing:** 3 unit tests

### 3.2 — Gas Optimization 🟠 15 pts

- 📋 **Optimize contract storage** — 🟠 10 pts
  - **Tasks:**
    - Batch operations (follow multiple users)
    - Optimize event filtering (reduce redundant queries)
    - Pack structs (reduce storage slots)
    - Tests: Gas benchmarks
  - **Contracts:** All contracts
  - **Testing:** 5 performance tests

- 📋 **Frontend optimization** — 🟡 5 pts
  - **Tasks:**
    - Code splitting (lazy load pages)
    - Cache ABIs & contract addresses
    - Memoize contract queries
  - **Frontend:** All pages
  - **Testing:** 2 bundle size tests

### 3.3 — Security Hardening 🟠 14 pts

- 📋 **Access control** — 🟠 8 pts
  - **Tasks:**
    - Add Ownable/AccessControl to minting
    - Role-based permissions (admin, moderator, user)
    - Rate limiting (prevent spam)
  - **Contracts:** All contracts needing access control
  - **Testing:** 4 unit tests

- 📋 **Contract audits** — 🟡 6 pts
  - **Tasks:**
    - Internal audit checklist
    - Reentrancy checks
    - Integer overflow/underflow (Solidity 0.8+ handles)
    - External audit (optional, paid)
  - **Documentation:** Security audit report
  - **Testing:** 3 security tests

**Phase 3 Subtotal: 50 pts**

---

## 📊 Summary by Phase

| Phase | Duration | Effort | Status |
|-------|----------|--------|--------|
| **MVP** | Completed | 50 pts | ✅ |
| **Phase 1** | 3 weeks | 80 pts | 📋 |
| **Phase 2** | 3 weeks | 60 pts | 📋 |
| **Phase 3** | 3 weeks | 50 pts | 📋 |
| **TOTAL** | 9 weeks | 240 pts | |

---

## 📅 Phase 1 Detailed Timeline (Weeks 1-3)

### Week 1: Feed & Reactions (40 pts)
- **Days 1-2:** Query past posts from events (10 pts)
- **Days 2-3:** Add like mechanism + Reaction.sol (15 pts)
- **Days 4-5:** Frontend Like button + tests (10 pts)
- **Review + Buffer:** 5 pts

### Week 2: Follow & Earnings (40 pts)
- **Days 1-2:** getFollowers/Following (8 pts)
- **Days 2-3:** RewardDistributor contract (13 pts)
- **Days 4-5:** Frontend earnings display + tests (15 pts)
- **Review:** 4 pts

### Week 3: IPFS & Polish (20 pts)
- **Days 1-3:** web3.storage integration (13 pts)
- **Days 4-5:** Documentation + testing (7 pts)

---

## 🎯 Prioritization Principles

1. **MVP First:** Core identity, posts, follows already done ✅
2. **Network Effects:** Feed & discovery early (more engaging)
3. **Token Economy:** Rewards attract creators (high value)
4. **Governance:** Later (less urgent for users, more for sustainability)
5. **Gas Optimization:** Ongoing throughout (critical for mainnet)

---

## ⚠️ Dependencies & Blockers

**Phase 1 Dependencies:**
```
Feed (B2) ← Post.sol ✅
Reactions (B3) ← Post.sol ✅
Rewards (D1) ← RewardToken ✅ + Reactions
IPFS (F1) ← Post.sol ✅
```

**Phase 2 Dependencies:**
```
Governance (E1) ← RewardToken ✅
Moderation (E3) ← ContentReport (E2)
```

**Blockers:**
- ❌ The Graph subgraph (needed for efficient Feed queries) — can use ethers.js filter for now
- ❌ IPFS SDK (web3.storage) — easy integration
- ❌ Mainnet testnet RPC — use Sepolia for testing

---

## 📈 Team & Capacity

**Assumptions:**
- 1 full-time Solidity engineer
- 1 full-time React/frontend engineer
- 1 part-time DevOps (deployment, CI/CD)

**Velocity:** ~60 pts/week (assuming focused sprints)

**Timeline Reality:**
- MVP: ✅ Done
- Phase 1: ~2 weeks (if parallel contracts + frontend)
- Phase 2: ~2 weeks
- Phase 3: ~1.5 weeks
- **Total: 5.5 weeks for full feature set**

---

## 🔄 Agile Sprint Plan

### Sprint 1 (Phase 1.1-1.2)
**Goal:** Feed with reactions and follow stats  
**Story Points:** 34  
**Duration:** 1 week

Tasks:
- [ ] Enhance Feed (query past posts)
- [ ] Add Reaction.sol contract
- [ ] Follow stats on Profile
- [ ] 15+ tests

### Sprint 2 (Phase 1.3-1.4)
**Goal:** Token rewards and IPFS  
**Story Points:** 46  
**Duration:** 1 week

Tasks:
- [ ] RewardDistributor contract
- [ ] web3.storage integration
- [ ] Earnings display
- [ ] Collect button
- [ ] 15+ tests

### Sprint 3 (Phase 2.1-2.2)
**Goal:** Moderation and governance  
**Story Points:** 42  
**Duration:** 1 week

Tasks:
- [ ] ContentReport contract
- [ ] ModerationDAO voting
- [ ] GovernanceToken & voting
- [ ] Moderator dashboard
- [ ] 12+ tests

### Sprint 4 (Phase 2.3-3.1)
**Goal:** Transparency, comments, notifications  
**Story Points:** 41  
**Duration:** 1 week

Tasks:
- [ ] Event indexing for transparency
- [ ] Comment.sol contract
- [ ] Notification system
- [ ] Comment UI
- [ ] 10+ tests

### Sprint 5 (Phase 3.2-3.3)
**Goal:** Gas optimization and security  
**Story Points:** 28  
**Duration:** 1 week

Tasks:
- [ ] Optimize contracts
- [ ] Optimize frontend bundle
- [ ] Access control
- [ ] Security audit checklist
- [ ] 8+ tests

---

## 🎓 Learning Path

For contributors, tackle stories in this order to build skills:

1. **Beginner:** US-C2 (view followers) → simple contract query
2. **Intermediate:** US-B3 (likes) → new contract + events
3. **Advanced:** US-D1 (rewards) → complex state management
4. **Expert:** US-E3 (moderation) → DAO voting logic

---

## 📝 Notes

- **Gas Costs:** Estimate ~50-100K gas per contract interaction on mainnet (~$5-20 USD at current rates)
- **Mainnet Readiness:** Phase 1 complete + security audit required
- **The Graph:** Highly recommended for Phase 2+ (real-time indexing)
- **Monitoring:** Add Etherscan API integration for transaction tracking
- **Community:** Larger community engagement (forums, Discord) recommended before Phase 2

---

Next step: **Start Phase 1 Sprint 1** (Feed + Reactions)

See individual issues on GitHub for task breakdowns, or request detailed specs for any feature!
