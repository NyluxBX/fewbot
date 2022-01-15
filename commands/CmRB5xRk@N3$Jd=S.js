const Discord = require('discord.js')

module.exports.run = async (client, message, args, clients) => {
    message.delete()

    if (!message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_CHANNELS')) {
        return
    }

    let rulesEmbed = new Discord.MessageEmbed()
    .setAuthor('Réglement', "https://imgur.com/cEsQUTa.png")
    .setDescription('Le staff vous souhaite la bienvenue sur le discord **' + message.guild.name + '**, nous vous encourageons à bien prendre compte de celui-ci afin de vous permettre de profiter pleinement de l’expérience du discord. \n \n Le règlement suivant n’est pas exhaustif, le staff s’accorde la permission de sanctionner tout débordement non inscrit dans le règlement. \n ㅤ')
    .setColor('#045668')
    .addFields(
    { name: '🌐 | **Réglement Global**', value: '● Le respect est primordial dans tous vos échanges sur le discord (cela inclut les photos de profils et pseudos). \n ● Tout propos ayant pour objectif de provoquer, diffamer, insulter, d\'oppression, ségrégatif ou à caractère sexuel sont interdits. \n ● Les sujets de discussion relatifs à la religion, aux stupéfiants ainsi qu’aux pratiques illégales sont interdits. \n ● La publicité est interdite. \n ● La tentative et l’incitation à une infraction sont puni au même titre que celle-ci. \n \n Tout contournement de sanction ou de limitation est répréhensible. \nㅤ' },
    { name: '💬 | **Réglement Écrit**', value: '● Le spam, le flood, l’utilisation abusive de majuscules, d\'emojis et de gifs sont interdits. \n ● Le serveur est fréquenté par des mineurs, veuillez donc les respecter, ne pas poster de messages, photos, liens à caractère pornographique ou faisant la promotion de pratiques illégales. \n ● Les mentions abusives ainsi que la mention d’administration sont interdites \nㅤ'},
    { name: '🔊 | **Réglement Vocal**', value: '● L\'utilisation de Soundboard, modificateur de voix, le fait de crier, faire des screamers, flood est strictement interdit. \n ● Il est interdit de spammer les salons vocaux ( changer de salon de façon très rapide et volontaire ). \n ● Enregistrer toute conversation audio est strictement interdit même avec une autorisation. \nㅤㅤ' },
    )
    .setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

    message.channel.send(rulesEmbed)


};

module.exports.infos = {
	name: ['CmRB5xRk@N3$Jd=S'],
};

