const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  message.delete();
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Tu n\'as pas la permission...');
  if (!args[0]) return message.channel.send('Tu dois spécifier un nombre de messages à supprimer !');
  if (isNaN(args[0]) == true) return message.channel.send('Tu dois spécifier un nombre de messages à supprimer !');
  if (args[0] > 99) return message.channel.send('Tu dois spécifier un nombre plus petit que 100 (Limite de l\'API Discord) !');
  if (args[0] < 1) return message.channel.send('Tu dois spécifier un nombre supérieur à 1 !');

  message.channel.bulkDelete(args[0]).then(() => {
    let embed = new Discord.MessageEmbed()
      .setColor('#fffffd')
      .setTitle(`Messages Supprimés!`)
      .addField(`Moderateur`, `${message.author.tag}`)
      .addField(`Salon`, `${message.channel.name}`)
      .addField(`Message(s) Supprimé(s)`, `${args[0]}`)
      .setFooter(`Commande exécutée par ${message.author.username}`)
      .setTimestamp();
    return message.channel
      .send(embed)
      .then(msg => msg.delete({
        timeout: 5000
      }));
  });

};

module.exports.infos = {
  name: ['clear'],
};