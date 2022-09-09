const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { moTZ } = require('../config.json');
const momentTZ = require('moment-timezone');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shutdown')
		.setDescription('Shut down the bot.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		interaction.reply('*goes to bed.*\nPlease restart the service.');
		console.log('----- ' + momentTZ.tz(new Date(), moTZ).toString() + ': Bot shutdown via command. -----');
		interaction.client.destroy((err) => {
			console.log(err);
		});
	},
};
