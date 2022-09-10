const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		const rolelist = interaction.guild.roles.cache.map(r => r.name).join(', ');
		return interaction.reply(`${interaction.guild.iconURL({ dynamic: true })}\n**Server name:** ${interaction.guild.name}\n**Server ID:** ${interaction.guild.id}\n**Server Roles:**  ` + rolelist + `\n**Total members:** ${interaction.guild.memberCount}`);
	},
};
