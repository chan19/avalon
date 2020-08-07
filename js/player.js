var Player = function(oConfig) {
    this.init(oConfig);
}
Player.prototype = {
    init: function(oConfig) {
        this.setData(oConfig.data);
		this.setEnable(oConfig.enable ? true : false);
		this.setHandler(oConfig.press);
    },
	_onPress: function(){
		
	},
	_isActive: false,
	_isEnable: false,
	setHandler: function(fn){
		this._onPress = fn || function(){};
	},
    setData: function(data) {
        this.setId(data.id);
        this.setName(data.name);
        this.setRole(data.role);
    },
    getData: function() {
        return {
            id: this.getId(),
            name: this.getName(),
            role: this.getRole()
        };
    },
    setId: function(sId, bRender) {
        this._id = sId;
    },
    getId: function() {
        return this._id;
    },
    setName: function(s, bRender) {
        this._name = s;
    },
    getName: function() {
        return this._name;
    },
    setRole: function(s, bRender) {
        this._role = s;
    },
    getRole: function() {
        return this._role;
    },
	getDecider: function(){
		return this._isDecider;
	},
	getLeader: function(){
		return this._isLeader;
	},
	setDecider: function(bDecider){
		this._isDecider = bDecider;
		this._node[bDecider? "addClass" : "removeClass"]("isDecider");
	},
	setIsActive: function(bActive){
		this._isActive = bActive;
		this._node[bActive ? "addClass" : "removeClass"]("isActive")
	},
	getIsActive: function(){
		return this._isActive;
	},
	setEnable: function(bEnable){
		this._isEnable = bEnable;
	},
	isEnable: function(){
		return this._isEnable;
	},
	setShowRoleText: function(){
		this._node.find(".roleText").show();
	},
	toggleIsActive: function(){
		this.setIsActive(!this.getIsActive());
	},
	setLeader: function(bLeader){
		this._isLeader = bLeader;
		this._node[bLeader? "addClass" : "removeClass"]("isLeader");
	},
    _attachEvents: function() {
		var that = this;
		this._node.on("mousedown", function(){
			if(that.isEnable()){
				that.toggleIsActive();
				that._onPress();
			}
		});
    },
	render: function(sId){
		jQuery("#"+sId).append(this.getNode());
	},
    _createNode: function() {
        var oData = this.getData();
        var sHtml = this.getHtml(oData);
        this._node = jQuery(sHtml);
        this._attachEvents(this._node);
        return this._node;
    },
    getNode: function() {
        if (!this._node) {
            this._node = this._createNode();
        }
        return this._node;
    },
	getRoleClass: function(){
		
	},
    getHtml: function(oData) {
        var sRoleClass = "role" + ROLE_CONFIG[oData.role].toLowerCase();
        return "<div class='player " + sRoleClass + "' id='_player" + oData.id + "'>" + "<div class='playerRoleIcon'></div><div class='playerName'>" + oData.name + "</div>" +
		"<div class='roleText' style='display:none'>" + ROLE_CONFIG[oData.role]+ "</div><div class='decidericon'></div><div class='leadericon'></div>";
    },

};
