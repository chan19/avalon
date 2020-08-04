SERVICE = (function() {
var roundNumber = 0;
var missionNumber = 0;
var curLeader;
function getDummyVotes(bVote){
	var approve = [];
	var reject = [];
	for(var i = 0; i < gameData.players.length; i++){
		if(gameData.players[i].id == gameData.profile_id){
			if(bVote){
				approve.push(gameData.profile_id);
			} else {
				reject.push(gameData.profile_id);
			}
		} else {
			if(Math.floor(Math.random() * 100) %2){
				approve.push(gameData.players[i].id);
			}  else {
				reject.push(gameData.players[i].id);
			}
		}
	}
	return {
		approve: approve,
		reject: reject
	}
}
function getDummyTeam(){
	var oData;
	var i = 0, j = 0, k = 0, p = 0, aRound;
	var team = [];
	
	var playerCount = gameData.players.length;

	var limit = missionData[missionNumber].limit;
	while(team.length < limit){
		k = Math.floor(Math.random() * 100) % (playerCount);
		if(team.indexOf(k) == -1){
			team.push(k);
		}
	}
	return {
		missionNumber: missionNumber,
		round: roundNumber,
		team: team,
		leader: curLeader,
		approved: [],
		reject: [],
		isApproved: false
	};
}
 var gameData = {
                role: "MERLIN",
                roles: ["MERLIN", "PERCEIVAL", "MORGANA", "ASSASSIN", "MORDRED", "TRISTIN", "ISOLDE", "RESISTANCE"],
				//["RESISTANCE", "MERLIN", "SPY", "PERCEIVAL", "MORGANA", "TRISTON", "ISOLDE"];
				profile_id: 1,
                players: [{
                    id: 0,
                    name: "SHIVA",
                    role: 0
                },{
                    id: 1,
                    name: "CHAN",
                    role: 3
                }, {
                    id: 2,
                    name: "SAIRAM",
                    role: 0
                }, {
                    id: 3,
                    name: "DEEPAK",
                    role: 0
                }, {
                    id: 4,
                    name: "NAMZY",
                    role: 0
                }, {
                    id: 5,
                    name: "KANTH",
                    role: 0
                }, {
                    id: 6,
                    name: "MADDY",
                    role: 1
                }, {
                    id: 7,
                    name: "SAILI",
                    role: 0
                }, {
                    id: 8,
                    name: "SNEHA",
                    role: 1
                }],
				initLeader: 0,
				initDecider: 4,
				missions: [3,3,4,4,5]
	};
	curLeader = gameData.initLeader = Math.floor(Math.random() * 100) % gameData.players.length;
	gameData.initDecider = (gameData.initLeader + 4) % gameData.players.length;
	console.log(gameData.initLeader, gameData.initDecider);
	var missionData2 =[{
						missionNumber: 0,
						state: 1, //-1 pending, 0 fail 1 success,
						limit: 3,
						rounds: [{
							missionNumber: 0,
							round: 0,
							team: [1,2,3],
							leader: 2,
							approved: [0,4,5,2,1],
							reject: [8,3,7,6],
							isApproved: true
						},{
							missionNumber: 0,
							round: 1,
							team: [1,2,3],
							leader: 2,
							approved: [4,5,2,1],
							reject: [0,8,3,7,6],
							isApproved: true
						},{
							missionNumber: 0,
							round: 2,
							team: [1,2,3],
							leader: 2,
							approved: [4,5,2,1,8],
							reject: [0,3,7,6],
							isApproved: true
						}]
					},{
						missionNumber: 1,
						state: 0, //-1 pending, 0 fail 1 success
						limit: 4,
						rounds: [{
							missionNumber: 1,
							round: 0,
							team: [7,2,3],
							leader: 5,
							approved: [4,5,2,1,0,8],
							reject: [3,7,6],
							isApproved: true
						},{
							missionNumber: 1,
							round: 1,
							team: [4,6,3],
							leader: 4,
							approved: [4,5,2,1,0],
							reject: [3,7,6,8],
							isApproved: true
						},{
							missionNumber: 1,
							round: 2,
							team: [1,2,3],
							leader: 6,
							approved: [4,5,2,1,8],
							reject: [3,7,6,0],
							isApproved: true
						}]
					},{
						missionNumber: 2,
						state: -1,
						limit: 4,
						rounds: []
					},{
						missionNumber: 3,
						state: -1,
						limit: 5,
						rounds: []
					},{
						missionNumber: 4,
						state: -1,
						limit: 4,
						rounds: []
	}];
	var missionData =[{
						missionNumber: 0,
						state: -1, //-1 pending, 0 fail 1 success,
						limit: 3,
						rounds: []
					},{
						missionNumber: 1,
						state: -1, //-1 pending, 0 fail 1 success
						limit: 4,
						rounds: []
					},{
						missionNumber: 2,
						state: -1,
						limit: 4,
						rounds: []
					},{
						missionNumber: 3,
						state: -1,
						limit: 5,
						rounds: []
					},{
						missionNumber: 4,
						state: -1,
						limit: 4,
						rounds: []
	}];
    return {
        getInitData: function(fn) {
            fn(gameData);
        },
		getMissionData: function(fn){ 
				fn(missionData);
		},
		saveTeam:function(oData, fn){
			var m = oData.mission;
			var r = oData.round;
			missionData[m] = missionData[m] || {
				missionNumber: m,
				state: 0, //-1 pending, 0 fail 1 success
				rounds: []
			};
			missionData[m].rounds[r] = oData;
			curLeader = (curLeader+1) % ( gameData.players.length);
			roundNumber = (roundNumber +1 ) % 5;
			if(roundNumber == 0){
				missionNumber ++;
			}
			fn(missionData);
			
		},
		saveMyTeamVote: function(oData, fn){
			var m = oData.mission;
			var r = oData.round;
			var oDummy = getDummyVotes( oData.vote);
			missionData[m].rounds[r].approved = oDummy.approve;
			missionData[m].rounds[r].reject = oDummy.reject;
			missionData[m].rounds[r].isApproved = true;
			fn(missionData);
		},
		fetchTeam: function(fn){
			var dummyData = getDummyTeam();
			var m = dummyData.missionNumber;
			var r = dummyData.round;
			missionData[m].rounds[r] = dummyData;
			
			curLeader = (curLeader+1) % ( gameData.players.length);
			roundNumber = (roundNumber +1 ) % 5;
			if(roundNumber == 0){
				missionNumber ++;
			}
			fn(missionData);
		}
    }
}
)();
