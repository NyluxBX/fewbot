const Discord = require('discord.js');
const {
    prefix
} = require('../config.json')
const needle = require('needle');

module.exports.run = async (client, message) => {
    message.delete()

    let member = message.mentions.members.first();
    if (!member) {
        let body = (await needle('get', 'https://nekos.life/api/v2/img/hug')).body;
        let hugEmbed1 = new Discord.MessageEmbed()
            .setColor('#1C004A')
            .setTitle(`${client.user.username} fais un calin a ${message.author.username} `)
            .setImage(body.url)
        return message.channel.send(hugEmbed1)
    }

    if (member) {
        const body = (await needle('get', 'https://nekos.life/api/v2/img/hug')).body;
        let hugEmbed2 = new Discord.MessageEmbed()
            .setColor("#1C004A")
            .setTitle(`${message.author.username} fais un câlin a ${member.user.username}`)
            .setImage(body.url)
            .setFooter(message.guild.name, message.guild.iconURL())
        return message.channel.send(hugEmbed2)
    }
};

module.exports.infos = {
    name: ['hug', 'calin'],
};