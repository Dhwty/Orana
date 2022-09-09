const { SlashCommandBuilder } = require('@discordjs/builders');
const d20 = require('d20');
module.exports = {
	data: new SlashCommandBuilder()
	.setName('vroll')
	.setDescription('Roll some dice and see results for each die! You can + or - a number to any roll: +vroll 3d20-2')
	.addStringOption(option =>
		option.setName('dice')
			.setDescription('Use the formats: #d#, #d#+#, or #d#-#')
			.setRequired(true)),
	async execute(interaction) {
		const dice = interaction.options.getString('dice');
		const longest = d20.verboseRoll(dice);
		const add = (a, b) => a + b;
		const total = longest.reduce(add);
		return interaction.reply('You rolled ' + dice + ' and got: ' + longest + ' (for a total of ' + total + ')');
	},
};
