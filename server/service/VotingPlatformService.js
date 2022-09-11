const contract = require('@truffle/contract');
const VotingPlatformArtifact = require('../../src/contracts/VotingPlatform.json');
const Provider = require('@truffle/hdwallet-provider');
const seed = require("../../secrets.json");

class VotingPlatformService {

    constructor() {
        this.provider = new Provider(seed.mnemonic, 'https://rpc-mumbai.maticvigil.com'); 
        this.account = this.provider.addresses[0];
        this.votingPlatformContract = contract(VotingPlatformArtifact);
        this.votingPlatformContract.setProvider(this.provider);
    }

    async _initContractInstance() {
        console.log(`Initializing contract instance with account: ${this.account}`)
        this.contractInstance = await this.votingPlatformContract.deployed();
    }

    async _getContractInstance() {
        if (!this.contractInstance) {
            await this._initContractInstance();
        } 

        return this.contractInstance;
    }

    async getProposal(proposalId) {
        const instance = await this._getContractInstance();
        const receipt = await instance.getProposal(proposalId, { from: this.account });
        console.log(receipt);
        const proposal = receipt.logs[0].args;
        return {
            id: proposal.proposalId.toString(),
            title: proposal.title
        }
    }

    async getVoteById(proposalId, voteId) {
        const instance = await this._getContractInstance();
        const receipt = await instance.getVoteById(proposalId, voteId, { from: this.account });
        const vote = receipt.logs[0].args;
        return {
            vote: vote.candidate
        }
    }

    async createProposal(title, description, candidates) {
        const instance = await this._getContractInstance();
        const createProposalReceipt = await instance.createProposal(
            title,
            description,
            candidates,
            { from: this.account }
        );
        console.log(createProposalReceipt);
        const newProposal = createProposalReceipt.logs[0].args;
        console.log("Proposal created");
        console.log(newProposal.proposalId.toString());
        console.log(newProposal.title);
        return {
            id: newProposal.proposalId.toString(),
            title: newProposal.title,
            description: newProposal.description
        }
    }
}

module.exports = new VotingPlatformService();

/* 
Test smart contract call
const smartContractCall = async () => {
    const votingService = new VotingPlatformService();
    await votingService.getProposal(2);
    await votingService.createProposal(
        "New Proposal",
        "New Proposal Description",
        ["A", "B", "C"]
    );

    return 0;
}
*/

// smartContractCall();
// return 0;