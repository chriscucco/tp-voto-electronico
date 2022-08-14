// SPDX-License-Identifier: UNLICENCED
pragma solidity >= 0.4.22 < 0.9.0;

contract VotingPlatform {

    struct Proposal {
        string title;
        string description;
        string[] participants;
        string[] candidates;
        string[] votes;
        mapping (uint32 => string) votesById;
        // TODO - Add date
    }

    address owner;
    uint32 proposalIndex;
    mapping (uint32 => Proposal) proposals;

    // Events
    event RetrieveProposal(string title, string description, string[] candidates, uint32 proposalId);
    event RetrieveVote(string candidate);
    event RetrieveVotes(string[] votes);

    constructor() {
        // Set the owner of the contract to the address that deployed it
        owner = msg.sender;
    }

    // Function modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Function only callable by contract owner");
        _;
    }

    modifier onlyOnExsistantProposals(uint32 id) {
        require(id < proposalIndex, "Requested proposal does not exist");
        _;
    }

    modifier voteIsValid(uint32 proposalId, string calldata userId, string calldata candidate) {
        require(!didUserAlreadyVote(proposalId, userId), "User already voted");
        require(candidateExistsInProposal(proposalId, candidate), "Candidate does not exist");
        _;
    }

    function didUserAlreadyVote(uint32 proposalId, string calldata userId) private view returns(bool) {
        bool voted = false;
        Proposal storage proposal = proposals[proposalId];
        for (uint32 i = 0; i < proposal.participants.length; i++) {
            string memory currentParticipant = proposal.participants[i];
            if (keccak256(bytes(currentParticipant)) == keccak256(bytes(userId))) {
                voted = true;
            }
        }

        return voted;
    }

    function candidateExistsInProposal(uint32 proposalId, string calldata candidate) private view returns(bool) {
        bool exists = false;
        Proposal storage proposal = proposals[proposalId];
        for (uint32 i = 0; i < proposal.candidates.length; i++) {
            string memory currentCandidate = proposal.candidates[i];
            if (keccak256(bytes(currentCandidate)) == keccak256(bytes(candidate))) {
                exists = true;
            }
        }

        return exists;
    }
    

    // All functions are only callable by the owner of the contract to prevent outside users interaction
    function createProposal(string calldata title, string calldata description, string[] memory candidates) public onlyOwner {
        Proposal storage newProposal = proposals[proposalIndex++];
        newProposal.title = title;
        newProposal.description = description;
        newProposal.candidates = candidates;
        emit RetrieveProposal(title, description, candidates, proposalIndex - 1);
    }

    // Retrieve proposal by id
    function getProposal(uint32 id) public onlyOnExsistantProposals(id) onlyOwner {
        emit RetrieveProposal(proposals[id].title, proposals[id].description, proposals[id].candidates, id);
    }

    // Voting function. TODO - Check for duplicate votes UID? Refactor vote to (Candidate, UID) to avoid mapping?
    function vote(uint32 proposalId, uint32 voteUid, string calldata candidate, string calldata userId) public 
        onlyOwner onlyOnExsistantProposals(proposalId) voteIsValid(proposalId, userId, candidate)
    {
        Proposal storage proposal = proposals[proposalId];
        proposal.participants.push(userId);
        proposal.votes.push(candidate);
        proposal.votesById[voteUid] = candidate;
    }

    // Retrieve vote by uid
    function getVoteById(uint32 proposalId, uint32 voteId) public onlyOwner onlyOnExsistantProposals(proposalId) {
        emit RetrieveVote(proposals[proposalId].votesById[voteId]);
    }

    // Retrieve proposal votes
    function getProposalVotes(uint32 proposalId) public onlyOwner onlyOnExsistantProposals(proposalId) {
        emit RetrieveVotes(proposals[proposalId].votes);
    }
}
