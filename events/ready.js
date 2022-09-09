const { ActivityType } = require('discord.js');
const momentTZ = require('moment-timezone');
const { moTZ, channelAnnounce, partyName, partyDate } = require('../config.json');

//Set party time
const parts = partyDate.split(',');
const partyTime = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		//Confirm login
		console.log(momentTZ.tz(new Date(), moTZ).toString() + `: Logged in as ${client.user.username}!`);
		// Announce party time
		console.log('Next party @ ' + momentTZ.tz(partyTime, moTZ).toString());
		client.channels.cache.get(channelAnnounce).setTopic('Next party @ ' + momentTZ.tz(partyTime, moTZ).toString());
		//Generate and set status
		const statNum = Math.floor(Math.random() * 6);
		switch (statNum) {
		case 0:
			client.user.setActivity('with Purrcy', { type: ActivityType.Playing });
			break;
		case 1:
			client.user.setActivity('Fenris glow', { type: ActivityType.Watching });
			break;
		case 2:
			client.user.setActivity('Artemis clean', { type: ActivityType.Watching });
			break;
		case 3:
			client.user.setActivity('Kirkwall burn', { type: ActivityType.Watching });
			break;
		case 4:
			client.user.setActivity('Anders\'s manifesto', { type: ActivityType.Listening });
			// the 'to' is included, for LISTENING
			break;
		case 5:
			client.user.setActivity('Varric\'s stories', { type: ActivityType.Listening });
			break;
		default: client.user.setActivity('you broke it', { type: ActivityType.Streaming });
		}
	},
};
