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
		fetchTeam: function(){
			var that = this;
			var players = this.getPlayers();
			this.showInfo(this.getPlayerNameById(this.getLeader()));
			setTimeout(function(){
				that.service.fetchTeam(function(data){
					MissionManager.updateMissionTableUi(players, data);
					PlayerManager.setTeam(data[that.getMissionNumber()].rounds[that.getRound()].team);
					that.showTeamVoteControl();				
				});				
			}, 4000);
		},
		beginRound: function(){
			PlayerManager.resetTeam();
			if(this.getMyId() == this.getLeader()){
				this.showPickControl();
			} else {
				this.fetchTeam();
			}
		},
		onTeamPick: function(){
			var that = this;
			var players = this.getPlayers();
			var a = PlayerManager.getTeamData();
			//this.showInfo("You picked", a.name.join(", "));
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
		onTeamVote: function(bVote){
			var that = this;
			var players = this.getPlayers();
			this.service.saveMyTeamVote({
				mission: this.getMissionNumber(),
				round: this.getRound(),
				vote: bVote
			}, function(data){
				MissionManager.updateMissionTableUi(players, data);
				that.moveToNextRound();
				that.beginRound();
				
			});
		},
		showInfo: function(sText){
			jQuery(".controlPane").hide();
			jQuery("#infoControl").show().find(".infoTextContent").html(sText);
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
		showControl: function(sId){
			jQuery(".controlPane").hide();
			jQuery("#"+sId).show();
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
				
			});
			jQuery("#fail").on("click", function(){
				
			});
			jQuery("#approve").on("click", function(){
				that.onTeamVote(true);
			});
			jQuery("#reject").on("click", function(){
				that.onTeamVote(false);
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
		}
    };
}
)();
