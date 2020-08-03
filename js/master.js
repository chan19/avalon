MASTER = (function() {
    return {
        init: function() {
            this.service = SERVICE;
            this.start();
        },
        start: function() {
            var that = this;
            this.fetchInitData(function() {
                that.prepareUI();
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
        prepareUI: function() {
            PlayerManager.createPlayers(this.getPlayers());
			PlayerManager.markDecider(this.getRound().decider);
			PlayerManager.markLeader(this.getRound().leader);
			PlayerManager.displayMyRole(this.getMyId());
			MissionManager.updateMissionTableUi(this.getPlayers(), this.service.getMissionData());
		
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
    };
}
)();
