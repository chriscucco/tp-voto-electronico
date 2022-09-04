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
        console.log("Initializing contract instance")
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
        const getProposalReceipt = await instance.getProposal(proposalId, { from: this.account });
        const proposal = getProposalReceipt.logs[0].args;
        console.log("Proposal exists");
        console.log(proposal.proposalId.toString());
        console.log(proposal.title);
    }

    async createProposal(title, description, candidates) {
        const instance = await this._getContractInstance();
        const createProposalReceipt = await instance.createProposal(
            "Third Proposal title",
            "Third Proposal description" ,
            ["Candidate A", "Candidate B"],
            { from: this.account }
        );
        const newProposal = createProposalReceipt.logs[0].args;
        console.log("Proposal created");
        console.log(newProposal.proposalId.toString());
        console.log(newProposal.title);
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