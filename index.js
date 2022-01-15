const Discord = require('discord.js');
require('dotenv').config()
const mongoose = require('mongoose')
require('djs-linereply');
const client = new Discord.Client();
require('discord-buttons')(client);
const fs = require('fs');

client.commands = new Discord.Collection();

mongoose.connect("mongodb+srv://nylux:qC0UsVPm6i8SZrzU@astronomy.d0ou8.mongodb.net/AstroBot?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {

	console.log('Connected to MongoDB Database')
}).catch((error) => console.log(error))

const tempChannel = require("discord.js-temporary-channel");

//just call API
tempChannel.autoCreateChannel(client, {
    userLimit: 5,
    reason: "by Nylux",
    nameStartsWith: "💫",
    nameStartsWithTemp: "🟠・",
});

const {
	GiveawaysManager
} = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
	storage: "./data/giveaway/giveaways.json",
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		embedColor: '#fffffd',
		reaction: "🎉"
	}
});

const { Captcha } = require("discord.js-captcha"); 

const captcha = new Captcha(client, {
    guildID: "867048944219586571",
    roleID: "867078962752651274",
    channelID: "867048944219586573", //optional
    sendToTextChannel: false,
});
 
client.on("guildMemberAdd", async member => {
	captcha.present(member);
});

fs.readdir('./commands/', (error, f) => {
	if (error) return console.log(error);
	console.log(`${f.length} commande${(f.length <= 1) ? '' : 's'} en chargement`);

	const commandes = f.filter(f => f.split('.').pop() === 'js');

	commandes.forEach(f => {
		const commande = require(`./Commands/${f}`);
		console.log(`- ${f} chargée`);

		client.commands.set(commande.infos.name, commande);
	});
});


fs.readdir('./events/', (error, f) => {
	if (error) return console.log(error);
	console.log(`${f.length} event${(f.length <= 1) ? '' : 's'} en chargement`);

	f.forEach(f => {
		const events = require(`./Events/${f}`);
		const event = f.split('.')[0];
		console.log(`- ${f} chargé`);

		client.on(event, events.bind(null, client));
	});
});


client.login(process.env.TOKEN);