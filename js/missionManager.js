MissionManager = (function(){
	return {
		init: function(oConfig){
		
		},
		updateTable: function(){
			
		},
		addTeam: function(){
			
		},
		setMissionResult: function(bSuccess){
			this._missions[this._currentMission] = bSuccess;
			this._currentMission++;
		},
		setIsTeamSelected: function(){
			
		},
		getDummyMissionData: function(){ 
				return [{
					missionNumber: 0,
					state: 1, //-1 pending, 0 fail 1 success
					rounds: [{
						missionNumber: 0,
						round: 0,
						team: [1,2,3],
						leader: 2,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					},{
						missionNumber: 0,
						round: 1,
						team: [1,2,3],
						leader: 2,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					},{
						missionNumber: 0,
						round: 2,
						team: [1,2,3],
						leader: 2,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					}]
				},{
					missionNumber: 1,
					state: 0, //-1 pending, 0 fail 1 success
					rounds: [{
						missionNumber: 1,
						round: 0,
						team: [7,2,3],
						leader: 5,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					},{
						missionNumber: 1,
						round: 1,
						team: [4,6,3],
						leader: 4,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					},{
						missionNumber: 1,
						round: 2,
						team: [1,2,3],
						leader: 6,
						approved: [4,5,2,1],
						reject: [3,7,6],
						isApproved: true
					}]
				},{
					missionNumber: 2,
					state: -1,
					rounds: [{
						missionNumber: 2,
						round: 1,
						team: [1,2,3],
						leader: 6,
						approved: [],
						reject: [],
						isApproved: false
					}]
				},{
					missionNumber: 3,
					state: -1,
					rounds: []
				},{
					missionNumber: 4,
					state: -1,
					rounds: []
				}];
		},
		updateMisstionTableUi: function(aPlayers){
			var aMission = this.getDummyMissionData();
			var html = "";
			var oRound;
			var missionColHtml = "", tmpHtml = "", tableHtml = "", tmpClass = "", missionStatusClass = "";
			
			for(var i = 0; i< aPlayers.length;i++){
				tableHtml += "<div class='playerNameCell cell'>" + aPlayers[i].name + "</div>";
			}
			tableHtml = "<div class='col0 playerNamesColumn column'><div class='headerCell emptyCell cell'></div><div class='columnContainer'>"+tableHtml+"</div></div>";
			
			for(var i = 0;i < aMission.length; i++){
				missionColHtml = "";
				tmpHtml = "";
				missionStatusClass = (aMission[i].state == -1) ? "" : (aMission[i].state == 0) ? " missionFail" : " missionSuccess";
				missionColHtml += "<div class='col" + (i+1) + " column'><div class='headerCell cell " + missionStatusClass + 
								"'>MISSION "+(i+1) + "</div><div class='missionContainer columnContainer'>";
				for(var j =0; j< aMission[i].rounds.length; j++){
					tmpHtml = "";
					missionColHtml += "<div class='roundcontainer'>";
					for(var k =0; k< aPlayers.length; k++){
						oRound = aMission[i].rounds[j];
						tmpClass = (oRound.leader == k) ? "leaderCell" : "";
						tmpClass += (oRound.approved.indexOf(k) > -1 ) ? " approvedCell" : ( (oRound.reject.indexOf(k) > -1 )? " rejectedCell" : "");
						tmpHtml += "<div class='cell votecell " + tmpClass + "'>" + ((oRound.team.indexOf(k) > -1) ? "*" : "") + "</div>";
					}
					missionColHtml += tmpHtml + "</div>";
				}

				tableHtml += (missionColHtml + "</div></div>");
			}
			jQuery("#missionTable").html(tableHtml);
		}
		
	}
})();
