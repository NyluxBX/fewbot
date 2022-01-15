const DiscordUser = require('../schemas/AccountSchema')
const Account = require('../schemas/AccountSchema')
const mongoose = require('mongoose')

module.exports.run = async (client, message, args) => {
    const accounts = await Account.find({ discordId: message.author.id })

    if (accounts.length > 0) 
        await Account.deleteMany({ discordId: message.author.id })
    
    try {
        const newUser = await DiscordUser.remove({
            username: message.author.username,
            discordId: message.author.id,
            valorantAccount: null
        })
        message.reply('Vous compte VALORANT à correctement été délié à votre DISCORD')
    } catch (error) {
        console.log(error)
        return message.reply("Erreur lors du processus de déliage de votre compte VALORANT à votre DISCORD")
    }
}

module.exports.infos = {
    name: ['unlink'],
  };