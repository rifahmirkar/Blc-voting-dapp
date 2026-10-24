/**
 * Blockchain Voting DApp - Member 1 JavaScript Module
 * Focus: MetaMask Wallet Connection & Detection System
 * 
 * Note for Member 2:
 * Member 1 has implemented complete MetaMask detection, connection state management,
 * and UI status updates. Member 2 can plug contract interaction logic (ethers.js) directly 
 * into the connection success handler below.
 */
// ===============================
// MEMBER 2 - SMART CONTRACT SETUP
// ===============================

const contractAddress = "0x802cA473B972430c2d9C21C8120CB8A5A9e79b3d";

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_candidateNames",
                "type": "string[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "getCandidate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCandidatesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider = null;
let signer = null;
let votingContract = null;

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletStatusBox = document.getElementById('walletStatusBox');
    const walletStatusText = document.getElementById('walletStatusText');
    const accountInfo = document.getElementById('accountInfo');
    const userAddress = document.getElementById('userAddress');
    const metamaskWarning = document.getElementById('metamaskWarning');
    const transactionStatus = document.getElementById('transactionStatus');
    const transactionStatusText = document.getElementById('transactionStatusText');

    // Global state for Member 1
    let currentAccount = null;

    /**
     * Helper to truncate Ethereum addresses (e.g. 0x1234...5678)
     */
    function formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    /**
     * Check if MetaMask Provider (window.ethereum) is injected
     */
    function checkMetaMaskInstalled() {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    }

    /**
     * Display transaction status messages
     */
    function showTransactionStatus(message) {
        if (!transactionStatus || !transactionStatusText) {
            return;
        }

        transactionStatus.classList.remove('hidden');
        transactionStatusText.textContent = message;
    }

    /**
     * Update UI based on connection state
     */
    function updateUIConnected(account) {
        currentAccount = account;
        // Initialize ethers.js provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        // Create connection to the deployed Voting smart contract
        votingContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        loadCandidatesFromContract();

        // Update Wallet Status Box
        walletStatusBox.classList.remove('disconnected');
        walletStatusBox.classList.add('connected');
        walletStatusText.textContent = 'Status: Wallet Connected';

        // Display Account Address
        userAddress.textContent = formatAddress(account);
        userAddress.title = account; // Full address on tooltip
        accountInfo.classList.remove('hidden');

        // Update Connect Button UI
        connectWalletBtn.classList.remove('btn-primary');
        connectWalletBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        connectWalletBtn.style.border = '1px solid #10B981';
        connectWalletBtn.style.color = '#10B981';
        connectWalletBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Wallet Connected (${formatAddress(account)})</span>
        `;
        
        console.log("TAKE SCREENSHOT NOW - MetaMask Connected Successfully:", account);

        // =========================================================================
        // MEMBER 2 INTEGRATION POINT:
        // When Member 2 integrates ethers.js, place contract instance initialization
        // and dynamic candidate/vote loading calls right here:
        // Example for Member 2:
        // initContractInstance(account);
        // loadCandidatesFromContract();
        // =========================================================================

        // Test smart contract connection

    }

    /**
     * Reset UI when disconnected or account lost
     */
    function updateUIDisconnected() {
        currentAccount = null;

        walletStatusBox.classList.remove('connected');
        walletStatusBox.classList.add('disconnected');
        walletStatusText.textContent = 'Status: Wallet Not Connected';

        accountInfo.classList.add('hidden');

        connectWalletBtn.className = 'btn btn-primary';
        connectWalletBtn.style.background = '';
        connectWalletBtn.style.border = '';
        connectWalletBtn.style.color = '';
        connectWalletBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span>Connect MetaMask Wallet</span>
        `;
    }

    /**
     * Request connection to MetaMask wallet
     */
    async function connectWallet() {
        if (!checkMetaMaskInstalled()) {
            metamaskWarning.classList.remove('hidden');
            alert("MetaMask extension is not detected. Please install MetaMask to use this application.");
            return;
        }

        try {
            // Request account access from MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            if (accounts && accounts.length > 0) {
                updateUIConnected(accounts[0]);
            } else {
                updateUIDisconnected();
            }
        } catch (error) {
            console.error("MetaMask connection error:", error);
            if (error.code === 4001) {
                alert("Connection request was rejected by the user.");
            } else {
                alert(`MetaMask Connection Error: ${error.message || error}`);
            }
            updateUIDisconnected();
        }
    }

    /**
     * Initialize existing accounts check on load
     */
    async function checkExistingConnection() {
        if (!checkMetaMaskInstalled()) {
            metamaskWarning.classList.remove('hidden');
            return;
        }

        try {
            // Check if already connected without prompting user
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
                updateUIConnected(accounts[0]);
            }
        } catch (error) {
            console.error("Error checking existing connection:", error);
        }
    }

    // Set up Event Listeners
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }

    // Handle wallet account/network changes dynamically
    if (checkMetaMaskInstalled()) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                updateUIConnected(accounts[0]);
            } else {
                updateUIDisconnected();
            }
        });

        window.ethereum.on('chainChanged', () => {
            // Reload page on network change as recommended by Web3 standards
            window.location.reload();
        });
    }

    // Perform initial wallet check
    checkExistingConnection();
    /**
     * Load candidates directly from the blockchain
     */
    async function loadCandidatesFromContract() {
        if (!votingContract) {
            console.error("Voting contract is not initialized.");
            return;
        }

        try {
            const count = await votingContract.getCandidatesCount();

            const alreadyVoted = await votingContract.hasVoted(currentAccount);

            console.log("Has current wallet voted:", alreadyVoted);

            const candidateGrid = document.getElementById('candidateGrid');

            if (!candidateGrid) {
                console.error("Candidate grid element not found.");
                return;
            }

            candidateGrid.innerHTML = '';

            for (let i = 1; i <= count.toNumber(); i++) {
                const candidate = await votingContract.getCandidate(i);

                const candidateId = candidate.id.toNumber();
                const candidateName = candidate.name;
                const voteCount = candidate.voteCount.toNumber();

                const card = document.createElement('div');
                card.className = 'candidate-card';
                card.dataset.id = candidateId;

                card.innerHTML = `
                    <div class="candidate-avatar">
                        ${candidateName.charAt(0).toUpperCase()}
                    </div>

                    <div class="candidate-info">
                        <span class="candidate-id">
                            Candidate #${candidateId}
                        </span>

                        <h3 class="candidate-name">
                            ${candidateName}
                        </h3>

                        <div class="vote-count-badge">
                            <span class="count-val">${voteCount}</span> Votes
                        </div>
                    </div>

                    <button
                        class="btn btn-primary vote-btn"
                        data-candidate-id="${candidateId}"
                    >
                        <span>Vote for ${candidateName}</span>
                    </button>
                `;

                candidateGrid.appendChild(card);

                if (alreadyVoted) {
                    const voteButton = card.querySelector('.vote-btn');

                    voteButton.disabled = true;
                    voteButton.textContent = 'Already Voted';
                } else {
                    const voteButton = card.querySelector('.vote-btn');

                    voteButton.addEventListener('click', async () => {
                        await voteForCandidate(candidateId);
                    });
                }
            }

            console.log("Candidates loaded from blockchain:", count.toNumber());

        } catch (error) {
            console.error("Failed to load candidates:", error);
        }
    }
    /**
     * Cast a vote for a candidate on the blockchain
     */
    async function voteForCandidate(candidateId) {
        if (!votingContract) {
            console.error("Voting contract is not initialized.");
            return;
        }

        try {
            console.log("Sending vote transaction for candidate:", candidateId);
            
            showTransactionStatus("Waiting for MetaMask confirmation...");

            const transaction = await votingContract.vote(candidateId);

            console.log("Transaction submitted:", transaction.hash);

            showTransactionStatus("Transaction submitted. Waiting for blockchain confirmation...");

            await transaction.wait();

            console.log("Vote confirmed on blockchain:", transaction.hash);

            showTransactionStatus("Vote successfully recorded on the blockchain.");

            alert("Your vote has been successfully recorded!");

            await loadCandidatesFromContract();

        } catch (error) {
            console.error("Voting transaction failed:", error);

            if (error.code === 4001) {
                showTransactionStatus("Transaction was rejected in MetaMask.");
                alert("You rejected the voting transaction.");
            } else if (error.reason) {
                showTransactionStatus(error.reason);
                alert(error.reason);
            } else if (error.data && error.data.message) {
                showTransactionStatus(error.data.message);
                alert(error.data.message);
            } else {
                showTransactionStatus("Voting transaction failed.");
                alert("Voting failed. Please check MetaMask and try again.");
            }
        }
    }
});
