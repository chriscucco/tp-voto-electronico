// SPDX-License-Identifier: UNLICENCED
pragma solidity >= 0.4.22 < 0.9.0;

contract TestContract {

    struct Proposal {
        string title;
        string description;
        // Add voting options. Struct? String array? Mapping?
        // Add results array
        mapping (address => bool) voted;
    }

    address owner;
    uint proposalIndex;
    mapping (uint => Proposal) proposals;

    // Events
    event ProposalEvent(string title, string description);

    constructor() {
        // Set the owner of the contract to the address that deployed it
        owner = msg.sender;
    }

    // Function modifier that only allows functions to be called by contract owner
    modifier onylOwner() {
        require(msg.sender == owner, "Function only callable by contract owner");
        _;
    }

    modifier onlyOnExsistantProposals(uint id) {
        require(id < proposalIndex, "Requested proposal does not exist");
        _;
    }
    
    // Create new prosal, only callable by owner
    function createProposal(string memory title, string memory description) public onylOwner {
        Proposal storage newProposal = proposals[proposalIndex++];
        newProposal.title = title;
        newProposal.description = description;
        emit ProposalEvent(title, description);
    }

    // Retrieve proposal by id
    function getProposals(uint id) public onlyOnExsistantProposals(id) {
        emit ProposalEvent(proposals[id].title, proposals[id].description);
    }

    // Voting function
    function vote(uint proposalId, uint optionId) public onlyOnExsistantProposals(proposalId) {
        Proposal storage proposal = proposals[proposalId];
        proposal.voted[msg.sender] = true;
    }

    // Check if the <voterAddress> voted the proposal <proposalId>
    function getVotingStatus(uint proposalId, address voterAddress) public view onlyOnExsistantProposals(proposalId) returns (bool) {
        Proposal storage proposal = proposals[proposalId];
        return proposal.voted[voterAddress];
    }
}