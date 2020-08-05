PlayerManager = (function() {
    return {
        createPlayers: function(aPlayer) {
			var that =this;
            aNodes = [];
            aPlayer.forEach(function(o) {
                aNodes.push(new Player({
                    data: o,
					press: function(){
						if(this.getIsActive()){
							that.addToTeam(this);
						} else {
							that.removeFromTeam(this);
						}
					}
                }));
            });
            this._playerNodes = aNodes;
            this.renderPlayers(aNodes);
        },
		_team: [],
		_teamLimit: 3,
		setArenaActive: function(bActive){
			jQuery("#arena")[bActive? "addClass" : "removeClass"]("isActive");
			this._playerNodes.forEach(function(o){
				o.setEnable(bActive);
			});
		},
		resetTeam: function(){
			var a;
			while(a=this._team.pop()){
				a.setIsActive(false);
				//a.setEnable(false);
			}
		},
		addToTeam: function(a){
			var l = this.getTeamLimit();
			if(this._team.length == l){
				a.setIsActive(false);
			} else {
				this._team.push(a);
				if(this._team.length == l){
					this.fireEvent("onTeamFull");
				}
			}
		},
		setTeam: function(aId){
			var that = this;
			this.resetTeam();
			this._playerNodes.forEach(function(o){
				if(aId.indexOf(o.getId()) > -1){
					o.setIsActive(true);
					that._team.push(o);
				}
			});
		},
		removeFromTeam: function(a){
			var i = this._team.indexOf(a);
			this._team.splice(i,1);
			if(this._team.length == this.getTeamLimit() - 1){
				this.fireEvent("onTeamUndone");
			}
			return this;
		},
		setTeamLimit: function(n){
			this._teamLimit = n;
			this.resetTeam();
		},
		getTeamLimit: function(){
			return this._teamLimit;
		},
		getTeam: function(){
			return this._team;
		},
		getTeamData: function(){
			var a =[];
			var b = [];
			this._team.forEach(function(o){
				a.push(o.getName());
				b.push(o.getId());
			});
			return {
				name: a,
				id: b
			};
		},
        renderPlayers: function(aNode) {
            var container = jQuery("#arena");
            aNode.forEach(function(o) {
                container.append(o.getNode());
            });
        },
		displayMyRole: function(sId){
			var aNode = this._playerNodes;
			var l = aNode.length;
			for(var i = 0; i < l; i++){
				if(aNode[i].getId() == sId){
					aNode[i].setShowRoleText(true);
					break;
				}
			}
		},
		markDecider: function(sId){
			this._playerNodes.forEach(function(o){
				if(o.getId() == sId){
					o.setDecider(true);
				} else {
					o.setDecider(false);
				}
			});
		},
		markLeader: function(sId){
			this._playerNodes.forEach(function(o){
				if(o.getId() == sId){
					o.setLeader(true);
				} else {
					o.setLeader(false);
				}
			});
		},
		_listeners: {},
		listenTo: function(sEvent, fn){
			this._listeners[sEvent] = this._listeners[sEvent] || [];
			this._listeners[sEvent].push(fn);
		},
		fireEvent: function(sEvent){
			if(this._listeners[sEvent]){
				this._listeners[sEvent].forEach(function(f){
					f();
				})
			}
		},
    }
}
)();
