const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const momentTZ = require('moment-timezone');
const { guildId, channelPartyhard, roleGuests, rolePatrons, roleRegulars, roleAdmins, partyName, partyDate, moTZ } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Close the party room.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(roleGuests, {
			SendMessages: false,
			ViewChannel: false,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Guests booted!'))
			.catch(console.error);
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(rolePatrons, {
			SendMessages: false,
			ViewChannel: false,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Patrons booted!'))
			.catch(console.error);
		interaction.client.channels.cache.get(channelPartyhard).permissionOverwrites.edit(roleRegulars, {
			SendMessages: false,
			ViewChannel: false,
		})
			.then(() => console.log(momentTZ.tz(new Date(), moTZ).toString() + ': Magisters booted!'))
			.catch(console.error);
		return interaction.reply('Cleanup complete.');
	},
};
