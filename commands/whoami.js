const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whoami')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		const rolelist = interaction.member.roles.cache.map(r => r.name).join(', ');
		return interaction.reply(`${interaction.user.displayAvatarURL({ dynamic: true })}\n**Your username**: ${interaction.user.username}\n**Your ID**: ${interaction.user.id}\n**Your roles:** ` + rolelist);
	},
};
