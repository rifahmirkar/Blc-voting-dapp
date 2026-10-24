// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Voting
 * @dev Decentralized Voting Smart Contract for Ethereum
 */
contract Voting {
    // Structure representing a single candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    // Store candidates by their ID (1, 2, 3...)
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;

    // Mapping to track whether an Ethereum address has already cast a vote
    mapping(address => bool) public hasVoted;

    // Event emitted whenever a valid vote is cast
    event Voted(uint256 indexed candidateId, address indexed voter);

    /**
     * @dev Constructor initializes the smart contract with candidate names
     * @param _candidateNames Array of candidate names (e.g. ["Alice", "Bob"])
     */
    constructor(string[] memory _candidateNames) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            addCandidate(_candidateNames[i]);
        }
    }

    // Private helper function to register a new candidate
    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    /**
     * @dev Casts a vote for a specific candidate ID
     * @param _candidateId ID of the candidate being voted for
     */
    function vote(uint256 _candidateId) public {
        // Prevent duplicate voting: sender address must not have voted yet
        require(!hasVoted[msg.sender], "You have already voted.");

        // Validate candidate ID
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        // Mark sender address as having voted
        hasVoted[msg.sender] = true;

        // Increment candidate's vote tally
        candidates[_candidateId].voteCount++;

        // Emit Voted event
        emit Voted(_candidateId, msg.sender);
    }

    /**
     * @dev Returns candidate details by ID
     */
    function getCandidate(uint256 _candidateId) public view returns (uint256 id, string memory name, uint256 voteCount) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");
        Candidate memory c = candidates[_candidateId];
        return (c.id, c.name, c.voteCount);
    }

    /**
     * @dev Returns the total number of registered candidates
     */
    function getCandidatesCount() public view returns (uint256) {
        return candidatesCount;
    }
}
