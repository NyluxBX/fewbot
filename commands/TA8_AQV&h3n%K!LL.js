const Discord = require('discord.js')
const disbut = require("discord-buttons");

module.exports.run = async (client, message, args) => {
	message.delete() // Suppresion de la commande de base

	//----------------------------------------------------------- AGENTS ------------------------------------------------------------//
	
	// Embed Agents
	let agentsEmbed = new Discord.MessageEmbed().setTitle('Rôles Agents').setDescription('Sélectionnez dans la liste ci-dessous les agents que vous maîtrisez. \n \n Tout abus/trolls dans les rôles de pays est passible d\'un bannissement (permanent)').setColor('#045668').setImage('https://i.giphy.com/media/hVVLTGktFcUiQEUfFf/giphy-downsized-large.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	const Astra = new disbut.MessageMenuOption().setLabel('Astra').setEmoji('931628478334398494').setValue('Astra')
	const Breach = new disbut.MessageMenuOption().setLabel('Breach').setEmoji('931628645066366986').setValue('Breach')
	const Brimstone = new disbut.MessageMenuOption().setLabel('Brimstone').setEmoji('931627490722607146󠁧󠁢󠁥󠁮󠁧󠁿').setValue('Brimstone')
	const Chamber = new disbut.MessageMenuOption().setLabel('Chamber').setEmoji('931628045431898163').setValue('Chamber')
	const Cypher = new disbut.MessageMenuOption().setLabel('Cypher').setEmoji('931628296523886592').setValue('Cypher')
	const Jett = new disbut.MessageMenuOption().setLabel('Jett').setEmoji('931628468033175562').setValue('Jett')
	const KAYO = new disbut.MessageMenuOption().setLabel('KAY/O').setEmoji('931628298612641842').setValue('KAY/O')
	const Killjoy = new disbut.MessageMenuOption().setLabel('Killjoy').setEmoji('931628031288688641').setValue('Killjoy')
	const Neon = new disbut.MessageMenuOption().setLabel('Neon').setEmoji('931628213338263582').setValue('Neon')
	const Omen = new disbut.MessageMenuOption().setLabel('Omen').setEmoji('931627923197272134').setValue('Omen')
	const Phoenix = new disbut.MessageMenuOption().setLabel('Phoenix').setEmoji('931628414962634753').setValue('Phoenix')
	const Raze = new disbut.MessageMenuOption().setLabel('Raze').setEmoji('931628585087807518󠁧󠁢󠁥󠁮󠁧󠁿').setValue('Raze')
	const Reyna = new disbut.MessageMenuOption().setLabel('Reyna').setEmoji('931628524597559337').setValue('Reyna')
	const Sage = new disbut.MessageMenuOption().setLabel('Sage').setEmoji('931628357198696449').setValue('Sage')
	const Skye = new disbut.MessageMenuOption().setLabel('Skye').setEmoji('931628652448325633').setValue('Skye')
	const Sova = new disbut.MessageMenuOption().setLabel('Sova').setEmoji('931628166127181886').setValue('Sova')
	const Viper = new disbut.MessageMenuOption().setLabel('Viper').setEmoji('931627840032628766').setValue('Viper')
	const Yoru = new disbut.MessageMenuOption().setLabel('Yoru').setEmoji('931628576636301332').setValue('Yoru')

	const agentsList = [Astra, Breach, Brimstone, Chamber, Cypher, Jett, KAYO, Killjoy, Neon, Omen, Phoenix, Raze, Reyna, Sage, Skye, Sova, Viper, Yoru]

	const agentsSelector = new disbut.MessageMenu()
	    .setID('agentsSelector')
	    .setPlaceholder('Agents VALORANT').setMaxValues(3).setMinValues(1)
	    .addOption(Astra)
	    .addOption(Breach)
	    .addOption(Brimstone)
	    .addOption(Chamber)
	    .addOption(Cypher)
	    .addOption(Jett)
	    .addOption(KAYO)
	    .addOption(Killjoy)
	    .addOption(Neon)
	    .addOption(Omen)
	    .addOption(Phoenix)
	    .addOption(Raze)
	    .addOption(Reyna)
	    .addOption(Sage)
	    .addOption(Skye)
	    .addOption(Sova)
	    .addOption(Viper)
	    .addOption(Yoru)


	message.channel.send(agentsEmbed, agentsSelector);
	
};

module.exports.infos = {
	name: ['TA8_AQV&h3n%K!LL'],
};
