const DiscordUser = require('../schemas/AccountSchema')
const Account = require('../schemas/AccountSchema')
const mongoose = require('mongoose')

module.exports.run = async (client, message, args) => {

if (!args[0])
        return message.reply('Veillez inclure votre pseudo ainsi que votre tag (PSEUDO#TAG)')

        var str = args[0];
        for (i = 1; i < args.length; i++)
            str += '%20' + args[i];

        var ID = str.toLowerCase();

        var playerID = ID.replace(/#/g, "%23")

        const accounts = await Account.find({ discordId: message.author.id })

        if (accounts.length > 0) 
            await Account.deleteMany({ discordId: message.author.id })
        
        try {
            const newUser = await DiscordUser.create({
                username: message.author.username,
                discordId: message.author.id,
                valorantAccount: playerID
            })
            message.reply('Votre compte VALORANT à correctement été lié à votre DISCORD')
        } catch (error) {
            console.log(error)
            return message.reply("Erreur lors du processus de liage de votre compte VALORANT à votre DISCORD")
        }
}

module.exports.infos = {
    name: ['link'],
};