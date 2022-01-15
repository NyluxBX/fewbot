const {
    MessageEmbed,
    Message
} = require('discord.js');
const pagination = require('discord.js-pagination')
const assets = require('../assets.json')
const axios = require('axios').default;
const Account = require('../schemas/AccountSchema')

module.exports.run = async (client, message, args, commande) => {

    let str = args[0];
    for (i = 1; i < args.length; i++)
        str += args[i];

    const account = await Account.find({
        discordId: message.author.id
    })

    if (!args[0] && account.length > 0)
        str = account[0].valorantAccount

    else if (message.content.includes('@')) {
        try {
            taggedAccount = await Account.find({
                discordId: (message.mentions.users.first().id)
            })
            str = taggedAccount[0].valorantAccount
        } catch (error) {
            return message.lineReply('Le joueur que vous avez mentionné n\'a pas son compte Valorant lié.!')
        }
    } else if (!args[0])
        return message.lineReply('Veuillez inclure votre nom d\'utilisateur VALORANT et votre tag (PSEUDO#TAG)\n' +
            'Vous pouvez lier un compte VALORANT à votre ID Discord en utilisant la commande f!link..')

    let ID = str.toLowerCase();

    if (ID.includes('#'))
        playerID = encodeURIComponent(ID)
    else
        playerID = ID

    try {

        try {

            trackerProfile = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/" + `${playerID}`)

        } catch (error) {
            console.error(error)
            return message.lineReply("Valorant Tracker est actuellement en maintenance. Je ne suis pas en mesure de récupérer vos statistiques.")
        }

        const profileStats = trackerProfile.data.data.segments // Access profile stats

        // Checking users playlist stats
        for (x = 0; x < profileStats.length; x++) {
            if (profileStats[x].metadata.name == 'Competitive' && profileStats[x].type == 'playlist')
                var compStats = profileStats[x].stats // Access overall comp stats
        }

        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl

        rankName = ''
        rankEmoji = ''
        if (compStats) {
            rankName = compStats.rank.metadata.tierName
            rankEmoji = assets.rankEmojis[rankName].emoji
            if (rankName.includes('Immortal')) {
                rankName = rankName.split(' ')[0] + ' #' + compStats.rank.rank;
            } else if (rankName.includes('Radiant')) {
                rankName = rankName + ' #' + compStats.rank.rank;
            }
        }

        if (!compStats) return message.lineReply('Ce joueur n\'a jamais joué en compétif!')

                greenSquare = Math.round(compStats.matchesWinPct.value / 8.33)
                redSquare = 12 - greenSquare

                winRate = "<:greenline:931658600538075166>".repeat(greenSquare) + "<:redline:931658681504899162>".repeat(redSquare)

                const statsEmbed1 = new MessageEmbed()
                    .setColor('#045668')
                    .setTitle(`Statistisques de Compétition`)
                    .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
                    .setThumbnail(userAvatar)
                    .addFields(
                        { name: 'KDR', value: "```yaml\n" + compStats.kDRatio.displayValue + "\n```", inline: true },
                        { name: 'KDA ', value: "```yaml\n" + compStats.kDARatio.displayValue + "\n```", inline: true },
                        { name: 'Rank ' + rankEmoji, value: "```grey\n" + rankName + "\n```", inline: true },
                        { name: 'Kills', value: "```yaml\n" + compStats.kills.displayValue + "\n```", inline: true },
                        { name: 'Morts', value: "```yaml\n" + compStats.deaths.displayValue + "```", inline: true },
                        { name: 'Assistances', value: "```yaml\n" + compStats.assists.displayValue + "\n```", inline: true },
                        { name: 'Record de Kills', value: "```yaml\n" + compStats.mostKillsInMatch.displayValue + "\n```", inline: true },
                        { name: 'Temps de jeu', value: "```yaml\n" + compStats.timePlayed.displayValue + "\n```", inline: true },
                        {
                            name: 'Taux de victoire - ' + compStats.matchesWinPct.displayValue, value: winRate + " ```yaml\n" + "    V: "
                                + compStats.matchesWon.displayValue + "   |   D: " + compStats.matchesLost.displayValue + "\n```", inline: false
                        },
                    )

                const statsEmbed2 = new MessageEmbed()
                    .setColor('#045668')
                    .setTitle(`Statistisques de Compétition`)
                    .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
                    .setThumbnail(userAvatar)
                    .addFields(
                        { name: 'Kills/Match', value: "```yaml\n" + compStats.killsPerMatch.displayValue + "\n```", inline: true },
                        { name: 'Morts/Match ', value: "```yaml\n" + compStats.deathsPerMatch.displayValue + "\n```", inline: true },
                        { name: 'Assistances/Match', value: "```yaml\n" + compStats.assistsPerMatch.displayValue + "\n```", inline: true },
                        { name: '% Headshot', value: "```yaml\n" + compStats.headshotsPercentage.displayValue + "%\n```", inline: true },
                        { name: 'DMG/Round', value: "```yaml\n" + compStats.damagePerRound.displayValue + "\n```", inline: true },
                        { name: 'Score de Combat Moyen', value: "```yaml\n" + compStats.scorePerRound.displayValue + "\n```", inline: true },
                        { name: 'Spike plantés', value: "```yaml\n" + compStats.plants.displayValue + "\n```", inline: true },
                        { name: 'Spike désamorcés', value: "```yaml\n" + compStats.defuses.displayValue + "\n```", inline: true },
                        { name: 'Score d\'Eco Moyen', value: "```yaml\n" + compStats.econRatingPerMatch.displayValue + "\n```", inline: true },
                        { name: 'Aces', value: "```yaml\n" + compStats.aces.displayValue + "\n```", inline: true },
                        { name: 'Premier Sang', value: "```yaml\n" + compStats.firstBloods.displayValue + "\n```", inline: true },
                        { name: 'Première Mort', value: "```yaml\n" + compStats.deathsFirst.displayValue + "\n```", inline: true },
                    )

                const statsPages = [statsEmbed1, statsEmbed2] // Pages

                const flipPage = ["⬅️", "➡️"] // Reactions to flip pages

                const timeout = '100000' // Timeout

                pagination(message, statsPages, flipPage, timeout) // Show pages

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['comp', 'competition', 'stats'],
};

