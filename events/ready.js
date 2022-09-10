const { ActivityType } = require('discord.js');
const momentTZ = require('moment-timezone');
const Cron = require("croner");
const { moTZ, channelAnnounce, channelPartyhard, partyName, partyDate } = require('../config.json');

//Set party time
const parts = partyDate.split(',');
//const partyTime = new Date(Date.now() + (5 * 60 * 1000),);
const partyTime = new Date(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]);

// Begin scheduling system
const day = (24 * 60 * 60 * 1000);
const hour = (60 * 60 * 1000);
const hh = (30 * 60 * 1000);
const qh = (15 * 60 * 1000);
const tm = (10 * 60 * 1000);
const fm = (5 * 60 * 1000);

const hourThree = new Date(partyTime.getTime() + hour);
const hourTwo = new Date(hourThree.getTime() + hour);
const hourOne = new Date(hourTwo.getTime() + hour);
const minute30 = new Date(hourOne.getTime() + hh);
const minute5 = new Date(minute30.getTime() + (hh - fm));
const endTime = new Date(minute5.getTime() + (fm));

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		//Confirm login
		console.log(momentTZ.tz(new Date(), moTZ).toString() + `: Logged in as ${client.user.username}!`);
		// Announce party time
		console.log('Next party @ ' + momentTZ.tz(partyTime, moTZ).toString());
		client.channels.cache.get(channelAnnounce).setTopic('Next party @ ' + momentTZ.tz(partyTime, moTZ).toString());

		//Configure cron for party
		const hr4 = Cron( partyTime, () => {client.channels.cache.get(channelPartyhard).send( partyName + ' begins!');});
		const hR3 = Cron( hourThree, () => {client.channels.cache.get(channelPartyhard).send('Three hours remain in the current ' + partyName + '!');});
		const hR2 = Cron( hourTwo, () => {client.channels.cache.get(channelPartyhard).send('Two hours remain in the current ' + partyName + '!');});
		const hR1 = Cron( hourOne, () => {client.channels.cache.get(channelPartyhard).send('One hour remains in the current ' + partyName + '!');});
		const mR30 = Cron( minute30, () => {client.channels.cache.get(channelPartyhard).send('Thirty minutes remain in the current ' + partyName + '!');});
		const mR5 = Cron( minute5, () => {client.channels.cache.get(channelPartyhard).send('Five minutes remain in the current ' + partyName + '!');});
		const mR0 = Cron( minute5, () => {client.channels.cache.get(channelPartyhard).send('This' + partyName + 'has now reached its conclusion!');});

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
