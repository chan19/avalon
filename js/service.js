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
        }
    }
}
)();
