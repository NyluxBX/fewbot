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
            'Vous pouvez lier un compte VALORANT à votre ID Discord en utilisant la commande v!link..')

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
            if (profileStats[x].metadata.name == 'Spike Rush' && profileStats[x].type == 'playlist')
                var spikeRushStats = profileStats[x].stats // Access overall spike rush stats
        }

        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl

        if (!spikeRushStats) return message.reply('Ce joueur n\'as jamais joué en Spike Rush!')

        // Each square represents ~8.33%
        greenSquare = Math.round(spikeRushStats.matchesWinPct.value / 8.33)
        redSquare = 12 - greenSquare

        // Setting the win rate visual bar
        winRate = "<:greenline:931658600538075166>".repeat(greenSquare) + "<:redline:931658681504899162>".repeat(redSquare)

        // Embed page 1
        const spikeRushEmbed1 = new MessageEmbed()
            .setColor('#045668')
            .setTitle(`Statistiques en Spike Rush`)
            .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            .setThumbnail(userAvatar)
            .addFields(
                { name: 'KDR', value: "```yaml\n" + spikeRushStats.kDRatio.displayValue + "\n```", inline: true },
                { name: 'KDA', value: "```yaml\n" + spikeRushStats.kDARatio.displayValue + "\n```", inline: true },
                { name: 'KAD', value: "```yaml\n" + spikeRushStats.kADRatio.displayValue + "\n```", inline: true },
                { name: 'Kills', value: "```yaml\n" + spikeRushStats.kills.displayValue + "\n```", inline: true },
                { name: 'Morts', value: "```yaml\n" + spikeRushStats.deaths.displayValue + "```", inline: true },
                { name: 'Assistances', value: "```yaml\n" + spikeRushStats.assists.displayValue + "\n```", inline: true },
                { name: 'Record de Kills', value: "```yaml\n" + spikeRushStats.mostKillsInMatch.displayValue + "\n```", inline: true },
                { name: 'Temps de jeu', value: "```yaml\n" + spikeRushStats.timePlayed.displayValue + "\n```", inline: true },
                {
                    name: 'Taux de victoire - ' + spikeRushStats.matchesWinPct.displayValue, value: winRate + " ```yaml\n" + "    V: "
                        + spikeRushStats.matchesWon.displayValue + "   |   D: " + spikeRushStats.matchesLost.displayValue + "\n```", inline: false
                },
            )

        // Embed page 2
        const spikeRushEmbed2 = new MessageEmbed()
            .setColor('#045668')
            .setTitle(`Statistiques en Spike Rush`)
            .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            .setThumbnail(userAvatar)
            .addFields(
                { name: 'Kills/Match', value: "```yaml\n" + spikeRushStats.killsPerMatch.displayValue + "\n```", inline: true },
                { name: 'Morts/Match ', value: "```yaml\n" + spikeRushStats.deathsPerMatch.displayValue + "\n```", inline: true },
                { name: 'Assistances/Match', value: "```yaml\n" + spikeRushStats.assistsPerMatch.displayValue + "\n```", inline: true },
                { name: '% Headshot', value: "```yaml\n" + spikeRushStats.headshotsPercentage.displayValue + "%\n```", inline: true },
                { name: 'DMG/Round', value: "```yaml\n" + spikeRushStats.damagePerRound.displayValue + "\n```", inline: true },
                { name: 'Aces', value: "```yaml\n" + spikeRushStats.aces.displayValue + "\n```", inline: true },
                { name: 'Spike plantés', value: "```yaml\n" + spikeRushStats.plants.displayValue + "\n```", inline: true },
                { name: 'Spike désamorcés', value: "```yaml\n" + spikeRushStats.defuses.displayValue + "\n```", inline: true },
                { name: '\u200B', value: "```yaml\n" + " " + "\n```", inline: true },
                { name: 'Premier Sang', value: "```yaml\n" + spikeRushStats.firstBloods.displayValue + "\n```", inline: true },
                { name: 'Première Mort', value: "```yaml\n" + spikeRushStats.deathsFirst.displayValue + "\n```", inline: true },
            )

        const spikeRushPages = [spikeRushEmbed1, spikeRushEmbed2] // Pages

        const flipPage = ["⬅️", "➡️"] // Flip pages

        const timeout = '100000' // Timeout

        pagination(message, spikeRushPages, flipPage, timeout) // Send pages

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['sr', 'spikerush'],
};

