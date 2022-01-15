const Discord = require('discord.js');

module.exports.run = async (client, message) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {return}
   
    message.delete();

    const staff = new Discord.MessageEmbed()
            .setTitle('Rôles du Serveur')
            .setColor('#2C2F33')
            .setThumbnail('https://i.imgur.com/j3IISku.gif')
            .setDescription('<@&867050718363648080> \n Les Fondateurs, ce sont les propriétaires du serveur, ils organisent et s\'occupent du Discord \n \n <@&867482150777389117> \n L\'EKIP du serveur, autrement dit les staffs.\n \n <@&867049153225162792> \n Des amis proches/collègues de la haute instance du serveur. \n \n <@&867075700682391602> \n Ce sont les membres qui font parti de la team Few (plus d\'info dans <#867126333543546901>) \n \n  <@&867086187323719760> \n Nos membres les plus actifs ! Ils ont atteint le niveau 25 sur le serveur ! \n \n <@&867090240749699093> \n Pas mal! Ces membres ont atteint le niveau 15 sur le serveur. \n \n <@&867056571803500614> \n C\'est un bon début ! Le niveau 5 est à vous. \n \n <@&867078962752651274> \n Vous êtes un membre du serveur, merci de votre présence 💜<:Few:931964740371116132> !')

    message.channel.send(staff)
};

module.exports.infos = {
    name: ['H_2=tg-Ceept4#Z&'],
};