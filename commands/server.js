const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { sidebarDef } = require('../includes/embedcolours.json');
const { embedIcon } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		const rolelist = interaction.guild.roles.cache.map(r => r.name).join(', ');
		const chanlist = interaction.guild.channels.cache.map(c => c.name).join(', ');
		//const botlist = interaction.guild.commands.cache.map(b => b.name).join(', ');
		const memlist = interaction.guild.members.cache.map(m => m.displayName).join(', ');
		const sinceD = interaction.guild.createdAt;
		const embed = new EmbedBuilder()
			.setColor(sidebarDef)
			.setTitle(interaction.guild.name)
			.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
			.addFields(
				{ name: 'Since:', value: ':birthday: ' + sinceD.toUTCString() },
				{ name: 'ID:', value: interaction.guild.id },
				{ name: 'Members:', value: memlist + '\n(' + interaction.guild.memberCount.toString() + ')' },
				{ name: 'Roles:', value: rolelist },
				{ name: 'Channels:', value: chanlist },
				//{ name: 'Bot Commands:', value: botlist },
			)
			.setFooter({ text: 'Party on!', iconURL: embedIcon });

		return interaction.reply({ embeds:[embed] });
	},
};
