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
				that.fetchMissionData();
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
            this.setRound(data.round);
			this.setMyId(data.profile_id);
        },
		fetchMissionData: function(){
			var players = this.getPlayers();
			this.service.getMissionData(function(data){
				MissionManager.updateMissionTableUi(players, data);
			});
		},
		addMission: function(oTeam){
			
		},
        prepareUI: function() {
            PlayerManager.createPlayers(this.getPlayers());
			PlayerManager.markDecider(this.getRound().decider);
			PlayerManager.markLeader(this.getRound().leader);
			PlayerManager.displayMyRole(this.getMyId());
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
        setRound: function(n) {
            this._round = n;
        },
        getRound: function() {
            return this._round;
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
            return this.getDecider;
        },
		onPick: function(){
			var a = PlayerManager.getTeamData();
			this.showInfo("You picked", a.name.join(", "));
			this.addMission(a);
		},
		showInfo: function(sLabel, sText){
			var s = "<div class='infoTextLabel'>"+ sLabel + "</div><div class ='infoTextContent'>" + sText + "</div>";
			jQuery(".controlPane").hide();
			jQuery("#infoControl").show().html(s);
		},
		showControl: function(sId){
			jQuery(".controlPane").hide();
			jQuery("#"+sId).show();
		},
		enableButton: function(sId){
			jQuery("#" + sId).addClass("enable");
		},
		disableButton: function(sId){
			jQuery("#" + sId).removeClass("enable");
		},
		_attachEvents: function(){
			var that = this;
			jQuery("#pick").click(function(){
				that.onPick();
			});
			jQuery("#succeed").on("click", function(){
				
			});
			jQuery("#fail").on("click", function(){
				
			});
			jQuery("#approve").on("click", function(){
				
			});
			jQuery("#reject").on("click", function(){
				
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
    };
}
)();
