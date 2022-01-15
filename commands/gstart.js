const ms = require('ms');

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel.send(':x: | Vous n\'avez pas les permissions de créer un giveaway.');
    }


    let giveawayChannel = message.mentions.channels.first();

    if (!giveawayChannel) {
        return message.channel.send(':x: | Vous devez mentionner un salon valide! (?gstart [channel] [durée] [nombre de gagnants] [récompense])');
    }


    let giveawayDuration = args[1];

    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send(':x: | Vous devez spécifier une durée valide! (?gstart [channel] [durée] [nombre de gagnants] [récompense])');
    }


    let giveawayNumberWinners = args[2];

    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
        return message.channel.send(':x: | Vous devez spécifier un nombre de gagnant(s) valide! (?gstart [channel] [durée] [nombre de gagnants] [récompense])');
    }


    let giveawayPrize = args.slice(3).join(' ');

    if (!giveawayPrize) {
        return message.channel.send(':x: | Vous devez spécifier une récompense valide! (?gstart [channel] [durée] [nombre de gagnants] [récompense])');
    }


    client.giveawaysManager.start(giveawayChannel, {

        time: ms(giveawayDuration),

        prize: giveawayPrize,

        winnerCount: parseInt(giveawayNumberWinners),

        hostedBy: message.author,

        messages: {
            giveaway: "",
            giveawayEnded: "",
            timeRemaining: "Temps restant: **{duration}**!",
            inviteToParticipate: "Réagis avec 🎉 pour participer!",
            winMessage: "Bravo, {winners}! Tu gagnes **{prize}**!",
            embedFooter: "🌙 𝐅𝐨𝐫𝐧𝐨𝐱 𝐏𝐚𝐫𝐚𝐝𝐢𝐬𝐞 🌙",
            noWinner: "Giveaway annulé, pas de participation valide.",
            hostedBy: "Hébergé par: {user}",
            winners: "gagnant(s)",
            endedAt: "Fini le",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway commencé dans ${giveawayChannel}!`);

};

module.exports.infos = {
    name: ['gstart'],
};