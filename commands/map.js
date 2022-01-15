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
            trackerMatch = await axios.get("https://api.tracker.gg/api/v2/valorant/rap-matches/riot/" + `${playerID}`)
            trackerMap = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/" + `${playerID}` + '/segments/map')
            trackerWeapon = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/" + `${playerID}` + '/segments/weapon')

        } catch (error) {
            console.error(error)
            return message.lineReply("Valorant Tracker est actuellement en maintenance. Je ne suis pas en mesure de récupérer vos statistiques.")
        }

        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle // Username and tag
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl // Avatar image
        const mapStats = trackerMap.data.data // Map stats

        mapInfo = []
                for (x = 0; x < mapStats.length; x++) {

                    if (x != 4) { // Skip index 4, old Icebox
                        mapInfo.push([mapStats[x].metadata.name, mapStats[x].stats.timePlayed.displayValue,
                        mapStats[x].stats.matchesWon.value, mapStats[x].stats.matchesWon.displayValue,
                        mapStats[x].stats.matchesLost.value, mapStats[x].stats.matchesLost.displayValue,
                        mapStats[x].stats.matchesWinPct.value, mapStats[x].stats.matchesWinPct.displayValue])
                    }
                }

                const mapEmbed = new MessageEmbed()
                    .setColor('#045668')
                    .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
                    .setThumbnail(userAvatar)
                    .setDescription("```grey\n      " + "        Statistiques de Maps" + "\n```")
                    .setFooter('Map en Compétition')

                for (i = 0; i < mapInfo.length; i++) { // For all avaliable maps

                    greenSquare = parseInt((mapInfo[i][6] / 100) * 16)
                    redSquare = 16 - greenSquare
                    winRateVisualized = "<:greenline:931658600538075166>".repeat(greenSquare) + "<:redline:931658681504899162>".repeat(redSquare)

                    let mapName = mapInfo[i][0]
                    let timePlayed = mapInfo[i][1]
                    let winRate = mapInfo[i][7]
                    let mapEmoji = '▫️'
                    // Implemented to prevent errors if new maps are released
                    if (mapName == 'Ascent' || mapName == 'Bind' || mapName == 'Breeze' || mapName == 'Haven' || mapName == 'Icebox' || mapName == 'Split' || mapName == 'Fracture')
                        mapEmoji = assets.mapEmojis[mapName].emoji

                    mapEmbed.addFields(
                        {
                            name: mapName + " " + mapEmoji + "    |    " + timePlayed + "    |    Taux de victoire: " + parseInt(winRate).toFixed(0) + "%",
                            value: winRateVisualized, inline: false
                        },
                    )
                }

                message.channel.send(mapEmbed)

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['map', 'maps'],
}

