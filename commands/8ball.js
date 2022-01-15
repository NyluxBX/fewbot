const Discord = require('discord.js');



module.exports.run = async (client, message, args) => {
    message.delete();
    if(!args) return message.channel.send('Vous n\'avez pas indiqué de question..');

    function doMagic8BallVoodoo() {
        var rand = ['Essaye plus tard', 'Essaye encore', 'Pas d\'avis', 'C\'est ton destin', 'Le sort en est jeté', 'Une chance sur deux', 'Repose ta question', 'D\'après moi oui', 'C\'est certain', 'Oui absolument', 'Tu peux compter dessus', 'Sans aucun doute', 'Très probable', 'Oui', 'C\'est bien parti', 'C\'est non', 'Peu probable', 'Faut pas rêver', 'N\'y compte pas', 'Impossible'];
    
        return rand[Math.floor(Math.random()*rand.length)];
    }

    let saytext = args.join(" ");
    
    const SuggestionEmbed = new Discord.MessageEmbed()
    .setColor('#1C004A')
    .setTitle('8Ball')
    .addFields(
        {name: '❓ Question', value: saytext},
        {name: '❕ Réponse', value: doMagic8BallVoodoo()},
    )
    .setTimestamp()
    .setFooter(`Commande exécutée par ${message.author.username}`, message.author.displayAvatarURL());

    message.channel.send(SuggestionEmbed)

};

module.exports.infos = {
    name: ['8ball'],
};