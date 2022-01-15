const {
    prefix,
    hellolist
} = require('../config.json');

const Discord = require("discord.js");
module.exports = async (client, message) => {
    if (message.author.bot) return;
    
    let allWords = message.content.toLowerCase().split(" ");

    if (allWords.some(word => hellolist.includes(word))) {
        return message.react('👋');
    };

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    const cmd = client.commands.find(cmd => cmd.infos.name.includes(command));

    if (!cmd) return;

    cmd.run(client, message, args);
};