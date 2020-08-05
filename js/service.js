SERVICE = (function() {
var ROUND_NUMBER = 0;
var MISSION_NUMBER = 0;
var CUR_LEADER;
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

	var limit = missionData[MISSION_NUMBER].limit;
	while(team.length < limit){
		k = Math.floor(Math.random() * 100) % (playerCount);
		if(team.indexOf(k) == -1){
			team.push(k);
		}
	}
	return {
		missionNumber: MISSION_NUMBER,
		round: ROUND_NUMBER,
		team: team,
		leader: CUR_LEADER,
		approved: [],
		reject: [],
		isPending: true,
		isApproved: false,
	};
}
function getClone(oData){
	var t = oData;
	if(oData instanceof Array){
		t = [];
		oData.forEach(function(o){
			t.push(getClone(o));
		});
	} else if(oData instanceof Object){
		t = {};
		for(var each in oData){
			t[each] = getClone(oData[each]);
		}
	}
	return t;
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
				missions: [3,4,4,5,4]
	};
	CUR_LEADER = gameData.initLeader = Math.floor(Math.random() * 100) % gameData.players.length;
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
			oData = getClone(oData);
			var m = oData.mission;
			var r = oData.round;
			oData.isApproved = false;
			oData.isPending = true;
			missionData[m] = missionData[m] || {
				missionNumber: m,
				state: 0, //-1 pending, 0 fail 1 success
				rounds: []
			};
			missionData[m].rounds[r] = oData;
			CUR_LEADER = (CUR_LEADER+1) % ( gameData.players.length);
			ROUND_NUMBER = (ROUND_NUMBER +1 ) % 5;
			if(ROUND_NUMBER == 0){
				MISSION_NUMBER ++;
			}
			fn(missionData);
			
		},
		saveMyTeamVote: function(oData, fn){
			oData = getClone(oData);
			var m = oData.mission;
			var r = oData.round;
			var oDummy = getDummyVotes( oData.vote);
			missionData[m].rounds[r].approved = oDummy.approve;
			missionData[m].rounds[r].reject = oDummy.reject;
			missionData[m].rounds[r].isApproved = oDummy.approve.length > oDummy.reject.length;
			missionData[m].rounds[r].isPending = false;
			setTimeout(function(){
				fn(missionData);
			}, 3000);
		},
		getMissionVotes: function(fn){
			var oMission = missionData[MISSION_NUMBER];
			var oRound = missionData[ROUND_NUMBER];
			oMission.state = Math.floor(Math.random() * 100) % 2; // randomly succeed or fail;
			CUR_LEADER = (CUR_LEADER+1) % ( gameData.players.length);
			ROUND_NUMBER = 0;
			MISSION_NUMBER ++;
			setTimeout(function(){
				fn(missionData);
			}, 4000);
		},
		saveMyMissionVote: function(bVote, fn){
			var oMission = missionData[MISSION_NUMBER];
			var oRound = missionData[ROUND_NUMBER];
			oMission.state = (Math.floor(Math.random() * 100) % 2) && bVote; // randomly succeed or fail;
			CUR_LEADER = (CUR_LEADER+1) % ( gameData.players.length);
			ROUND_NUMBER = 0;
			MISSION_NUMBER ++;
			setTimeout(function(){
				fn(missionData);
			}, 4000);
		},
		fetchTeam: function(fn){
			var dummyData = getDummyTeam();
			var m = dummyData.missionNumber;
			var r = dummyData.round;
			missionData[m].rounds[r] = dummyData;
			
			CUR_LEADER = (CUR_LEADER+1) % ( gameData.players.length);
			ROUND_NUMBER = (ROUND_NUMBER +1 ) % 5;
			if(ROUND_NUMBER == 0){
				MISSION_NUMBER ++;
			}
			setTimeout(function(){
				fn(missionData);
			}, 4000);
		}
    }
}
)();
