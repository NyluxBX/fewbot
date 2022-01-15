const Discord = require('discord.js')
const disbut = require("discord-buttons");

module.exports.run = async (client, message, args) => {
	message.delete() // Suppresion de la commande de base

	//---------------------------------------------------------- GENRES ----------------------------------------------------------//
	
	// Embed Genres
	let genderEmbed = new Discord.MessageEmbed().setTitle('Rôles Genres').setDescription('Sélectionnez dans la liste ci-dessous le genre qui vous correspond.').setColor('#045668').setImage('https://media.giphy.com/media/gvfpZrR54qd56/giphy.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	// Option Homme
	const genderMale = new disbut.MessageMenuOption().setLabel('Homme').setEmoji('♂️').setValue('male').setDescription('Vous vous définissez comme étant un homme.')
	// Option Femme
	const genderFemale = new disbut.MessageMenuOption().setLabel('Femme').setEmoji('♀️').setValue('female').setDescription('Vous vous définissez comme étant une femme.')
	// Option Non-binaire
	const genderTransgender = new disbut.MessageMenuOption().setLabel('Transgenre').setEmoji('🏳️‍⚧️').setValue('transgender').setDescription('Vous vous définissez comme étant un transgenre.')
	// Option Non-binaire
	const genderNonbinary = new disbut.MessageMenuOption().setLabel('Non-binaire').setEmoji('868451027106541568').setValue('nonbinary').setDescription('Vous vous définissez comme étant non-binaire.')

	// Menu Genres
	const genderSelector = new disbut.MessageMenu().setID('genderSelector').setPlaceholder('Genre').setMaxValues(1).setMinValues(1).addOption(genderMale).addOption(genderFemale).addOption(genderTransgender).addOption(genderNonbinary)

	// Envoi du message
	message.channel.send(genderEmbed, genderSelector);

	//--------------------------------------------------- ORIENTATION SEXUELLE ---------------------------------------------------//

	// Embed Orientation
	let orientationEmbed = new Discord.MessageEmbed()
	.setTitle('Rôles Orientation').setDescription('Sélectionnez dans la liste ci-dessous votre orientation sexuelle.').setColor('#045668').setImage('https://media.giphy.com/media/Ejw31fJJkDfQ4/giphy.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	// Option Orientation
	const orientationHetero = new disbut.MessageMenuOption().setLabel('Hétérosexuel(le)').setEmoji('868433664017596417').setValue('heterosexual').setDescription('Vous êtes attirés par des sujets du sexe opposé.')
	const orientationHomo = new disbut.MessageMenuOption().setLabel('Homosexuel(le)').setEmoji('868433992616140821').setValue('homosexual').setDescription('Vous êtes attirés par les individus du même sexe.')
	const orientationBi = new disbut.MessageMenuOption().setLabel('Bisexuel(le)').setEmoji('868433527253925898').setValue('bisexual').setDescription('Vous êtes attirés par les hommes et les femmes.')
	const orientationPan = new disbut.MessageMenuOption().setLabel('Pansexuel(le)').setEmoji('868433527677521940').setValue('pansexual').setDescription('Vous êtes attirés sans vous soucier du genre.')
	const orientationPoly = new disbut.MessageMenuOption().setLabel('Polysexuel(le)').setEmoji('868433527140679690').setValue('polysexual').setDescription('Vous êtes attirés par plein de genres et/ou sexes.')
	const orientationAs = new disbut.MessageMenuOption().setLabel('Asexuel(le)').setEmoji('868433526645743638').setValue('asexual').setDescription('Vous n\'éprouvez aucune attirance sexuelle.')
	
	// Menu Orientation
	const orientationSelector = new disbut.MessageMenu().setID('orientationSelector').setPlaceholder('Orientation').setMaxValues(1).setMinValues(1).addOption(orientationHetero).addOption(orientationHomo).addOption(orientationBi).addOption(orientationPan).addOption(orientationPoly).addOption(orientationAs)
	
	// Envoi du message
	message.channel.send(orientationEmbed, orientationSelector);

		//--------------------------------------------------- Statut ---------------------------------------------------//

	// Embed Orientation
	let statutEmbed = new Discord.MessageEmbed()
	.setTitle('Rôles Statut').setDescription('Sélectionnez dans la liste ci-dessous votre statut actuel.').setColor('#045668').setImage('https://media.giphy.com/media/W9MrfVxE4s2Zi/giphy.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	// Option Orientation
	const statutCouple = new disbut.MessageMenuOption().setLabel('Couple').setEmoji('💗').setValue('couple').setDescription('Vous êtes actuellement en couple.')
	const statutCelibataire = new disbut.MessageMenuOption().setLabel('Célibataire').setEmoji('💔').setValue('celibataire').setDescription('Vous êtes actuellement dans le célibat.')
	const statutComplique = new disbut.MessageMenuOption().setLabel('Crush').setEmoji('🤍').setValue('crush').setDescription('Vous ressentez des sentiments pour quelqu\'un.')
	const statutCrush = new disbut.MessageMenuOption().setLabel('Compliqué').setEmoji('💞').setValue('complique').setDescription('Vous êtes dans une situation difficile.')

	// Menu Orientation
	const statutSelector = new disbut.MessageMenu().setID('statutSelector').setPlaceholder('Statut actuel').setMaxValues(1).setMinValues(1).addOption(statutCouple).addOption(statutCelibataire).addOption(statutComplique).addOption(statutCrush)
	
	// Envoi du message
	message.channel.send(statutEmbed, statutSelector);
};

module.exports.infos = {
	name: ['y3v=cm@&dF-7Hhf8'],
};