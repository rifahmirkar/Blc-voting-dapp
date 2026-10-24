# Member 2 Integration Information

This document provides exact technical details for **Member 2** to complete the 30% remaining portion of the Blockchain Voting DApp.

---

## 1. Smart Contract Methods & Interface Summary

### Read Functions (Free / No Gas)
1. **`getCandidatesCount()`**
   - **Returns:** `uint256` (Total count of registered candidates).
   - **Usage:** Call this first to loop through candidates `1` to `candidatesCount`.

2. **`getCandidate(uint256 _candidateId)`** or **`candidates(uint256)`**
   - **Parameter:** `_candidateId` (integer starting from 1).
   - **Returns:** `(uint256 id, string name, uint256 voteCount)`.
   - **Usage:** Fetch name and live vote count for each candidate to render dynamically in HTML.

3. **`hasVoted(address voterAddress)`**
   - **Parameter:** `voterAddress` (Ethereum `0x...` string).
   - **Returns:** `bool` (`true` if address has cast a vote, `false` otherwise).
   - **Usage:** Check if the connected user wallet has already voted to disable/enable Vote buttons.

### Write Functions (Requires Gas / Transaction Signing)
1. **`vote(uint256 _candidateId)`**
   - **Parameter:** `_candidateId` (integer candidate ID to vote for).
   - **Modifiers/Restrictions:** Reverts if caller has already voted (`"You have already voted."`) or if ID is invalid.
   - **Emits:** `Voted(uint256 candidateId, address voter)` event.
   - **Usage:** Triggered when voter clicks the "Vote" button for a specific candidate.

---

## 2. Member 2 Setup Instructions with ethers.js

Member 2 should include ethers.js CDN in `frontend/index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"></script>
```

In `frontend/script.js`, initialize Web3 provider and contract instance:

```javascript
// 1. Initialize Provider & Signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// 2. Load Contract Address & ABI
<p class="const contractAddress = "0x802cA473B972430c2d9C21C8120CB8A5A9e79b3d"; // Sepolia deploymentcard-desc">Candidates and voting results are retrieved directly from the Ethereum blockchain.</p>
const contractABI = [ /* JSON array from CONTRACT_ABI.json */ ];

// 3. Create Contract Instance
const votingContract = new ethers.Contract(contractAddress, contractABI, signer);
```

---

## 3. Dynamic Candidate Fetching Example for Member 2

```javascript
async function loadCandidates() {
    const count = await votingContract.getCandidatesCount();
    const grid = document.getElementById('candidateGrid');
    grid.innerHTML = ''; // Clear static HTML cards

    for (let i = 1; i <= count; i++) {
        const candidate = await votingContract.getCandidate(i);
        const cardHTML = `
            <div class="candidate-card" data-id="${candidate.id}">
                <div class="candidate-avatar">${candidate.name[0]}</div>
                <div class="candidate-info">
                    <span class="candidate-id">Candidate #${candidate.id}</span>
                    <h3 class="candidate-name">${candidate.name}</h3>
                    <div class="vote-count-badge">
                        <span class="count-val">${candidate.voteCount}</span> Votes
                    </div>
                </div>
                <button class="btn btn-primary vote-btn" onclick="castVote(${candidate.id})">
                    <span>Vote for ${candidate.name}</span>
                </button>
            </div>
        `;
        grid.innerHTML += cardHTML;
    }
}
```

---

## 4. Voting Transaction Submission Example for Member 2

```javascript
async function castVote(candidateId) {
    try {
        const tx = await votingContract.vote(candidateId);
        alert("Transaction submitted! Waiting for block confirmation...");
        await tx.wait(); // Wait for transaction to be mined
        alert("Vote cast successfully on Ethereum blockchain!");
        loadCandidates(); // Refresh vote counts dynamically
    } catch (error) {
        console.error("Voting failed:", error);
        alert(error.reason || "Voting failed or user rejected transaction.");
    }
}
```
