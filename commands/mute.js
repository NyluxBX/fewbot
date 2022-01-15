const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.delete();

  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    return message.channel.send(':warning: | Vous n\'avez pas la permission nécessaire (\`MANAGE_MESSAGES`\).').then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));
  }
  let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
  const users = await message.guild.members.fetch(toMute.id);

  let muteReason = args.join(' ').slice(22);
  if (!muteReason) muteReason = 'Aucune raison';

  if (!toMute) return message.channel.send(":warning: | Vous n'avez pas de spécifier de mention ou d'ID!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));
  if (toMute.id === message.author.id) return message.channel.send(":warning: | Vous ne pouvez pas vous mute!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));

  if (toMute.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":warning: | Vous ne pouvez pas mute un membre qui a la permission de Mute!").then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));


  let MuteRole = message.guild.roles.cache.find(role => role.name === "🔴 Mute");

  if (!MuteRole) {
    MuteRole = await message.guild.roles.create({
        data: {
          name: '🔴 Mute',
          color: '#fffffd',
        },
        reason: 'Rôles pour les mutes',
      })
      .catch(console.error);


    message.guild.channels.cache.forEach(async (channel, id) => {
      await channel.updateOverwrite(MuteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    })
  }

  if (users.roles.cache.find(r => r.name === "🔴 Mute")) {
    return message.channel.send(':warning: | Cet utilisateur est déjà mute').then(msg => setTimeout(() => msg.delete().catch(() => undefined), 3000));
  }

  let tomuttedEmbed = new Discord.MessageEmbed()
    .setTitle(`Vous avez été mute de ${message.guild}`)
    .setColor('#fffffd')
    .addField('Auteur :', `${message.author} \n ${message.author.id}`, true)
    .addField('Raison : ', muteReason)
    .setTimestamp()

  toMute.send(tomuttedEmbed)

  let muteEmbed = new Discord.MessageEmbed()
    .setTitle('Un utilisateur à été mute')
    .setColor('#fffffd')
    .addField('Utilisateur :', `${toMute} \n ${toMute.id}`, true)
    .addField('Auteur :', `${message.author} \n ${message.author.id}`, true)
    .addField('Raison : ', muteReason)
    .setTimestamp()

  message.channel.send(muteEmbed)
  message.guild.member(toMute).roles.add(MuteRole)

};

module.exports.infos = {
  name: ['mute'],
};