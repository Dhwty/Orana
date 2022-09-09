const { SlashCommandBuilder } = require('@discordjs/builders');
const { helpLink } = require('./config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Display a link to the list of bot commands.'),
	async execute(interaction) {
		return interaction.reply({ content: `Orana's commands are available at: <` + helpLink + `>`, ephemeral: true });
	},
};
