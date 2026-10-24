# Smart Contract Deployment Details

## Environment & Compiler Specification

- **Smart Contract File:** `contracts/Voting.sol`
- **Solidity Version:** `0.8.20` (or `^0.8.0`)
- **EVMS Version / Target:** Default (Cancun / Shanghai compatible)
- **License:** MIT (`// SPDX-License-Identifier: MIT`)
- **Recommended Deployment Tool:** Remix IDE (`https://remix.ethereum.org`)
- **Network Environment:** Remix VM (Cancun) / Sepolia Testnet / Injected Provider - MetaMask
- **Final Deployment Network:** Sepolia Testnet
- **Final Deployed Contract Address:** `0x802cA473B972430c2d9C21C8120CB8A5A9e79b3d`
- **Deployment Method:** Injected Provider - MetaMask

---

## Deployment Steps (Remix IDE)

1. **Open Remix IDE:** Go to [remix.ethereum.org](https://remix.ethereum.org).
2. **Create File:** Create `Voting.sol` in the Remix file explorer under `contracts/`.
3. **Paste Contract Code:** Copy the full code from `contracts/Voting.sol`.
4. **Compile:**
   - Go to **Solidity Compiler** tab on the left menu.
   - Select Compiler version `0.8.20` or higher.
   - Click **Compile Voting.sol**.
5. **Deploy:**
   - Go to **Deploy & Run Transactions** tab.
   - Select **Environment**:
     - For quick local testing: `Remix VM (Cancun)`
     - For live MetaMask testing: `Injected Provider - MetaMask`
   - In the **Deploy** box constructor input field `_candidateNames`, enter an array of strings:
     ```json
     ["Alice Johnson", "Bob Smith", "Charlie Brown"]
     ```
   - Click the orange **transact** / **Deploy** button.
6. **Save Contract Address:**
   - Copy the deployed contract address from the bottom left panel under **Deployed Contracts**.
   - Update `handover/CONTRACT_ADDRESS.txt`.

---

## Constructor Initial Candidate Parameters
When deploying the contract, pass the candidate names array:
`["Alice Johnson", "Bob Smith", "Charlie Brown"]`

This automatically registers Candidate #1, Candidate #2, and Candidate #3 with initial vote counts of `0`.
