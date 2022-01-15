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

    // Run command
    try {

        // Check if account exists
        try {
            // Accessing REST API through Axios
            trackerProfile = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/" + `${playerID}`)
            trackerMatch = await axios.get("https://api.tracker.gg/api/v2/valorant/rap-matches/riot/" + `${playerID}`)

        } catch (error) {
            console.error(error)
            return message.lineReply("VALORANT Tracker est actuellement en maintenance. Je ne suis pas en mesure de récupérer vos statistiques.")
        }

        const profileStats = trackerProfile.data.data.segments


        for (x = 0; x < profileStats.length; x++) {
            if (profileStats[x].metadata.name == 'Competitive' && profileStats[x].type == 'playlist')
                var compStats = profileStats[x].stats // Access overall comp stats
        }
    
        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle // Username and tag
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl // Avatar image
        const lastMatch = trackerMatch.data.data.matches[0] // Last match info

        lastAgent = lastMatch.segments[0].metadata.agentName

        // Set agent emoji for the user

        var agentEmoji = ":white_small_square:"

        if (lastAgent == "Astra" || lastAgent == "Breach" || lastAgent == "Brimstone" || lastAgent == "Cypher" || lastAgent == "Jett"
        || lastAgent == "Killjoy" || lastAgent == "Omen" || lastAgent == "Phoenix" || lastAgent == "Raze" || lastAgent == "Reyna"
        || lastAgent == "Sage" || lastAgent == "Skye" || lastAgent == "Sova" || lastAgent == "Viper" || lastAgent == "Yoru" || lastAgent == "KAY/O" || lastAgent == "Neon") {
        agentEmoji = assets.agentEmojis[lastAgent].emoji
    }

        // Check if user never played a competitive game
        if (!compStats) return message.lineReply('There are no agents to track. This player has never played a competitive game!')

        agentInfo = []
        // Get all agents the player played
        for (x = 0; x < profileStats.length; x++ && profileStats.type === 'agent') {
            if (profileStats[x].type === 'agent') {
                agentInfo.push([profileStats[x].metadata.name, profileStats[x].stats.timePlayed.value, profileStats[x].stats.timePlayed.displayValue,
                    profileStats[x].stats.kills.displayValue, profileStats[x].stats.deaths.displayValue, profileStats[x].stats.assists.displayValue,
                    profileStats[x].stats.kDRatio.displayValue, profileStats[x].stats.damagePerRound.displayValue, profileStats[x].stats.matchesWinPct.displayValue
                ])
            }
        }

        agentInfo.sort(function (a, b) {
            return b[1] - a[1]
        }) // Sort agents by playtime

        // Limit maximum amount of agents to show as 5
        agentLength = agentInfo.length
        if (agentLength > 5)
            agentLength = 5

        const agentEmbed = new MessageEmbed()
            .setColor('#045668')
            .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            .setThumbnail(userAvatar)
            .setDescription("```grey\n      " + "      Top " + agentLength + " - Agents les plus joués" + "\n```")
            .setFooter('Agents en Compétition seulement')

        for (i = 0; i < agentLength; i++) {

            let agentName = agentInfo[i][0]
            let timePlayed = agentInfo[i][2]
            let kills = agentInfo[i][3]
            let deaths = agentInfo[i][4]
            let assists = agentInfo[i][5]
            let kdr = agentInfo[i][6]
            let dmg = agentInfo[i][7]
            let winRate = agentInfo[i][8]

            var agentEmoji = ":white_small_square:"

            if (agentName == "Astra" || agentName == "Breach" || agentName == "Brimstone" || agentName == "Cypher" || agentName == "Jett" ||
                agentName == "Killjoy" || agentName == "Omen" || agentName == "Phoenix" || agentName == "Raze" || agentName == "Reyna" ||
                agentName == "Sage" || agentName == "Skye" || agentName == "Sova" || agentName == "Viper" || agentName == "Yoru" || agentName == "KAY/O" || agentName == "Neon") {
                var agentEmoji = assets.agentEmojis[agentName].emoji
            }

            agentEmbed.addFields({
                name: agentName + " " + agentEmoji + "     |     " + timePlayed +
                    "     |     Taux de victoire: " + parseInt(winRate).toFixed(0) + "%",
                value: "```yaml\nK:" +
                    kills + " / M:" + deaths + " / A:" + assists + " / KD:" + parseFloat(kdr).toFixed(2) +
                    " | DMG/R: " + parseInt(dmg).toFixed(0) + "\n```",
                inline: false
            }, )
        }

        message.lineReply(agentEmbed)

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['agents', 'agent'],
};