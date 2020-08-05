MASTER = (function() {
    return {
        init: function() {
            this.service = SERVICE;
			this._attachEvents();
			this._attachListeners();
            this.start();
        },
        start: function() {
            var that = this;
            this.fetchInitData(function() {
                that.prepareUI();
				that.fetchInitMissionData();
            });
        },
        fetchInitData: function(fn) {
            var that = this;
            this.service.getInitData(function(data) {
                that.setInitialData(data);
				fn();
            });
        },
        setInitialData: function(data) {
            this.setRole(data.role);
            this.setRoles(data.roles);
            this.setPlayers(data.players);
			this.setLeader(data.initLeader);
			this.setDecider(data.initDecider);
			this._teamLimits = data.missions;
			this.setTeamLimit(data.missions[0]);
			this.setMissionNumber(0);
            this.setRound(0);
			this.setMyId(data.profile_id);
        },
		fetchInitMissionData: function(){
			var players = this.getPlayers();
			var that = this;
			this.service.getMissionData(function(data){
				MissionManager.updateMissionTableUi(players, data);
				that.beginRound();
			});
		},
        prepareUI: function() {
            PlayerManager.createPlayers(this.getPlayers());
			PlayerManager.displayMyRole(this.getMyId());
			PlayerManager.markDecider(this.getDecider());
			PlayerManager.markLeader(this.getLeader());
        },
        setRole: function(s) {
            this._role = s;
        },
        getRole: function() {
            return this._role;
        },
        setRoles: function(a) {
            this._roles = a;
        },
        getRoles: function() {
            return this._roles;
        },
        setPlayers: function(a) {
            this._players = a;
        },
        getPlayers: function() {
            return this._players;
        },
		getPlayerNameById: function(nId){
			var a = this.getPlayers();
			var s = "";
			for(var i = 0; i < a.length; i++){
				if(a[i].id == nId){
					s = a[i].name;
				}
			}
			return s;
		},
        setRound: function(n) {
            this._round = n;
        },
        getRound: function() {
            return this._round;
        },
		moveToNextMission: function(){
			this.setMissionNumber(this.getMissionNumber() + 1);
			this.setTeamLimit(this._teamLimits[this.getMissionNumber()]);
			this.moveToNextRound(true);
		},
		moveToNextRound: function(bNewMission){
			if(bNewMission){
				this.setRound(0);
				this.moveToNextLeader();
				this.moveToNextDecider();
			} else {
				this.setRound(this.getRound() + 1);
				this.moveToNextLeader();
			}
		},
		moveToNextLeader: function(){
			var a = this.getPlayers();
			var c = this.getLeader();
			for(var k = 0; k < a.length; k++){
				if(a[k].id == c){
					k = (++k) %  a.length;
					this.setLeader(a[k].id);
					break;
				}
			}
			PlayerManager.markLeader(this.getLeader());			
		},
		moveToNextDecider: function(){
			var a = this.getPlayers();
			var c = this.getLeader();
			var i = -1;
			for(var k = 0; k < a.length; k++){
				if(a[k].id == c){
					i = ( k + 4) %  a.length;
					this.setDecider(a[i].id);
					break;
				}
			}
			PlayerManager.markDecider(this.getDecider());
		},
		setMissionNumber: function(n){
			this._missionNumber = n;
		},
		getMissionNumber: function(){
			return this._missionNumber;
		},
        setLeader: function(i) {
            this._leader = i;
        },
        getLeader: function() {
            return this._leader;
        },
		setTeamLimit: function(n){
			this._teamLimit = n;
			PlayerManager.setTeamLimit(n);
		},
		getTeamLimits: function(){

		},
		getTeamLimit: function(){
			return this._teamLimit;
		},
		setMyId: function(i) {
            this._myId = i;
        },
        getMyId: function() {
            return this._myId;
        },
        setDecider: function(i) {
            this._decider = i;
        },
        getDecider: function() {
            return this._decider;
        },
		beginRound: function(){
			PlayerManager.resetTeam();
			if(this.getMyId() == this.getLeader()){
				this.showPickControl();
				PlayerManager.setArenaActive(true);
			} else {
				PlayerManager.setArenaActive(false);
				this.fetchTeam();
			}
		},
		fetchTeam: function(){
			var that = this;
			var players = this.getPlayers();
			this.showInfo("Waiting for the team proposal by ",this.getPlayerNameById(this.getLeader()));
			this.service.fetchTeam(function(data){
				MissionManager.updateMissionTableUi(players, data);
				PlayerManager.setTeam(data[that.getMissionNumber()].rounds[that.getRound()].team);
				that.showTeamVoteControl();				
			});		
		},
		fetchMissionVotes: function(){
			var that = this;
			var players = this.getPlayers();
			this.showInfo("Waiting for mission votes by ", PlayerManager.getTeamData().name.join(", "));
			this.service.getMissionVotes(function(data){
				MissionManager.updateMissionTableUi(players, data);
				if(data[that.getMissionNumber()].state == 0){
					that.showFailure("Mission Failed");
				} else {
					that.showSuccess("Mission Succeeded");
				}
				that.moveToNextMission(true);
				that.beginRound();					
			});	
		},
		onTeamVoteResult: function(aData){
			var oRound = aData[this.getMissionNumber()].rounds[this.getRound()];
			var isApproved =  (!oRound.isPending) && oRound.isApproved;
			if(isApproved){
				if(oRound.team.indexOf( this.getMyId()) > -1){
					// if i am in the team
					this.showMissionVoteControl(oRound.team);	
				} else {
					this.fetchMissionVotes();
				}
			} else {
				//todo: if fifth round is rejected;
				this.showFailure("Team rejected");
				this.moveToNextRound();
				this.beginRound();
			}
		},
		onTeamPick: function(){
			var that = this;
			var players = this.getPlayers();
			var a = PlayerManager.getTeamData();
			this.service.saveTeam({
				mission: this.getMissionNumber(),
				team: a.id,
				round: this.getRound(),
				leader: this.getLeader(),
				approved: [],
				reject:[],
				isApproved: false
			}, function(data){
				MissionManager.updateMissionTableUi(players, data);
				that.showTeamVoteControl();
			});
		},
		saveMyMissionVote: function(bVote){
			var that = this;
			var players = this.getPlayers();
			this.showInfo("Waiting for Mission result", "");
			this.service.saveMyMissionVote(bVote, function(data){
				if(data[that.getMissionNumber()].state == 0){
					that.showFailure("Mission Failed");
				} else {
					that.showSuccess("Mission Succeeded");
				}
				MissionManager.updateMissionTableUi(players, data);
				that.moveToNextMission(true);
				that.beginRound();					
			});	
		},
		saveMyTeamVote: function(bVote){
			var that = this;
			var players = this.getPlayers();
			this.showInfo("Waiting for others votes", "");
			this.service.saveMyTeamVote({
				mission: this.getMissionNumber(),
				round: this.getRound(),
				vote: bVote
			}, function(data){
				MissionManager.updateMissionTableUi(players, data);
				that.onTeamVoteResult(data);		
			});
		},
		showInfo: function(sLabel, sText){
			jQuery(".controlPane").hide();
			var infoControl = jQuery("#infoControl").show();
			infoControl.find(".infoTextLabel").html(sLabel);
			infoControl.find(".infoTextContent").html(sText);
		},
		showTeamVoteControl: function(){
			var a = PlayerManager.getTeamData().name;
			jQuery(".controlPane").hide();
			jQuery("#voteControl").show().find(".infoTextContent").html(a.join(", "));
		},
		showPickControl: function(){
			jQuery(".controlPane").hide();
			jQuery("#pickControl").show().find(".infoTextContent").html(this.getTeamLimit() + " players");
		},
		showMissionVoteControl: function(aTeam){
			var a = PlayerManager.getTeamData().name;
			jQuery(".controlPane").hide();
			jQuery("#missionControl").show().find(".infoTextContent").html(a.join(", "));
		},
		enableButton: function(sId){
			jQuery("#" + sId).removeClass("disable");
		},
		disableButton: function(sId){
			jQuery("#" + sId).addClass("disable");
		},
		_attachEvents: function(){
			var that = this;
			var pickButton = jQuery("#pick");
			pickButton.click(function(){
				if(!pickButton.hasClass("disable")){
					that.onTeamPick();
				}
			});
			jQuery("#succeed").on("click", function(){
				that.saveMyMissionVote(true);
			});
			jQuery("#fail").on("click", function(){
				that.saveMyMissionVote(false);
			});
			jQuery("#approve").on("click", function(){
				that.saveMyTeamVote(true);
			});
			jQuery("#reject").on("click", function(){
				that.saveMyTeamVote(false);
			});
		},
		_attachListeners: function(){
			var that = this;
			PlayerManager.listenTo("onTeamFull", function(){
				that.enableButton("pick");
			});
			PlayerManager.listenTo("onTeamUndone", function(){
				that.disableButton("pick");
			});
		},
		showSuccess: function(sMsg){
			jQuery("#messageToast").html(sMsg).removeClass("fail").show().addClass("success");
			setTimeout(function(){
				jQuery("#messageToast").hide();
			}, 3000);
		},
		showFailure: function(sMsg){
			jQuery("#messageToast").html(sMsg).removeClass("success").show().addClass("fail");
			setTimeout(function(){
				jQuery("#messageToast").hide();
			}, 3000);
		}
    };
}
)();
