const { SlashCommandBuilder } = require('@discordjs/builders');
const { poll,lorddog,catte } = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('polls')
	.setDescription('Get the link for the latest poll and Ask Lord Dog.'),

	async execute(interaction) {
		return interaction.reply(`.\n**This Month's Poll:** <` + poll + `>\n**Ask Lord Dog:** <` + lorddog + `>\n**Next Guest Cat Theme:** ` + catte);
	},
};
