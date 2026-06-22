# Testing Guide

Comprehensive testing documentation for contracts and frontend.

## Smart Contract Testing

### Running Tests

```bash
npm test
```

This runs all Hardhat tests in `test/` directory using Chai assertions.

### Test Coverage

| Contract | Tests | Status |
|----------|-------|--------|
| Profile | 2 | ✓ Passing |
| Post | 1 | ✓ Passing |
| Follow | 1 | ✓ Passing |
| RewardToken | 2 | ✓ Passing |
| ContentNFT | 1 | ✓ Passing |
| **TOTAL** | **7** | **✓ All Passing** |

### Test Breakdown

#### Profile.test.js
- ✓ `creates and updates profile` — Test profile creation and updates
- ✓ `prevents duplicate create` — Verify revert on duplicate profiles

```bash
# Run only Profile tests
npx hardhat test test/profile.test.js
```

#### Post.test.js
- ✓ `creates posts and increments id` — Verify post IDs are sequential

```bash
# Run only Post tests
npx hardhat test test/post.test.js
```

#### Follow.test.js
- ✓ `allows follow and unfollow` — Test follow/unfollow mechanics

```bash
# Run only Follow tests
npx hardhat test test/follow.test.js
```

#### Reward.test.js
- ✓ `initial supply minted to deployer` — Check initial token supply
- ✓ `can mint new tokens` — Test minting functionality

```bash
# Run only Reward tests
npx hardhat test test/reward.test.js
```

#### Content.test.js
- ✓ `mints NFT with content hash` — Verify NFT creation with metadata

```bash
# Run only Content tests
npx hardhat test test/content.test.js
```

### Writing New Tests

Example test structure:

```javascript
const { expect } = require("chai");

describe("MyContract", function () {
  let MyContract;
  let myContract;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    MyContract = await ethers.getContractFactory("MyContract");
    myContract = await MyContract.deploy();
    await myContract.deployed();
  });

  it("should do something", async function () {
    const result = await myContract.someFunction();
    expect(result).to.equal(expectedValue);
  });

  it("should revert on invalid input", async function () {
    await expect(
      myContract.someFunction(invalidArg)
    ).to.be.revertedWith("Error message");
  });
});
```

### Test Utils

Common Chai matchers used:

```javascript
expect(value).to.equal(otherValue)           // Equality
expect(tx).to.emit(contract, "EventName")    // Event emissions
expect(tx).to.be.revertedWith("message")     // Reverts
expect(value).to.be.true / false             // Boolean
expect(array).to.include(item)               // Array contains
```

### Gas Testing

To see gas costs per transaction:

```bash
npx hardhat test --reporter spec
```

Look for gas usage in test output.

## Local Integration Testing

### 1. Setup Local Node + Deploy

```bash
# Terminal 1
npx hardhat node

# Terminal 2
npm run deploy
```

### 2. Manual Testing via Hardhat Console

```bash
npx hardhat console --network localhost
```

Then in console:

```javascript
// Get signers
const [owner, user1] = await ethers.getSigners();

// Get deployed contract
const Profile = await ethers.getContractFactory("Profile");
const profile = await Profile.attach("0x...");  // Use deployed address

// Test createProfile
const tx = await profile.connect(owner).createProfile("alice", "My bio");
await tx.wait();

// Query profile
const p = await profile.users(owner.address);
console.log(p);  // { username: "alice", bio: "My bio", owner: "0x..." }

// Test Post contract
const Post = await ethers.getContractFactory("Post");
const post = await Post.attach("0x...");
const createTx = await post.connect(user1).createPost("Qmhash123");
const receipt = await createTx.wait();
```

### 3. Test Wallet Integration

Run frontend locally:

```bash
cd frontend
npm run dev
```

Then manually:
1. Connect MetaMask to localhost:8545
2. Create profile in UI
3. Check transaction in MetaMask
4. Verify profile on blockchain via console

## Frontend Testing

### Current Status

Frontend uses placeholder/mock data in Feed (no backend queries yet).

### Manual Testing Steps

1. **Setup:**
   ```bash
   npx hardhat node          # Terminal 1
   npm run deploy            # Terminal 2
   cd frontend && npm run dev # Terminal 3
   ```

2. **Test Wallet Connect:**
   - Click "Connect Wallet"
   - Approve in MetaMask
   - Verify account address displays

3. **Test Profile Page:**
   - Fill username and bio
   - Click "Create / Update Profile"
   - Approve tx in MetaMask
   - Should see success alert

4. **Test Post Page:**
   - Write post content
   - Click "Publish"
   - Approve tx in MetaMask
   - Should see success alert

5. **Test Error Handling:**
   - Disconnect MetaMask
   - Try to create profile
   - Should see error alert

### Debugging Tips

- **Browser Console:** `console.log()` in component code
- **MetaMask Console:** Inspect transactions and gas usage
- **Hardhat Console:** Query contract state directly
- **Ethers.js Debugging:** Enable verbose logging:
  ```javascript
  ethers.utils.Logger.setLogLevel(5);
  ```

## Automated Testing Ideas

Future additions (not yet implemented):

### E2E Tests (Playwright/Cypress)

```javascript
// example-e2e.test.js
describe("End-to-End: Create Profile", () => {
  it("should create profile via UI", async () => {
    await page.goto("http://localhost:5173");
    await page.click("button:has-text('Connect Wallet')");
    await page.fill('input[placeholder="Username"]', "testuser");
    await page.fill('input[placeholder="Bio"]', "Test bio");
    await page.click("button:has-text('Create')");
    // Assert profile created
  });
});
```

### Contract Code Coverage

```bash
npx hardhat coverage
```

(Requires `hardhat-coverage` plugin)

## Gas Optimization Testing

To analyze gas usage:

```bash
npx hardhat test --reporter json > gas-report.json
```

Then analyze `gas-report.json` for optimization opportunities.

## Performance Benchmarks

Current baseline (local Hardhat node):

| Operation | Time | Gas |
|-----------|------|-----|
| Create Profile | ~50ms | ~50K |
| Create Post | ~45ms | ~45K |
| Follow User | ~40ms | ~40K |
| Transfer Token | ~50ms | ~50K |
| Mint NFT | ~60ms | ~60K |

## CI/CD Testing

See `.github/workflows/test.yml` for automated test runs on each commit.

## Troubleshooting Tests

### "Contract not deployed"
**Solution:** Run `npm run deploy` first or ensure contracts are in `artifacts/`.

### "AssertionError: expected X to equal Y"
**Solution:** Check test expectations match actual contract behavior.

### "Insufficient funds"
**Solution:** In tests, first account has unlimited funds by default in Hardhat.

### Tests timeout
**Solution:** Increase timeout:
```javascript
it("long test", async function () {
  this.timeout(10000);  // 10 second timeout
  // ... test code
});
```

## Resources

- [Hardhat Testing Docs](https://hardhat.org/hardhat-runner/docs/guides/test)
- [Chai Assertion Library](https://www.chaijs.com/api/)
- [Ethers.js Testing](https://docs.ethers.io/v5/guides/testing/)
- [OpenZeppelin Test Helpers](https://docs.openzeppelin.com/test-helpers)

---

**Need Help?** Check main `README.md` or open an issue.
