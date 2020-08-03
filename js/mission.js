function Mission(){
	this._rounds = [];
	this.init();
}
Mission.prototype = {
	init: function(){
		for(var i = 0; i < 5;i++){
			this._rounds.push(new Round());
		}
	}
}