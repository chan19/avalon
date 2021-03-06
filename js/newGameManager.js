NewGameManager = (function() {
    return {
		init: function(){
			this.renderRoles();
			this._attachEvents();
		},
		_roles: [],
        renderRoles: function(aNode) {
			var aRole = [];
            var container = jQuery("#rolesPane");
			ROLE_CONFIG.forEach(function(s, i){
				var a = new Player({
					data: {
						id: "ROLE_" + i,
						name: s,
						role: i
					},
					enable: true
				});
				container.append(a.getNode());
				aRole.push(a);
			});
			this._roles = aRole;
        },
		_attachEvents: function(){
			var that = this;
			jQuery("#cancel").click(function(){
				that.close();
			});
		},
		reset: function(){
			
		},
		open: function(){
			jQuery("#blocker").show();
			jQuery("#newGameDialog").show();
			this.reset();
		},
		close: function(){
			jQuery("#blocker").hide();
			jQuery("#newGameDialog").hide();
		}
    }
}
)();
