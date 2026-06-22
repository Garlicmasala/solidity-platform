# Contributing Guide

Thank you for your interest in contributing to Solidity Platform! This guide will help you get started.

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/solidity-platform.git
cd solidity-platform
```

### 2. Setup Development Environment

```bash
# Use Node 18 (check .nvmrc)
nvm use

# Install dependencies
npm install

# Setup frontend
cd frontend && npm install && cd ..
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-like-functionality`
- `fix/profile-update-bug`
- `docs/update-deployment-guide`
- `test/increase-coverage`

## Development Workflow

### Smart Contracts

**Making Changes:**

```bash
# 1. Edit contract in contracts/
vim contracts/Profile.sol

# 2. Compile
npm run compile

# 3. Write/update tests
vim test/profile.test.js

# 4. Run tests
npm test

# 5. Commit
git add contracts/ test/
git commit -m "feat: add like functionality to posts"
```

**Testing Before Push:**

```bash
npm test                  # All tests
npm run compile          # Verify compilation
npx hardhat clean        # Clean build
npm test                 # Re-test
```

### Frontend

**Making Changes:**

```bash
# 1. Edit component in frontend/src/
vim frontend/src/pages/Profile.jsx

# 2. Start dev server
cd frontend && npm run dev

# 3. Test in browser (http://localhost:5173)

# 4. Build to check for errors
npm run build

# 5. Commit
git add frontend/src/
git commit -m "feat: add follow button to profile"
```

## Code Style

### Solidity

- Use 4-space indentation
- Follow [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use UPPERCASE for constants: `uint256 public constant MAX_SUPPLY = 1000000`
- Add NatSpec comments to public functions:

```solidity
/// @notice Creates a new profile for the caller
/// @param username The user's display name
/// @param bio The user's bio text
function createProfile(string calldata username, string calldata bio) external {
  // ...
}
```

### JavaScript

- Use 2-space indentation (frontend convention)
- Use `const` by default, `let` when needed
- Use arrow functions: `() => {}`
- Add JSDoc for exported functions:

```javascript
/**
 * Create a new profile on-chain
 * @param {string} username - User's display name
 * @param {string} bio - User's bio
 * @returns {Promise} Transaction receipt
 */
export async function createProfile(username, bio) {
  // ...
}
```

## Testing Requirements

All changes must include tests and pass:

```bash
# Smart contracts
npm test

# Frontend (manual testing or E2E)
cd frontend && npm run build
```

## Commit Message Format

Use conventional commits:

```
type(scope): subject

Optional body with more details
Optional footer with breaking changes or issue references
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Test additions/changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `chore:` Build, deps, etc.

**Examples:**
```
feat(post): add like functionality
fix(profile): prevent duplicate profiles
docs(deployment): add Sepolia testnet guide
test(profile): increase test coverage to 90%
```

## Pull Request Process

### 1. Before Pushing

```bash
# Ensure tests pass
npm test

# Ensure frontend builds
cd frontend && npm run build && cd ..

# Check for secrets
if grep -r "PRIVATE_KEY\|0x[a-f0-9]\{64\}" --include="*.js" --include="*.sol" .; then
  echo "⚠️ Possible secrets detected!"
fi
```

### 2. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- **Title:** Follow commit message format
- **Description:** Explain what changed and why
- **Screenshots:** If UI changes
- **Testing:** List test steps

### 3. PR Template

```markdown
## Description
Brief description of changes

## Type
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No breaking changes

## Checklist
- [ ] Code follows style guidelines
- [ ] No secrets in code
- [ ] README updated if needed
- [ ] Tests pass locally
- [ ] Frontend builds successfully
```

### 4. Review & Merge

Maintainers will:
1. Review code
2. Request changes if needed
3. Run CI/CD checks
4. Merge when approved

## Development Tips

### Local Testing

```bash
# Terminal 1: Hardhat node
npx hardhat node

# Terminal 2: Deploy contracts
npm run deploy

# Terminal 3: Frontend
cd frontend && npm run dev

# Terminal 4: Run tests
npm test
```

### Debugging Contracts

```bash
# Hardhat console
npx hardhat console --network localhost

# In console:
> const c = await ethers.getContractFactory("Profile");
> const p = await c.attach("0x...");
> await p.createProfile("test", "bio");
```

### Debugging Frontend

```javascript
// In React components
import { ethers } from 'ethers'
ethers.utils.Logger.setLogLevel(5)  // Enable verbose logging
console.log('Debug info:', data)
```

## Documentation

Update docs for:
- New features
- Changed APIs
- Deployment process
- Configuration options

Docs to check:
- `README.md` — Overview & quick start
- `DEPLOYMENT.md` — Deployment guide
- `TESTING.md` — Testing guide
- `frontend/README.md` — Frontend setup

## Areas for Contribution

### High Priority
- [ ] Add The Graph subgraph
- [ ] Integrate IPFS/web3.storage
- [ ] Add access control to minting
- [ ] Implement like/reaction feature
- [ ] Add error boundaries in frontend

### Medium Priority
- [ ] Improve UI/UX
- [ ] Add more contract tests
- [ ] Gas optimization
- [ ] Event filtering/indexing

### Low Priority
- [ ] Documentation improvements
- [ ] Code comments
- [ ] Type safety (TypeScript conversion)
- [ ] Performance monitoring

## Questions?

- **Issues:** Open a GitHub issue for bugs or questions
- **Discussions:** Use GitHub Discussions for feature ideas
- **Security:** Report security issues privately to maintainers

## Code of Conduct

Please be respectful and constructive. This is a learning project!

---

**Thank you for contributing!** 🎉
