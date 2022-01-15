const ms = require('ms');

module.exports.run = async (client, message, args) => {


    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(':x: | Vous n\'avez pas les permissions de reroll un giveaway.');
    }


    if (!args[0]) {
        return message.channel.send(':x: | Vous devez spécifier l\'id d\'un message valide!');
    }


    let giveaway =

        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);


    if (!giveaway) {
        return message.channel.send('Impossible de trouver un giveaway `' + args.join(' ') + '`.');
    }


    client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {

            message.channel.send('Giveaway reroll!');
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway avec l\'id de message ${giveaway.messageID} n\'est pas terminé.`)) {
                message.channel.send('Ce giveaway n\'est pas fini');
            } else {
                console.error(e);
                message.channel.send('Une erreur...');
            }
        });

    client.giveawaysManager
        .reroll(messageID, {
            messages: {
                congrat: ':tada: Nouveau(x) gagnant(s) : {winners}! Bravo!\n{messageURL}',
                error: 'Aucun participant, aucun gagnant n\'a pu être choisi!'
            }
        })
        .catch((err) => {
            message.channel.send('Aucun giveaway trouvé  pour ' + messageID + ', vérifier et réesayez');
        });


};

module.exports.infos = {
    name: ['greroll'],
};