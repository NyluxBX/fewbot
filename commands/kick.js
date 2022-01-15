const Discord = require('discord.js')
const {
    logsChannel
  } = require('../config.json')

module.exports.run = async (client, message, args) => {
   message.delete()

    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
    if(!message.member.hasPermission('MANAGE_MESSAGES' || 'KICK_MEMBERS')) {
        return message.channel.send(':warning: | Vous n\'avez pas la permission nécessaire (\`MANAGE_MESSAGES`\ ou \`KICK_MEMBERS`\).')
    }

    if (!kickedUser) {
        return message.channel.send(':warning: | Vous n\'avez pas entré un utilisateur valide')
    }

    let kickReason = args.join(' ').slice(22);
    if (!kickReason) kickReason = 'Aucune raison';


    if (kickedUser.hasPermission('MANAGE_MESSAGES' || 'KICK_MEMBERS')) {
        return message.channel.send(':warning: | La personne est immunisé au kick (à la permission \`MANAGE_MESSAGES`\ ou \`KICK_MEMBERS`\) ')
    }
  
    let toKickedEmbed = new Discord.MessageEmbed()
    .setTitle(`Vous avez été kick de ${message.guild.name}`)
    .setColor('#fffffd')
    .addField('Auteur :', `${message.author} \n ${message.author.id}`, true)
    .addField('Raison : ', kickReason)
    .setTimestamp()

    await kickedUser.send(toKickedEmbed).catch(() => undefined);

    let kickEmbed = new Discord.MessageEmbed()
    .setTitle('Un utilisateur à été kick')
    .setColor('#fffffd')
    .addField('Utilisateur :', `${kickedUser} \n ${kickedUser.id}`, true)
    .addField('Auteur :', `${message.author} \n ${message.author.id}`, true)
    .addField('Raison : ', kickReason)
    .setTimestamp()
    
    kickedUser.kick({reason: kickReason})
    message.channel.send(kickEmbed)

    logsCHNL = await client.channels.fetch(logsChannel);
    let logsEmbed = new Discord.MessageEmbed()
    logsEmbed.setTitle('Un utilisateur à été kick')
    logsEmbed.setColor('#fffffd')
    logsEmbed.addField('Utilisateur :', `${kickedUser} \n ${kickedUser.id}`, true)
    logsEmbed.addField('Auteur :', `${message.author} \n ${message.author.id}`, true)
    logsEmbed.addField('Raison : ', kickReason)
    logsEmbed.setTimestamp()
    logsCHNL.send(logsEmbed)
}

module.exports.infos = {
	name: ['kick'],
};