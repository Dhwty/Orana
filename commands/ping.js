const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong! (and also some info about ping times)'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Pong!\nWebsocket heartbeat: ${interaction.client.ws.ping}ms.\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};
