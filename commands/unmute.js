const fs = module.require("fs");
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: | Vous n'avez pas la permission de unmute!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));
    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
    const users = await message.guild.members.fetch(toMute.id);
    if (!toMute) return message.channel.send(":x: | Vous n'avez pas spécifier de mention ou d'ID!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));
    if (toMute.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":warning: | Vous ne pouvez pas unmute un membre qui a la permission de Mute!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));


    let mutedRole = message.guild.roles.cache.find(role => role.name === "🔴 Mute");

    if (!mutedRole || !users.roles.cache.find(r => r.name === "🔴 Mute")) return message.channel.send(":x: | Cet utilisateur n'est pas mute").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));

    users.roles.remove(mutedRole);

    let unmuteEmbed = new Discord.MessageEmbed()
    unmuteEmbed.setTitle('Utilisateur Unmute!')
    unmuteEmbed.setColor('Black')
    unmuteEmbed.addField('Utilisateur Unmute', `${users.displayName} (ID: ${toMute.id})`)
    unmuteEmbed.addField('Auteur du Unmute', `${message.author} (ID: ${message.author.id})`)

    message.channel.send(unmuteEmbed);

    let tomuttedEmbed = new Discord.MessageEmbed()
        .setTitle(`Vous avez été unmute de ${message.guild}`)
        .setColor('BLACK')
        .addField('Auteur du Unmute', `${message.author} (ID: ${message.author.id})`)

    toMute.send(tomuttedEmbed)

}

module.exports.infos = {
    name: ['unmute'],
};