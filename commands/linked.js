const Account = require('../schemas/AccountSchema')
require('dotenv').config()


module.exports.run = async (client, message, args) => {
    const accounts = await Account.find({ discordId: message.author.id })

    if (accounts.length > 0) {
        var ID = accounts[0].valorantAccount
        var linked = ID.replace(/%23/g, '#')
        var linkedAccount = linked.replace(/%20/g, ' ')

        message.reply('Votre compte lié est: ' + linkedAccount)
    } else {
        message.reply('Vous n\'avez pas de compte lié! Utilisez f!link PSEUDO#TAG pour lier un compte VALORANT.')
    }
}

module.exports.infos = {
    name: ['linked'],
  };