const { SlashCommandBuilder } = require('@discordjs/builders');
const { serverName, channelsLink } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channels')
		.setDescription('Display a link to the list of channel info.'),
	async execute(interaction) {
		return interaction.reply({ content: `Information about ` + serverName + ` channels is available at: <` + channelsLink + `>`, ephemeral: true });
	},
};
