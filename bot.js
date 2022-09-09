// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const emojiCharacters = require('./emojiCharacters');
const momentTZ = require('moment-timezone');
const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { guildId, moTZ, channelAnnounce, channelMagisterium, channelPartyhard, roleGuests, roleAdmins, partyName, partyDate } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages] });

//Constants set, time to init.
console.log('Preparing Orana...\nNode version: ' + process.version + '\nDiscord.js version:' + Discord.version);

//Event Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Command Handler
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Error Logging
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
// client.on('debug', (e) => console.info(e));
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

//Disconnect handler
client.on('disconnect', function(erMsg, code) {
	console.log('----- ' + momentTZ.tz(new Date(), moTZ).toString() + ':  Bot disconnected from Discord with code', code, '-----');
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
