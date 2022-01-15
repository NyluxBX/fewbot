const Discord = require('discord.js');
const {
    prefix
} = require('../config.json')
const needle = require('needle');

module.exports.run = async (client, message) => {
    message.delete()

    let member = message.mentions.members.first();
    if (!member) {
        let body = (await needle('get', 'https://nekos.life/api/v2/img/slap')).body;
        let slapEmbed1 = new Discord.MessageEmbed()
            .setColor('#1C004A')
            .setTitle(`${client.user.username} donne une gifle à ${message.author.username} `)
            .setImage(body.url)
        return message.channel.send(slapEmbed1)
    }

    if (member) {
        const body = (await needle('get', 'https://nekos.life/api/v2/img/slap')).body;
        let slapEmbed2 = new Discord.MessageEmbed()
            .setColor("#1C004A")
            .setTitle(`${message.author.username} donne une gifle à ${member.user.username}`)
            .setImage(body.url)
            .setFooter(message.guild.name, message.guild.iconURL())
        return message.channel.send(slapEmbed2)
    }
};

module.exports.infos = {
    name: ['slap', 'gifle'],
};