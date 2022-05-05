// ==UserScript==
// @name         BCBasicAchievements
// @namespace    https://bcmc.ga/authors/tumble/
// @version      0.1.0.1
// @author       Tumble
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      https://github.com/tumble1999/mod-utils/raw/master/mod-utils.js
// @require      https://github.com/tumble1999/modial/raw/master/modial.js
// @require      https://github.com/tumble1999/critterguration/raw/master/critterguration.user.js
// @require      https://github.com/tumble1999/bc-notify/raw/master/bc-notify.user.js
// @require      https://github.com/tumble1999/bc-achieve/raw/master/bc-achieve.user.js
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @run-at       document-start
// ==/UserScript==
(function () {
	"use strict";

	const BCBasicAchievements = new TumbleMod({
		cardboard: true
	}),
		roomJoinCounts = {},
		achievements = {
			joinRooms: {},
			chatterbox: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Chatterbox",
				description: "Talk 1000 times",
				amount: 1000,
				hidden: true,
				author: "p1"
			}),
			collector: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "The Collector",
				description: "Have 400 items",
				amount: 400,
				author: "Pr4hVal5",
				hidden: true
			}),
			followTheCrowd: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Follow the Crowd",
				description: "be in a room with more than 100 people online",
				author: "p1",
				hidden: true
			}),
			flashMob: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Flash Mob",
				description: "wear the same things as 10 others in the same room",
				author: "p1",
				hidden: true
			}),
		};
		/*
/Favorite Room - visit room X times
Fasion Modal - change clothes x times
/Chatterbox - talk x times
The Proclaimer - walk 100000 (or something) units
Gotta go fast - visit all rooms in under a minute (or any feasible time)
Distracted? - afk at the same spot for more than an hour
	- online time >x hours
Follow the Crowd - be in a room with more than 100 people online
Flash Mob - wear the same things as 10 others in the same room
Conference Room - more than 10 people are talking onscreen at the same time
The Collector - have X items in inventory
AdVenture Capitalist - earned more than X coins (through minigames etc.)
Hunter - defeat more than X monsters in the RPG card game
Mr Popular - have X friends
Basement Dweller - login more than X times
Stalker - follow another player (e.g. closer than X px) over a distance of more than Y (an appropriate achievement name would be "Stalker")
Cool - have X sets of sunglasses (or any other item)
	-  play minigame X for more than Y hours
	Collector: getting 100 items in game
//Explorer - visit every room
Wow, nerd: Click the TOS and Privacy Policy buttons and spend 15 minutes on each.

		*/;

	cardboard.addEventListener("worldCreated", world => {
		world.on("M", message => {
			if (message.i == world.player.playerId) {
				achievements.chatterbox.achieve();
			}
		});
	});
	cardboard.addEventListener("login", (world, player) => {
		achievements.collector.set(player.inventory.length);
	});

	cardboard.addEventListener("joinRoom", (world, room) => {
		console.log(room);
		if (Object.keys(roomJoinCounts).length == 0) {
			achievements.joinAllRooms = BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Explorer",
				description: "Visit every room",
				amount: world.rooms.length,
				author: "Orca"
			});

			world.rooms.forEach(room => {
				if (!roomJoinCounts[room.roomId]) roomJoinCounts[room.roomId] = 0;
				achievements.joinRooms[room.roomId] = BCAchieve.createAchievement({
					mod: BCBasicAchievements,
					name: room.name + " Enthusiast",
					description: "Join " + room.name + " 1000 times",
					amount: 1000,
					author: "p1"
				});
			});
		}
		//console.log(roomCrumb);
		if (!roomJoinCounts[room.roomId]) roomJoinCounts[room.roomId] = 0;
		roomJoinCounts[room.roomId]++;
		achievements.joinRooms[room.roomId].achieve();
		if (roomJoinCounts[room.roomId] == 1) {
			achievements.joinAllRooms.achieve();
		}
	});

})();