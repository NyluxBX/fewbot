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

        const profileStats = trackerProfile.data.data.segments // Access profile stats

        // Checking users playlist stats
        for (x = 0; x < profileStats.length; x++) {
            if (profileStats[x].metadata.name == 'Competitive' && profileStats[x].type == 'playlist')
                var compStats = profileStats[x].stats // Access overall comp stats
        }

        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle // Username and tag
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl // Avatar image
        const lastMatch = trackerMatch.data.data.matches[0] // Last match info
        const lmStats = lastMatch.segments[0].stats // Statistiques de la dernière partie for the player
        const matchID = lastMatch.attributes.id // Match ID
        const mapStats = trackerMap.data.data // Map stats
        const weaponStats = trackerWeapon.data.data // Weapon stats
    
        // Set rank emojis and name
        rankName = ''
        rankEmoji = ''
        if (compStats) {
            rankName = compStats.rank.metadata.tierName
            rankEmoji = assets.rankEmojis[rankName].emoji
            if (rankName.includes('Immortal')) {
                rankName = rankName.split(' ')[0] + ' #' + compStats.rank.rank;
            }
            else if (rankName.includes('Radiant')) {
                rankName = rankName + ' #' + compStats.rank.rank;
            }
        }
    
        lastAgent = lastMatch.segments[0].metadata.agentName
    
        // Set agent emoji for the user
        agentEmoji = ":white_small_square:"
    
        if (lastAgent == "Astra" || lastAgent == "Breach" || lastAgent == "Brimstone" || lastAgent == "Cypher" || lastAgent == "Jett"
            || lastAgent == "Killjoy" || lastAgent == "Omen" || lastAgent == "Phoenix" || lastAgent == "Raze" || lastAgent == "Reyna"
            || lastAgent == "Sage" || lastAgent == "Skye" || lastAgent == "Sova" || lastAgent == "Viper" || lastAgent == "Yoru" || lastAgent == "KAY/O" || lastAgent == "Neon") {
            agentEmoji = assets.agentEmojis[lastAgent].emoji
        }

        // Check last match mode
        if (lastMatch.metadata.modeName === 'Unknown') return message.reply("This player has played a Valorant gamemode that I am unable to track!")

        // Access last match info
        try {
            matchInfo = await axios.get("https://api.tracker.gg/api/v2/valorant/rap-matches/" + `${matchID}`)
        } catch (error) {
            return message.reply("Il n'y a pas de match à récupérer, réessayez plus tard.")
        }

        const lastMap = lastMatch.metadata.mapName // Map name

        // 2D Arrays
        playerMatchInfo = [] // All players
        redTeam = [] // Team A
        blueTeam = [] // Team B

        // Check if last match was a deathmatch game
        if (lastMatch.metadata.modeName === 'Deathmatch') {

            // Get the 14 players
            for (x = 14; x < 28; x++) {
                playerName = matchInfo.data.data.segments[x].attributes.platformUserIdentifier
                playerAgent = matchInfo.data.data.segments[x].metadata.agentName
                playerScore = matchInfo.data.data.segments[x].stats.score.value
                playerKills = matchInfo.data.data.segments[x].stats.kills.displayValue
                playerDeaths = matchInfo.data.data.segments[x].stats.deaths.displayValue
                playerAssists = matchInfo.data.data.segments[x].stats.assists.displayValue
                playerKDR = matchInfo.data.data.segments[x].stats.kdRatio.displayValue

                // Add information to array
                playerMatchInfo.push([playerName, playerAgent, playerScore, playerKills, playerDeaths, playerAssists, playerKDR])
            }

            playerMatchInfo.sort(function (a, b) {
                return b[3] - a[3]
            }) // Sort players by kills

            if (lastMap != 'Bind' && lastMap != 'Split' && lastMap != 'Haven' && lastMap != 'Ascent' && lastMap != 'Icebox' && lastMap != 'Breeze' && lastMap != 'Fracture') {
                var mapImage = assets.maps['Unknown'].img
            } else {
                var mapImage = assets.maps[lastMap].img // Set map image
            }
            var deathmatchEmoji = assets.modeEmojis[lastMatch.metadata.modeName].emoji

            // Placement text formatting
            if (lmStats.placement.displayValue === '1')
                lmStats.placement.displayValue = '1st'
            else if (lmStats.placement.displayValue === '2')
                lmStats.placement.displayValue = '2nd'
            else if (lmStats.placement.displayValue === '3')
                lmStats.placement.displayValue = '3rd'
            else
                lmStats.placement.displayValue = lmStats.placement.displayValue + 'th'

            // Embed
            const deathmatchEmbed = new MessageEmbed()
                .setColor('#045668')
                .setTitle('Statistiques de la dernière partie - ' + lastMap + " " + deathmatchEmoji)
                .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
                .setThumbnail(lastMatch.segments[0].metadata.agentImageUrl)
                .setDescription("`" + lastMatch.metadata.timestamp + "`")
                .setDescription("```\n     " + lastMatch.metadata.modeName + " - " + lmStats.playtime.displayValue + "\n```")
                .setImage(mapImage)
                .setFooter("You placed " + lmStats.placement.displayValue)

            var count = 0 // Count columns for embed format

            for (x = 0; x < playerMatchInfo.length; x++) {

                let name = playerMatchInfo[x][0]
                let agent = playerMatchInfo[x][1]
                let score = playerMatchInfo[x][2]
                let kills = playerMatchInfo[x][3]
                let deaths = playerMatchInfo[x][4]
                let assists = playerMatchInfo[x][5]

                var username = name.split('#', 2) // Username without tag

                var playerAgentEmoji = ":white_small_square:"

                if (agent == "Astra" || agent == "Breach" || agent == "Brimstone" || agent == "Cypher" || agent == "Jett" ||
                    agent == "Killjoy" || agent == "Omen" || agent == "Phoenix" || agent == "Raze" || agent == "Reyna" ||
                    agent == "Sage" || agent == "Skye" || agent == "Sova" || agent == "Viper" || agent == "Yoru" || agent == "KAY/O" || agent == "Neon") {
                    var playerAgentEmoji = assets.agentEmojis[agent].emoji // Set emoji to played agent
                }

                count++

                deathmatchEmbed.addFields({
                    name: username[0] + playerAgentEmoji,
                    value: "```yaml\nPts: " + score + "     \n" +
                        kills + " / " + deaths + " / " + assists + "\n```",
                    inline: true
                }, )

                // For 2 column formatting
                if (count == 2) {
                    deathmatchEmbed.addField('\u200B', '\u200B', true)
                    count = 0
                }
            }

            return message.channel.send(deathmatchEmbed) // Send embed
        }
        // Get info about players in last match
        for (x = 2; x < 12; x++) {
            playerName = matchInfo.data.data.segments[x].attributes.platformUserIdentifier
            playerKills = matchInfo.data.data.segments[x].stats.kills.displayValue
            playerDeaths = matchInfo.data.data.segments[x].stats.deaths.displayValue
            playerAssists = matchInfo.data.data.segments[x].stats.assists.displayValue
            playerKDR = matchInfo.data.data.segments[x].stats.kdRatio.displayValue
            playerACS = matchInfo.data.data.segments[x].stats.scorePerRound.displayValue
            playerTeam = matchInfo.data.data.segments[x].metadata.teamId
            playerAgent = matchInfo.data.data.segments[x].metadata.agentName
            playerRank = matchInfo.data.data.segments[x].stats.rank.displayValue

            // Add information to a 2D array
            playerMatchInfo.push([playerName, playerAgent, playerRank, playerKills, playerDeaths, playerAssists, playerKDR, playerACS, playerTeam])
        }

        // Separate both teams
        for (x = 0; x < playerMatchInfo.length; x++) {
            if (playerMatchInfo[x][8] == 'Red')
                redTeam.push(playerMatchInfo[x])
            if (playerMatchInfo[x][8] == 'Blue')
                blueTeam.push(playerMatchInfo[x])
        }

        // Text format
        if (lastMatch.segments[0].metadata.result == 'victory') {
            lastMatch.segments[0].metadata.result = 'Victoire'
            if (lastMap != 'Bind' && lastMap != 'Split' && lastMap != 'Haven' && lastMap != 'Ascent' && lastMap != 'Icebox' && lastMap != 'Breeze' && lastMap != 'Fracture') {
                var mapImage = assets.maps['Unknown'].imgWon
            } else {
                var mapImage = assets.maps[lastMap].imgWon
            }
        } else if (lastMatch.segments[0].metadata.result == 'defeat') {
            if (lmStats.roundsWon.value == lmStats.roundsLost.value) {
                lastMatch.segments[0].metadata.result == 'Égalité'
                if (lastMap != 'Bind' && lastMap != 'Split' && lastMap != 'Haven' && lastMap != 'Ascent' && lastMap != 'Icebox' && lastMap != 'Breeze' && lastMap != 'Fracture') {
                    var mapImage = assets.maps['Unknown'].imgDraw
                } else {
                    var mapImage = assets.maps[lastMap].imgDraw
                }
            } else {
                lastMatch.segments[0].metadata.result = 'Défaite'
                if (lastMap != 'Bind' && lastMap != 'Split' && lastMap != 'Haven' && lastMap != 'Ascent' && lastMap != 'Icebox' && lastMap != 'Breeze' && lastMap != 'Fracture') {
                    var mapImage = assets.maps['Unknown'].imgLost
                } else {
                    var mapImage = assets.maps[lastMap].imgLost
                }
            }
        }

        // Text format
        if (lastMatch.metadata.modeName == 'Normal')
            lastMatch.metadata.modeName = 'Non classé'

        // Score
        greenSquare = Math.round(lmStats.roundsWon.displayValue)
        redSquare = Math.round(lmStats.roundsLost.displayValue)
        scoreVisualized = "<:greenline:931658600538075166>".repeat(greenSquare) + "\n" + "<:redline:931658681504899162>".repeat(redSquare)

        redTeam.sort(function (a, b) {
            return b[7] - a[7]
        }) // Sort team players by ACS
        blueTeam.sort(function (a, b) {
            return b[7] - a[7]
        }) // Sort team players by ACS

        var time = lastMatch.metadata.timestamp
        var timeStamp = time.split('T', 2) // Get date of match

        var modeEmoji = assets.modeEmojis[lastMatch.metadata.modeName].emoji // Setting emoji for gamemode

        const lastMatchEmbed1 = new MessageEmbed()

        // Competitive game embed
        if (lastMatch.metadata.modeName === 'Competitive') {
            lastMatchEmbed1.setColor('#045668')
            lastMatchEmbed1.setTitle('Statistiques de la dernière partie - ' + lastMap)
            lastMatchEmbed1.setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            lastMatchEmbed1.setThumbnail(lastMatch.segments[0].metadata.agentImageUrl)
            lastMatchEmbed1.setDescription("`              " + timeStamp[0] + "             `")
            lastMatchEmbed1.addFields({
                name: 'Mode ' + modeEmoji,
                value: "```yaml\n" + "Compétiton" + "\n```",
                inline: true
            }, {
                name: 'Durée',
                value: "```yaml\n" + lmStats.playtime.displayValue + "\n```",
                inline: true
            }, {
                name: 'Rank' + rankEmoji + "               K / D / A              KDR",
                value: "```grey\n" + lmStats.rank.metadata.tierName +
                    "    " + lmStats.kills.displayValue + "/" + lmStats.deaths.displayValue + "/" + lmStats.assists.displayValue +
                    "      " + lmStats.kdRatio.displayValue + "\n```",
                inline: false
            }, {
                name: 'Combat Scorr',
                value: "```yaml\n" + lmStats.score.displayValue + "\n```",
                inline: true
            }, {
                name: 'ACS',
                value: "```yaml\n" + lmStats.scorePerRound.displayValue + "\n```",
                inline: true
            }, {
                name: 'Score ECO',
                value: "```yaml\n" + lmStats.econRating.displayValue + "\n```",
                inline: true
            }, {
                name: '% Headshot',
                value: "```yaml\n" + lmStats.headshotsPercentage.displayValue + "%\n```",
                inline: true
            }, {
                name: 'Premiers sang',
                value: "```yaml\n" + lmStats.firstBloods.displayValue + "\n```",
                inline: true
            }, {
                name: 'Score',
                value: scoreVisualized + "```yaml\n             " + lmStats.roundsWon.displayValue + " - " +
                    lmStats.roundsLost.displayValue + "\n```",
                inline: false
            }, )
            lastMatchEmbed1.setImage(mapImage)
        }

        // Other gamemode embeds
        else {
            lastMatchEmbed1.setColor('#045668')
            lastMatchEmbed1.setTitle('Statistiques de la dernière partie - ' + lastMap)
            lastMatchEmbed1.setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            lastMatchEmbed1.setThumbnail(lastMatch.segments[0].metadata.agentImageUrl)
            lastMatchEmbed1.setDescription("`" + lastMatch.metadata.timestamp + "`")
            lastMatchEmbed1.addFields({
                name: 'Mode ' + modeEmoji,
                value: "```yaml\n" + lastMatch.metadata.modeName + "\n```",
                inline: true
            }, {
                name: 'Durée',
                value: "```yaml\n" + lmStats.playtime.displayValue + "\n```",
                inline: true
            }, {
                name: '\u200B',
                value: '\u200B',
                inline: true
            }, {
                name: 'K / D / A',
                value: "```yaml\n" + lmStats.kills.displayValue + "/" + lmStats.deaths.displayValue +
                    "/" + lmStats.assists.displayValue + "\n```",
                inline: true
            }, {
                name: 'KDR',
                value: "```yaml\n" + lmStats.kdRatio.displayValue + "\n```",
                inline: true
            }, {
                name: 'ACS',
                value: "```yaml\n" + lmStats.scorePerRound.displayValue + "\n```",
                inline: true
            }, {
                name: 'Score ECO',
                value: "```yaml\n" + lmStats.econRating.displayValue + "\n```",
                inline: true
            }, {
                name: '% Headshot',
                value: "```yaml\n" + lmStats.headshotsPercentage.displayValue + "%\n```",
                inline: true
            }, {
                name: 'Score',
                value: scoreVisualized + "```yaml\n             " + lmStats.roundsWon.displayValue +
                    " - " + lmStats.roundsLost.displayValue + "\n```",
                inline: false
            }, )
            lastMatchEmbed1.setImage(mapImage)
        }

        const lastMatchEmbed2 = new MessageEmbed()
            .setColor('#045668')
            .setTitle('Statistiques de la dernière partie - ' + lastMap + " | " + lmStats.roundsWon.displayValue + " - " + lmStats.roundsLost.displayValue)
            .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
            .setDescription('```\n             Joueurs dans votre partie\n```')

        var count = 0

        for (x = 0; x < playerMatchInfo.length / 2; x++) {

            let nameA = blueTeam[x][0]
            let agentA = blueTeam[x][1]
            let rankA = blueTeam[x][2]
            let killsA = blueTeam[x][3]
            let deathsA = blueTeam[x][4]
            let assistsA = blueTeam[x][5]
            let kdrA = blueTeam[x][6]
            let acsA = blueTeam[x][7]

            let nameB = redTeam[x][0]
            let agentB = redTeam[x][1]
            let rankB = redTeam[x][2]
            let killsB = redTeam[x][3]
            let deathsB = redTeam[x][4]
            let assistsB = redTeam[x][5]
            let kdrB = redTeam[x][6]
            let acsB = redTeam[x][7]

            var playerAgentEmojiA = ":white_small_square:"
            var playerAgentEmojiB = ":white_small_square:"

            if (agentA == "Astra" || agentA == "Breach" || agentA == "Brimstone" || agentA == "Cypher" || agentA == "Jett" ||
                agentA == "Killjoy" || agentA == "Omen" || agentA == "Phoenix" || agentA == "Raze" || agentA == "Reyna" ||
                agentA == "Sage" || agentA == "Skye" || agentA == "Sova" || agentA == "Viper" || agentA == "Yoru" || agentA == 'KAY/O' || agentA == "Neon") {
                var playerAgentEmojiA = assets.agentEmojis[agentA].emoji
            }
            var playerRankEmojiA = assets.rankEmojis[rankA].emoji

            if (agentB == "Astra" || agentB == "Breach" || agentB == "Brimstone" || agentB == "Cypher" || agentB == "Jett" ||
                agentB == "Killjoy" || agentB == "Omen" || agentB == "Phoenix" || agentB == "Raze" || agentB == "Reyna" ||
                agentB == "Sage" || agentB == "Skye" || agentB == "Sova" || agentB == "Viper" || agentB == "Yoru" || agentB == 'KAY/O' || agentB == "Neon") {
                var playerAgentEmojiB = assets.agentEmojis[agentB].emoji

            }
            var playerRankEmojiB = assets.rankEmojis[rankB].emoji

            count++

            lastMatchEmbed2.addFields({
                name: nameA + " " + playerAgentEmojiA + " " + playerRankEmojiA,
                value: "```yaml\nK / D / A / R   | ACS\n" +
                    killsA + " / " + deathsA + " / " + assistsA + " / " + kdrA + " | " + parseInt(acsA).toFixed(0) + "\n```",
                inline: true
            }, {
                name: nameB + " " + playerAgentEmojiB + " " + playerRankEmojiB,
                value: "```fix\nK / D / A / R   | ACS\n" +
                    killsB + " / " + deathsB + " / " + assistsB + " / " + kdrB + " | " + parseInt(acsB).toFixed(0) + "\n```",
                inline: true
            }, )

            // For 2 column formatting
            if (count == 1) {
                lastMatchEmbed2.addField('\u200B', '\u200B', true)
                count = 0
            }
        }

        const lastMatchPages = [lastMatchEmbed1, lastMatchEmbed2] // Pages

        const flipPage = ["⬅️", "➡️"] // Flip pages

        const timeout = '100000' // Timeout

        pagination(message, lastMatchPages, flipPage, timeout) // Send pages

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['lm', 'lastmatch'],
};