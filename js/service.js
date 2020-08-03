SERVICE = (function() {
    return {
        getInitData: function(fn) {
            var data = {
                role: "MERLIN",
                roles: ["MERLIN", "PERCEIVAL", "MORGANA", "ASSASSIN", "MORDRED", "TRISTIN", "ISOLDE", "RESISTANCE"],
				//["RESISTANCE", "MERLIN", "SPY", "PERCEIVAL", "MORGANA", "TRISTON", "ISOLDE"];
				profile_id: 1,
                players: [{
                    id: 0,
                    name: "SHIVA",
                    role: 0
                },{
                    id: 1,
                    name: "CHAN",
                    role: 1
                }, {
                    id: 2,
                    name: "SAIRAM",
                    role: 2
                }, {
                    id: 3,
                    name: "DEEPAK",
                    role: 0
                }, {
                    id: 4,
                    name: "NAMZY",
                    role: 0
                }, {
                    id: 5,
                    name: "KANTH",
                    role: 2
                }, {
                    id: 6,
                    name: "MADDY",
                    role: 0
                }, {
                    id: 7,
                    name: "SAILI",
                    role: 0
                }, {
                    id: 8,
                    name: "SNEHA",
                    role: 0
                }],
                round: {
                    round: 1,
                    decider: 4,
                    leader: 8
                },
				missions: [3,3,4,4,5]
            };
            fn(data);
        },
		getMissionData: function(){ 
				return [{
					missionNumber: 0,
					state: 1, //-1 pending, 0 fail 1 success
					rounds: [{
						missionNumber: 0,
						round: 0,
						team: [1,2,3],
						leader: 2,
						approved: [0,4,5,2,1],
						reject: [8,3,7,6],
						isApproved: true
					},{
						missionNumber: 0,
						round: 1,
						team: [1,2,3],
						leader: 2,
						approved: [4,5,2,1],
						reject: [0,8,3,7,6],
						isApproved: true
					},{
						missionNumber: 0,
						round: 2,
						team: [1,2,3],
						leader: 2,
						approved: [4,5,2,1,8],
						reject: [0,3,7,6],
						isApproved: true
					}]
				},{
					missionNumber: 1,
					state: 0, //-1 pending, 0 fail 1 success
					rounds: [{
						missionNumber: 1,
						round: 0,
						team: [7,2,3],
						leader: 5,
						approved: [4,5,2,1,0,8],
						reject: [3,7,6],
						isApproved: true
					},{
						missionNumber: 1,
						round: 1,
						team: [4,6,3],
						leader: 4,
						approved: [4,5,2,1,0],
						reject: [3,7,6,8],
						isApproved: true
					},{
						missionNumber: 1,
						round: 2,
						team: [1,2,3],
						leader: 6,
						approved: [4,5,2,1,8],
						reject: [3,7,6,0],
						isApproved: true
					}]
				},{
					missionNumber: 2,
					state: -1,
					rounds: [{
						missionNumber: 2,
						round: 1,
						team: [1,2,3],
						leader: 6,
						approved: [],
						reject: [],
						isApproved: false
					}]
				},{
					missionNumber: 3,
					state: -1,
					rounds: []
				},{
					missionNumber: 4,
					state: -1,
					rounds: []
				}];
		}
    }
}
)();
