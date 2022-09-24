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

    async getRoom(roomId) {
        const instance = await this._getContractInstance();
        const receipt = await instance.getRoom(roomId, { from: this.account });
        console.log(receipt);
        const room = receipt.logs[0].args;
        return {
            id: room.roomId.toString(),
            title: roomId.title,
            description: roomId.description
        }
    }

    async getVoteById(roomId, voteId) {
        const instance = await this._getContractInstance();
        const receipt = await instance.getVoteById(roomId, voteId, { from: this.account });
        const vote = receipt.logs[0].args;
        return {
            vote: vote.candidate
        }
    }

    async createRoom(title, description) {
        const instance = await this._getContractInstance();
        const createRoomReceipt = await instance.createRoom(
            title,
            description,
            { from: this.account }
        );
        console.log(createRoomReceipt);
        const newRoom = createRoomReceipt.logs[0].args;
        console.log("Room created");
        console.log(newRoom.roomId.toString());
        console.log(newRoom.title);
        return {
            id: newRoom.roomId.toString(),
            title: newRoom.title,
            description: newRoom.description
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