/**
 * @file marketplace.sol
 * @author Nachiket Tapas <ntapas@unime.it>
 * @date created 01 Jun 2020
 * @date last modified 09 Jul 2020
 * @SPDX-License-Identifier: UNLICENSED
 */

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract designVoting {
    // The status tells the state of the voting on the design
    // 0: voting
    // 1: finished
    struct designState
    {
        bytes32 filehash;
        address vendor;
        uint256 timestamp;
        uint256 balance;
        address manager;
        uint256 status;
        uint256 taup;
        uint256 taur;
        uint256 deltaExp;
        uint256 deltaReveal;
    }

    //The vote is considered as follows
    // 0 : no vote. maybe due to time expired
    // -1 : invalid design
    // 1 : valid design
    struct playerState
    {
        int256 reputation;
        uint256 weight;
        mapping ( uint256 => bytes32 ) commitments;
        mapping ( uint256 => int ) votes;
        mapping ( uint256 => bool ) received;
        uint256[] designes;
        uint256 balance;
    }
   
    uint private results;
    
    //Mapping of design identified by design index and collection of players indexes registered to vote 
    mapping (uint256 => mapping (address => uint)) private checkPlayers;
    mapping (uint256 => address[]) private regPlayers;
    
    //Design details indexed by design index
    mapping (uint256 => designState) private designes;
    uint256 private numDesignes = 0;
    
    //Player details indexed by player index
    mapping (address => playerState) private players;
    mapping (address => uint) private isPlayer;
    address[] private playerAddresses;
   
    //Notifications for successful completion of events
    event newDesignAvailable(bytes32 fileHash, uint256 designNo, address creator);
    event resultCalculated(bytes32 fileHash, uint256 designNo, address creator);
    event newPlayerAddition(address player, bool status);
    event newPlayerRegistration(address player, uint256 design, bool status);
    event playerDesignReceived(uint256 design, address player);
    event playerCommitted(uint256 design, address player);
    event playerRevealed(uint256 design, address player);
    event votingResult(int result);
    
    event tempOutput(address _output);//, uint256 timestamp, uint256 expiry, uint256 balance);

    //The commitment is send via the value field in the remix. If the sent value matches the commitment parameter,
    //the contract announces the availability of new design for verification.
    function announce(bytes32 _fileHash, uint256 _timestamp, uint256 _commitment, address _manager, uint256 _taur, uint256 _taup, uint256 _deltaExp, uint256 _deltaReveal)
        public payable
    {
        //Check for positive commitment
        require(_commitment > 0, "The commitment should be more than 0.");
       
        //Check if the commitment parameter matches the commiment sent to the contract.
        require(msg.value == _commitment, "The announcement didn't receive the commitment.");
       
        //Design index
        uint256 j = numDesignes;
        
        //Design file hash from IPFS
        designes[j].filehash = _fileHash;
        
        //Design creator
        designes[j].vendor = msg.sender;
       
        //Creation timestamp received from the js script
        designes[j].timestamp = _timestamp;
       
        //Commitment
        designes[j].balance = _commitment;
       
        //Set a manager
        designes[j].manager = _manager;
        
        //Setting the value for reward
        if (_taur == 0) {
            designes[j].taur = 1000000000000000000;
        } else {
            designes[j].taur = _taur;    
        }
        
        //Setting the value for penalty
        if (_taup == 0) {
            designes[j].taup = 1000000000000000000;
        } else {
            designes[j].taup = _taup;    
        }
        
        //Setting the value for expiry
        if (_deltaExp == 0) {
            designes[j].deltaExp = 600;
        } else {
            designes[j].deltaExp = _deltaExp;    
        }
        
        //Setting the value for reveal
        if (_deltaReveal == 0) {
            designes[j].deltaReveal = 600;
        } else {
            designes[j].deltaReveal = _deltaReveal;    
        }
        
        //Set the status to be created
        designes[j].status = 0;
        
        //Incrementing the design index
        numDesignes = numDesignes + 1;
       
        //Emitting notification for new design creation.
        //Verifiers receiving the notification can participate in the process
        //Filehash to ensure file integrity
        //Index to use for search
        //Vendor address for source verification
        emit newDesignAvailable(_fileHash, j, msg.sender);
    }
    
    //Reader function to get number of designes
    function getNumDesignes() public view returns (uint256) {
        return numDesignes;
    }
    
    //Reader function to get designe details at _index
    function getDesigne(uint256 _index) public view returns (designState memory) {
        return designes[_index];
    }
   
    //Function to add players to the system. This does not mean the player is registering to vote.
    //function addPlayer(bytes32 _hashMsg, bytes memory _signature) public {
    function addPlayer(bytes32 _hashMsg, bytes memory _signature) public {
        //Check for identity of the user registering
        (uint8 _v, bytes32 _r, bytes32 _s) = splitSignature(_signature);
        bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _hashMsg));
        require(ecrecover(prefixedHash, _v, _r, _s) == msg.sender, "The registration identity verification failed.");
        
        //Check for existing player
        require( isPlayer [ msg.sender ] == 0, "Player already added to the system.");
        
        //Push Player address
        playerAddresses.push ( msg.sender );
        
        //Set player to 1 to denote that player is added to the system
        isPlayer [ msg.sender ] = 1;
        
        //Initialize player requesting registration
        players[msg.sender].reputation = 1;
        players[msg.sender].weight = 1;
        
        //Event for successful registration
        emit newPlayerAddition(msg.sender, true);
        
    }
    
    //Reader function to get number of players
    function getNumPlayers() public view returns (uint256) {
        return playerAddresses.length;
    }
    
    //Reader function to get player's addresses
    function getPlayerAddresses() public view returns (address[] memory) {
        return playerAddresses;
    }
    
    //Reader function to get player details for _playerAddress. 
    //This does not include the vote, commitment, and design file received status
    function getPlayerDetails(address _playerAddress) public view returns ( int256, uint256, uint256 ) {
        return ( players[_playerAddress].reputation, players[_playerAddress].weight, players[_playerAddress].balance );
    }
    
    //Get commitment corresponding to design number and player
    function getPlayerCommitment(address _playerAddress, uint256 _designNo) public view returns ( bytes32 ) {
        return ( players[_playerAddress].commitments[_designNo] );
    }
    
    //Get vote corresponding to design number and player
    function getPlayerVote(address _playerAddress, uint256 _designNo) public view returns ( int ) {
        return ( players[_playerAddress].votes[_designNo] );
    }
    
    //Check file received status corresponding to design number and player
    function isFileReceived(address _playerAddress, uint256 _designNo) public view returns ( bool ) {
        return ( players[_playerAddress].received[_designNo] );
    }
    
    //This function can be considered as expression of interest to take part in the voting and not to be confused with
    //player registration to the system.
    function register(bytes32 _hashMsg, bytes memory _signature, uint256 _designNo, uint256 _commitment)
        public payable
    {
        //Check of player is added to the system
        require(isPlayer [ msg.sender ] == 1, "Player not added to the system.");
        
        //Check for identity of the user registering
        (uint8 _v, bytes32 _r, bytes32 _s) = splitSignature(_signature);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, _hashMsg));
        require(ecrecover(prefixedHash, _v, _r, _s) == msg.sender, "The registration identity verification failed.");
        
        //Check for positive commitment
        require(_commitment > 0, "The commitment should be more than 0.");
       
        //Check if the commitment parameter matches the commiment sent to the contract.
        require(msg.value == _commitment, "The registration didn't receive the commitment.");
       
        //Check if the commitment is less than penalty
        require(_commitment >= designes[_designNo].taup, "The commitment should be greater than the penalty.");
       
        //Check if the required number of verifiers are already meet
        require(regPlayers[_designNo].length < designes[_designNo].balance / designes[_designNo].taur, "No more registrations are accepted.");

        //Check if already registered
        require(checkPlayers[_designNo][msg.sender] == 0, "Player already registered.");
        
        //Incrementing the player index and registration
        checkPlayers[_designNo][msg.sender] = 1;
        regPlayers[_designNo].push(msg.sender);
        players[msg.sender].balance += msg.value;
        
        //Event for successful registration for a design
        emit newPlayerRegistration(msg.sender, _designNo, true);
    }
   
    //Reader function to get number of registered players
    function getNumRegPlayers(uint256 _designNo) public view returns (uint256) {
        return regPlayers[_designNo].length;
    }
    
    //Reader function to get registered player's addresses
    function getRegPlayerAddresses(uint256 _designNo) public view returns (address[] memory) {
        return regPlayers[_designNo];
    }
    
    function setReceived(uint256 _designNo, address _playerAddress)
        public payable
    {
        //Check if the sender is the manager responsible for secure exchange.
        require(msg.sender == designes[_designNo].manager, "Only manager can call this function.");
        
        //The manager sets the design received to be true
        players[_playerAddress].received[_designNo] = true;
        players[_playerAddress].designes.push(_designNo);
        
        //An event is emitted after successful
        emit playerDesignReceived(_designNo, _playerAddress);
    }
   
    function commit(uint256 _designNo, bytes32 _cryptoCommitment, uint256 _timestamp)
        public
    {
        //Check if the player received the design and ready to vote.
        require(players[msg.sender].received[_designNo] == true, "The player can commit only when manager confirms design exchange.");
        
        //Check for expiry
        require(_timestamp <= designes[_designNo].timestamp + designes[_designNo].deltaExp, "The player cannot vote after expiry.");
        
        //Store the commitment by the player
        players[msg.sender].commitments[_designNo] = _cryptoCommitment;
        
        //An event emitted after successful commitment of vote
        emit playerCommitted(_designNo, msg.sender);
    }
   
    function reveal(uint256 _designNo, int _vote, bytes32 _nonce, uint256 _timestamp)
        public
    {
        //Check for expiry. Beyond the expiry, the player revealing will have 
        //a picture of the voting trend and thus, can change for profit.
        require(_timestamp <= designes[_designNo].timestamp + designes[_designNo].deltaExp + designes[_designNo].deltaReveal, "The vote cannot be revealed after the expiry.");
        
        //Check the commitment
        require(players[msg.sender].commitments[_designNo] == keccak256(abi.encodePacked(_vote, _nonce)), "The player did not commit to this.");
        
        //Store the vote by the player
        players[msg.sender].votes[_designNo] = _vote;
        
        //An event emitted after successful reveal of vote
        emit playerRevealed(_designNo, msg.sender);
    }

    function calculateResult(uint256 _designNo, uint256 _timestamp)
        public
    {
        //Check the status of the voting. If already completed, then this function is not run.
        require(designes[_designNo].status == 0, "The voting is already finished and results are declared.");
        
        //Check for expiry. The result cannot be calculated before the expiry.
        require(_timestamp > designes[_designNo].timestamp + designes[_designNo].deltaExp + designes[_designNo].deltaReveal, "The result cannot be revealed before the expiry.");
        
        //Since solidity do not support floating point arithematic, we will store the value as quotient and remainder.
        //Here we are calculating the numerator and denominator.
        int256 playerNum = 0;
        int256 playerDen = 0;
        for ( uint256 i = 0; i < regPlayers[_designNo].length; i++ ) {
            playerNum  += ( players[regPlayers[_designNo][i]].votes[_designNo] * int( players[regPlayers[_designNo][i]].weight ) * players[regPlayers[_designNo][i]].reputation );    
            playerDen  += int ( players[regPlayers[_designNo][i]].weight ) * players[regPlayers[_designNo][i]].reputation;
        }
        
        //Here we are just calculating the remainder as the value varies from 0 to 1.
        //The borderline case of same positive and negative votes is considered as correct (To be decided later)
        int256 finalScoreQuo = ( playerNum + playerDen ) / ( 2 * playerDen );
        int256 finalScoreRem = ( playerNum + playerDen ) % ( 2 * playerDen );
        int result = 0;
        if ( finalScoreQuo == 1 || finalScoreRem >= playerDen ) {
            result = 1;
        } else if ( finalScoreRem < playerDen ) {
            result = -1;
        }
        
        for ( uint256 i = 0; i < regPlayers[_designNo].length; i++ ) {
            if ( players[regPlayers[_designNo][i]].votes[_designNo] > 0 ) {
                //Set new reputation
                players[regPlayers[_designNo][i]].reputation += players[regPlayers[_designNo][i]].votes[_designNo] * result;    
        
                //Set new weight (we only use the player weight. The total weight, which is used as normalization factor is eliminated in the final calculation.)
                players[regPlayers[_designNo][i]].weight += uint ( players[regPlayers[_designNo][i]].votes[_designNo] * result );
            } else {
                //Set new reputation
                players[regPlayers[_designNo][i]].reputation += -1 * result;    
        
                //Set new weight (we only use the player weight. The total weight, which is used as normalization factor is eliminated in the final calculation.)
                players[regPlayers[_designNo][i]].weight += uint ( -1 * result );
            }
        }
        
        //Retuen the player commitments
        for ( uint256 i = 0; i < regPlayers[_designNo].length; i++ ) {
            if ( players[regPlayers[_designNo][i]].votes[_designNo] * result == 1) {
                players[regPlayers[_designNo][i]].balance += designes[_designNo].taur;
                designes[_designNo].balance -= designes[_designNo].taur;
            } else {
                players[regPlayers[_designNo][i]].balance -= designes[_designNo].taup;
                designes[_designNo].balance += designes[_designNo].taup;
            }
        }
        
        //Set the status to finished
        designes[_designNo].status = 1;
        
        //Emit the notification for the result
        emit votingResult(result);
    }
   
    //This is a utility function to extract ECDSA parameters from the signature.
    function splitSignature(bytes memory sig)
    private
    pure
    returns (uint8, bytes32, bytes32)
    {
        require(sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }
        
        if (v < 27) {
            v += 27;
        }

        return (v, r, s);
    }
    
    // //In-case the design verification expires, the commitment is returned to the vendor.
    // //Currently only the vendor can initiate the withdrawl.
    // function withdraw(uint256 _amount, uint256 _designNo) public {
    //     //Check if the method initiator is the one who published the design
    //     require(msg.sender == designes[_designNo].vendor, "Only the publisher can initiate the withdrawl.");
       
    //     //Insert a check condition regarding the time before which the vendor cannot withdraw the commitment
    //     require(designes[_designNo].expiry <= now, "The balance can be withdrawn only after expiry.");
       
    //     //Check if the amount requested for withdrawl is less than balance
    //     require(_amount <= designes[_designNo].balance, "The withdrawl amount is more than the balance.");
       
    //     //Check for the withdrawl amount
    //     require(_amount > 0, "The withdrawl amount should be greater than 0.");
       
    //     //Reducing the balance and sending the withdrawl amount to the vendor
    //     designes[_designNo].balance -= _amount;
    //     msg.sender.transfer(_amount);
    // }
}