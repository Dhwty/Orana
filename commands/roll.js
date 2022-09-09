const { SlashCommandBuilder } = require('@discordjs/builders');
const d20 = require('d20');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('roll')
	.setDescription('Roll some dice! You can + or - a number to any roll: +roll 1d20-2')
	.addStringOption(option =>
		option.setName('dice')
			.setDescription('Use the formats: #d#, #d#+#, or #d#-#')
			.setRequired(true)),

	async execute(interaction) {
		const dice = interaction.options.getString('dice');
		return interaction.reply('You rolled ' + dice + ' and got: ' + d20.roll(dice));
	},
};
