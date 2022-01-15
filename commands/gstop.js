const ms = require('ms');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(':x: | Vous n\'avez pas les permissions d\'arrêter un giveaway.');
    }


    if (!args[0]) {
        return message.channel.send(':x: | Vous devez spécifier l\'id d\'un message valide!');
    }


    let giveaway =

        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);


    if (!giveaway) {
        return message.channel.send('Impossible de trouvé le giveaway `' + args.join(' ') + '`.');
    }


    client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })

        .then(() => {

            message.channel.send('Le Giveaway se terminera dans moins de ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' secondes...');
        })
        .catch((e) => {
            if (e.startsWith(`Giveaway avec l\'ID de message ${giveaway.messageID} est déjà terminé.`)) {
                message.channel.send('Ce giveaway est déjà terminé!');
            } else {
                console.error(e);
                message.channel.send('Une erreur...');
            }
        });

};

module.exports.infos = {
    name: ['gstop'],
};