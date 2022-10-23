const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { sidebarDef } = require('../includes/embedcolours.json');
const { embedIcon } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('whois')
		.setDescription('Get information about the selected user, or yourself.')
		.addUserOption(option => option.setName('target').setDescription('The user to show')),
	async execute(interaction) {
		var sbColour = sidebarDef;
		var joindate = new Date(Date.now());
		const member = interaction.options.getMember('target');
		const user = interaction.options.getUser('target');
		if (member){
			const rolelist = member.roles.cache.map(r => r.name).join(', ');
			sbColour = member.displayColor;
			joindate = member.joinedAt;
			const embed = new EmbedBuilder()
				.setColor(sbColour)
				.setTitle(member.displayName)
				.setThumbnail(member.displayAvatarURL({ dynamic: true }))
				.addFields(
					{ name: 'Username:', value: user.tag },
					{ name: 'Status:', value: member.presence.status + ' | ' + member.presence.activities.type + ' ' + member.presence.activities.toString() },
					{ name: 'ID:', value: user.id },
					{ name: 'Roles:', value: rolelist },
					{ name: 'Joined:', value: joindate.toUTCString() },
				)
				.setFooter({ text: 'Party on!', iconURL: embedIcon });

			return interaction.reply({ embeds:[embed] });
		}
		const rolelist = interaction.member.roles.cache.map(r => r.name).join(', ');
		sbColour = interaction.member.displayColor;
		joindate = interaction.member.joinedAt;
		const embed = new EmbedBuilder()
			.setColor(sbColour)
			.setTitle(interaction.user.username)
			.setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: 'Username:', value: interaction.user.tag },
				{ name: 'Status:', value: interaction.member.presence.status + ' | ' + interaction.member.presence.activities.type + ' ' + interaction.member.presence.activities.toString() },
				{ name: 'ID:', value: interaction.user.id },
				{ name: 'Roles:', value: rolelist },
				{ name: 'Joined:', value: joindate.toUTCString() },
			)
			.setFooter({ text: 'Party on!', iconURL: embedIcon });

		return interaction.reply({ embeds:[embed], ephemeral: true });
	},
};
