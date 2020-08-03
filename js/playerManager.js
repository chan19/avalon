PlayerManager = (function() {
    return {
        createPlayers: function(aPlayer) {
            aNodes = [];
            aPlayer.forEach(function(o) {
                aNodes.push(new Player({
                    data: o,
					press: function(){

					}
                }));
            });
            this._playerNodes = aNodes;
            this.renderPlayers(aNodes);
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
		}
    }
}
)();
