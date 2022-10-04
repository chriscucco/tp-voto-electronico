// SPDX-License-Identifier: UNLICENCED
pragma solidity >= 0.4.22 < 0.9.0;

contract VotingPlatform {

    struct Room {
        string title;
        string description;
        string[] participants;
        uint[] lists;
        uint[] votes;
        mapping (uint32 => uint) votesById;
        // TODO - Add date
    }

    address owner;
    uint32 roomIndex;
    mapping (uint32 => Room) rooms;

    // Events
    event RetrieveRoom(string title, string description, uint32 roomId);
    event RoomLists(uint[] lists);
    event RetrieveVote(uint vote);
    event RetrieveVotes(uint[] votes);

    constructor() {
        // Set the owner of the contract to the address that deployed it
        owner = msg.sender;
    }

    // Function modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Function only callable by contract owner");
        _;
    }

    modifier onlyOnExsistantRooms(uint32 id) {
        require(id < roomIndex, "Requested room does not exist");
        _;
    }

    modifier voteIsValid(uint32 roomId, string calldata userId, uint list) {
        require(!didUserAlreadyVote(roomId, userId), "User already voted");
        require(listExistsInRoom(roomId, list), "List does not exist");
        _;
    }

    function didUserAlreadyVote(uint32 roomId, string calldata userId) private view returns(bool) {
        bool voted = false;
        Room storage room = rooms[roomId];
        for (uint32 i = 0; i < room.participants.length; i++) {
            string memory currentParticipant = room.participants[i];
            if (keccak256(bytes(currentParticipant)) == keccak256(bytes(userId))) {
                voted = true;
            }
        }

        return voted;
    }

    function listExistsInRoom(uint32 roomId, uint list) private view returns(bool) {
        bool exists = false;
        Room storage room = rooms[roomId];
        for (uint32 i = 0; i < room.lists.length; i++) {
            uint currentList = room.lists[i];
            if (currentList == list) {
                exists = true;
            }
        }

        return exists;
    }
    

    // All functions are only callable by the owner of the contract to prevent outside users interaction
    function createRoom(string calldata title, string calldata description) public onlyOwner {
        Room storage newRoom = rooms[roomIndex++];
        newRoom.title = title;
        newRoom.description = description;
        emit RetrieveRoom(title, description, roomIndex - 1);
    }

    function setRoomLists(uint32 roomId, uint[] calldata lists) public onlyOnExsistantRooms(roomId) onlyOwner {
        Room storage room = rooms[roomId];
        room.lists = lists;
        emit RoomLists(room.lists);
    }

    function addListToRoom(uint32 roomId, uint list) public onlyOnExsistantRooms(roomId) onlyOwner {
        Room storage room = rooms[roomId];
        room.lists.push(list);
        emit RoomLists(room.lists);
    }

    // Retrieve proposal by id
    function getRoom(uint32 id) public onlyOnExsistantRooms(id) onlyOwner {
        emit RetrieveRoom(rooms[id].title, rooms[id].description, id);
    }

    // Voting function. TODO - Check for duplicate votes UID? Refactor vote to (Candidate, UID) to avoid mapping?
    function vote(uint32 roomId, uint32 voteUid, uint list, string calldata userId) public 
        onlyOwner onlyOnExsistantRooms(roomId) voteIsValid(roomId, userId, list)
    {
        Room storage room = rooms[roomId];
        room.participants.push(userId);
        room.votes.push(list);
        room.votesById[voteUid] = list;
    }

    // Retrieve vote by uid
    function getVoteById(uint32 roomId, uint32 voteId) public onlyOwner onlyOnExsistantRooms(roomId) {
        emit RetrieveVote(rooms[roomId].votesById[voteId]);
    }

    // Retrieve proposal votes
    function getProposalVotes(uint32 roomId) public onlyOwner onlyOnExsistantRooms(roomId) {
        emit RetrieveVotes(rooms[roomId].votes);
    }
}
