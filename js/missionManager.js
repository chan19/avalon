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
		addMission: function(aRound){
			
		},
		setMissionState: function(){
			
		},
		updateMissionTableUi: function(aPlayers, aMission){
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
								"'>MISSION "+(i+1) + " (" + aMission[i].limit +") "+ "</div><div class='missionContainer columnContainer'>";
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
