const Discord = require('discord.js');
const {
    promises: fs
} = require('fs');
const math = require('mathjs')

module.exports.run = async (client, message, args) => {
    message.delete()

    try {

        resp = math.evaluate(args.join(' '))

    } catch (e) {

        return message.channel.send('Entrez un calcul correct.')

    }

    const embed = new Discord.MessageEmbed()
        .setColor('#1C004A')
        .setTitle('Calcul')
        .addField('Calcul', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Réponse', `\`\`\`css\n${resp}\`\`\``)



    await message.channel.send(embed);


};

module.exports.infos = {
    name: ['math', 'calc', 'calculer', 'calculate'],
};