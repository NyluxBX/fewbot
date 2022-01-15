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
            trackerWeapon = await axios.get("https://api.tracker.gg/api/v2/valorant/standard/profile/riot/" + `${playerID}` + '/segments/weapon')

        } catch (error) {
            console.error(error)
            return message.lineReply("VALORANT Tracker est actuellement en maintenance. Je ne suis pas en mesure de récupérer vos statistiques.")
        }


        const userHandle = trackerProfile.data.data.platformInfo.platformUserHandle // Username and tag
        const userAvatar = trackerProfile.data.data.platformInfo.avatarUrl // Avatar image
        const weaponStats = trackerWeapon.data.data // Weapon stats
        
        topWeapons = [] // Store weapons in a 2D array

                // Add information to weapons array
                for (x = 0; x < weaponStats.length; x++) {
                    weaponName = weaponStats[x].metadata.name
                    weaponKills = weaponStats[x].stats.kills.displayValue
                    weaponKillsValue = weaponStats[x].stats.kills.value
                    weaponDeathsBy = weaponStats[x].stats.deaths.displayValue
                    weaponHeadshotPct = weaponStats[x].stats.headshotsPercentage.displayValue
                    weaponDamageRound = weaponStats[x].stats.damagePerRound.displayValue
                    weaponFirstBloodCount = weaponStats[x].stats.firstBloods.displayValue
                    weaponLongestKillDistance = weaponStats[x].stats.longestKillDistance.value

                    topWeapons.push([weaponName, weaponKills, weaponKillsValue, weaponDeathsBy, weaponHeadshotPct,
                        weaponDamageRound, weaponFirstBloodCount, weaponLongestKillDistance])
                }

                topWeapons.sort(function (a, b) { return b[2] - a[2] }) // Sort weapons by kills

                // Top 5 weapons only
                weaponLength = topWeapons.length
                if (weaponLength > 5)
                    weaponLength = 5

                const weaponEmbed = new MessageEmbed()
                    .setColor('#045668')
                    .setAuthor(`${userHandle}`, userAvatar, `https://tracker.gg/valorant/profile/riot/${playerID}/overview`)
                    .setThumbnail(userAvatar)
                    .setDescription("```grey\n      " + "      Top " + weaponLength + " - Statistiques des Armes" + "\n```")
                    .setFooter('Competitive Weapons Only')

                for (i = 0; i < weaponLength; i++) {

                    let weaponName = topWeapons[i][0]
                    let weaponKills = topWeapons[i][1]
                    let weaponDeathsBy = topWeapons[i][3]
                    let weaponHeadshot = topWeapons[i][4]
                    let weaponDamage = topWeapons[i][5]
                    let weaponFirstBlood = topWeapons[i][6]
                    let weaponKillDistance = topWeapons[i][7]

                    weaponEmbed.addFields(
                        {
                            name: weaponName + "     |     Premiers sangs: " + weaponFirstBlood + "     |     "
                                + "Record de distance: " + parseInt(weaponKillDistance / 100).toFixed(0) + " m",
                            value: "```yaml\nK:" + weaponKills + " / D:" + weaponDeathsBy + " | HS: "
                                + weaponHeadshot + "% | DMG/R: " + weaponDamage + "\n```", inline: false
                        },
                    )
                }

                message.lineReply(weaponEmbed) // Send embed

    } catch (error) {
        message.lineReply("Une erreur s'est produite. Veuillez réessayer plus tard ou contacter un administrateur pour obtenir de l'aide.")
        throw error;
    }

}

module.exports.infos = {
    name: ['weapon', 'weapons', 'guns', 'arme', 'armes', 'gun'],
};