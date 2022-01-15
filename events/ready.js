const Discord = require('discord.js');
const fs = require('fs');
 
module.exports = async (client) => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'f!help',
            type: 'WATCHING',
        },
    });
};