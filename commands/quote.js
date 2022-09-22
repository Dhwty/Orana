const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { embedIcon } = require('../config.json');
const { sidebarDef } = require('../includes/embedcolours.json');
const fs = require('node:fs');
const path = require('node:path');

const quotesPath = path.join(__dirname, '..', 'quotes');
const quoteFiles = fs.readdirSync(quotesPath).filter(file => file.endsWith('.txt'));
console.log(quoteFiles);
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Display a random quote from the specified source.')
        .addStringOption(option =>
    		option.setName('source')
    			.setDescription('Where do you want quotes from?')
    			.setRequired(true)
                /*for(var i = 0; i < quoteFiles.length; i++ ){
                    option.addChoices( {name: quoteFiles[i], value: quoteFiles[i]} )
                }*/
                .addChoices( { name:'fortune', value:'fortune' }, { name:'anders', value:'anders' })
            ),
	async execute(interaction) {
        const source = interaction.options.getString('source');
        const filename = path.join(quotesPath, source + '.txt');
        var data;
        var randInt = 0;
        var line;
        fs.readFile( filename, 'utf8', function (err,rawData) {
            if (err) {
                return console.log(err);
            }
            data = rawData.split('\n');
            randInt = Math.floor(Math.random() * data.length);
            console.log (randInt);
            console.log(data[randInt]);
            line = data[randInt];
            const embed = new EmbedBuilder()
                .setColor(sidebarDef)
                .setTitle(source.charAt(0).toUpperCase() + source.slice(1) + ' says:')
                .setDescription(line)
                .setFooter({ text: 'Party on!', iconURL: embedIcon });
            return interaction.reply({ embeds:[embed] });
        });
    },
};
