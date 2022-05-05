// ==UserScript==
// @name         BCBasicAchievements
// @namespace    https://bcmc.ga/authors/tumble/
// @version      0.1.3.4
// @author       Tumble
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      https://github.com/tumble1999/mod-utils/raw/master/mod-utils.js
// @require      https://github.com/tumble1999/modial/raw/master/modial.js
// @require      https://github.com/tumble1999/critterguration/raw/master/critterguration.user.js
// @require      https://github.com/tumble1999/bc-notify/raw/master/bc-notify.user.js
// @require      https://github.com/tumble1999/bc-achieve/raw/master/bc-achieve.user.js
// @grant        GM_getValue
// @grant        GM_setValue
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
				author: "p1"
			}),
			collector: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "The Collector",
				description: "Have over 400 items",
				amount: 400,
				author: "Pr4hVal5",
			}),
			followTheCrowd: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Follow the Crowd",
				description: "be in a room with more than 100 people online",
				author: "p1"
			}),
			flashMob: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Flash Mob",
				description: "wear the same things as 10 others in the same room",
				author: "p1"
			}),
			centipede: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Centipede",
				description: "earn 100 coins",
				author: "Tumble"
			}),
			millipede: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Millipede",
				description: "earn 1,000 coins",
				author: "Tumble"
			}),
			millipede10: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "10 Millipedes",
				description: "earn 10,000 coins",
				author: "Tumble"
			}),
			millipede100: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "100 Millipedes",
				description: "earn 100,000 coins",
				author: "Tumble"
			}),
			capitalist: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "AdVenture Capitalist",
				description: "earn 1,000,000 coins",
				author: "p1"
			}),
			basement: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Basement Dweller",
				description: "login more than 1000 times",
				author: "p1",
				amount: 1000
			}),
			proclaimer: BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "The Proclaimer",
				description: "walk 1000 miles  (1000 miles = 1609344m )",
				author: "p1",
				amount: 1609344
			}),
		};
		/*
/Favorite Room - visit room X times
/Chatterbox - talk x times
/Follow the Crowd - be in a room with more than 100 people online
/Flash Mob - wear the same things as 10 others in the same room
/The Collector - have X items in inventory
/Collector: getting 400 items in game
/Explorer - visit every room
/AdVenture Capitalist - earned more than X coins (through minigames etc.)
/Basement Dweller - login more than X times
Fasion Modal - change clothes x times
The Proclaimer - walk 100000 (or something) units
Gotta go fast - visit all rooms in under a minute (or any feasible time)
Distracted? - afk at the same spot for more than an hour
	- online time >x hours
Conference Room - more than 10 people are talking onscreen at the same time
Hunter - defeat more than X monsters in the RPG card game
Mr Popular - have X friends
Stalker - follow another player (e.g. closer than X px) over a distance of more than Y (an appropriate achievement name would be "Stalker")
Cool - have X sets of sunglasses (or any other item)
	-  play minigame X for more than Y hours
Wow, nerd: Click the TOS and Privacy Policy buttons and spend 15 minutes on each.

		*/;

	cardboard.addEventListener("worldCreated", world => {
		world.on("M", message => {
			if (message.i == world.player.playerId) {
				achievements.chatterbox.achieve();
			}
		});
		//world.on("moveTo",);
	});
	cardboard.addEventListener("login", (world, player) => {
		achievements.basement.achieve();
		achievements.collector.set(player.inventory.length);

		if (player.coins >= 100) achievements.centipede.achieve();
		if (player.coins >= 1000) achievements.millipede.achieve();
		if (player.coins >= 10000) achievements.millipede10.achieve();
		if (player.coins >= 100000) achievements.millipede100.achieve();
		if (player.coins >= 1000000) achievements.capitalist.achieve();
	});

	function arraysEqual(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;
		for (var i = 0; i < a.length; ++i) if (!a.includes(b[i])) return false;
		return true;
	}

	cardboard.addEventListener("joinRoom", (world, room) => {
		//console.log(room);
		if (room.playerCrumbs.length >= 100) achievements.followTheCrowd.achieve();
		if (room.playerCrumbs.filter(p => arraysEqual(p.g, world.player.gear)) >= 10) achievements.flashMob.achieve();
		if (Object.keys(roomJoinCounts).length == 0) {
			achievements.joinAllRooms = BCAchieve.createAchievement({
				mod: BCBasicAchievements,
				name: "Explorer",
				description: "Visit every room",
				amount: world.rooms.length,
				author: "Orca"
			});

			world.rooms.forEach(room => {
				achievements.joinRooms[room.roomId] = BCAchieve.createAchievement({
					mod: BCBasicAchievements,
					name: room.name + " Enthusiast",
					description: "Join " + room.name + " 1000 times",
					amount: 1000,
					author: "p1"
				});
				if (!roomJoinCounts[room.roomId]) roomJoinCounts[room.roomId] = achievements.joinRooms[room.roomId].completion() || 0;
			});
		}
		//console.log(roomCrumb);
		if (!roomJoinCounts[room.roomId]) roomJoinCounts[room.roomId] = 0;
		roomJoinCounts[room.roomId]++;
		achievements.joinRooms[room.roomId].achieve();
		if (roomJoinCounts[room.roomId] == 1) {
			achievements.joinAllRooms.achieve();
		}

		//player position tracking
		let { x: px, y: py } = cardboard.getPlayerCrumb("i", world.player.playerId, world);
		world.on("moveTo", ({ x, y }) => {
			let dx = x - px,
				dy = y - py,
				d = Math.sqrt(dx * dx + dy * dy);
			achievements.proclaimer.achieve(d);
		});
	});

})();