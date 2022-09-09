const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const momentTZ = require('moment-timezone');
const { guildId, channelPartyhard, roleGuests, rolePatrons, roleRegulars, roleAdmins, partyName, partyDate, moTZ } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('open')
		.setDescription('Open the party room.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(roleGuests, {
			SendMessages: true,
			ViewChannel: true,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Guests invited!'))
			.catch(console.error);
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(rolePatrons, {
			SendMessages: true,
			ViewChannel: true,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Patrons invited!'))
			.catch(console.error);
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(roleRegulars, {
			SendMessages: true,
			ViewChannel: true,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Magisters invited!'))
			.catch(console.error);
		return interaction.reply('Let\'s get this party started right! Let\'s get this party started *quickly*!');
	},
};
