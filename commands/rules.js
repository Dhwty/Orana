const { SlashCommandBuilder } = require('@discordjs/builders');
const { serverName, rulesLink } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Display a link to the user guide.'),
	async execute(interaction) {
		return interaction.reply({ content: `The ` + serverName + ` User Guide can be found at: <` + rulesLink + `>`, ephemeral: true });
	},
};
