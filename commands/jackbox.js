const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { channelAnnounce, embedIcon } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('jackbox')
	.setDescription('Announce the start of a Jackbox game.')
	.addStringOption(option =>
		option.setName('roomcode')
			.setDescription('The Jackbox room code.')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('gamename')
			.setDescription('What game are we playing?')
			.setRequired(true)),

	async execute(interaction) {
		const roomcode = interaction.options.getString('roomcode');
		const gamename = interaction.options.getString('gamename');

		const embed = new EmbedBuilder()
			.setColor(16098851)
			.setTitle('We\'re playing '+ gamename + ' on Jackbox!')
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setDescription('This game will start in the next five minutes! Click the link below and enter the room code to join in, and then let the host know you\'re ready to play!')
			.setThumbnail('https://cdn.discordapp.com/attachments/408703337949822988/408709258939596804/30134-200.png')
			.addFields(
				{ name: 'Link', value: 'https://jackbox.tv' },
				{ name: 'Room Code:', value: roomcode },
			)
			.setFooter({ text: 'Party on!', iconURL: embedIcon });

		interaction.client.channels.cache.get(channelAnnounce).send({ embeds:[embed] });
		return interaction.reply({content:'Jackbox game announced.', ephemeral: true});
	},
};
