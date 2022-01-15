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
            if (profileStats[x].metadata.name == 'Deathmatch' && profileStats[x].type == 'playlist')
            var dmStats = profileStats[x].stats
        }

        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl

        if (!dmStats) return message.reply('This player has never played a deathmatch game!')

        // Each square represents ~8.33%
        greenSquare = Math.round(dmStats.matchesWinPct.value / 8.33)
        redSquare = 12 - greenSquare

        // Setting the win rate visual bar
        winRate = "<:greenline:931658600538075166>".repeat(greenSquare) + "<:redline:931658681504899162>".repeat(redSquare)

        // Embed
        const deathmatchEmbed = new MessageEmbed()
            .setColor('#045668')
            .setTitle(`Statistiques en Match à mort`)
            .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            .setThumbnail(userAvatar)
            .addFields(
                { name: 'KDR', value: "```yaml\n" + dmStats.kDRatio.displayValue + "\n```", inline: true },
                { name: 'KDA ', value: "```yaml\n" + dmStats.kDARatio.displayValue + "\n```", inline: true },
                { name: 'KAD ', value: "```yaml\n" + dmStats.kADRatio.displayValue + "\n```", inline: true },
                { name: 'Kills', value: "```yaml\n" + dmStats.kills.displayValue + "\n```", inline: true },
                { name: 'Morts', value: "```yaml\n" + dmStats.deaths.displayValue + "```", inline: true },
                { name: 'Assistances', value: "```yaml\n" + dmStats.assists.displayValue + "\n```", inline: true },
                //{ name: 'Headshot %', value: "```yaml\n" + dmStats.headshotsPercentage.displayValue + "%\n```", inline: true },
                { name: 'Temps de jeu', value: "```yaml\n" + dmStats.timePlayed.displayValue + "\n```", inline: true },
                {
                    name: 'Taux de victoire - ' + dmStats.matchesWinPct.displayValue, value: winRate + " ```yaml\n" + "    V: "
                        + dmStats.matchesWon.displayValue + "   |   D: " + dmStats.matchesLost.displayValue + "\n```", inline: false
                },
            )

        message.lineReply(deathmatchEmbed) // Send embed

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['dm', 'deathmatch'],
};

