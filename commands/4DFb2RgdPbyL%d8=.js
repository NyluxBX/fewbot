const Discord = require('discord.js')
const disbut = require("discord-buttons");

module.exports.run = async (client, message, args) => {
	message.delete() // Suppresion de la commande de base

	//----------------------------------------------------------- AGE ------------------------------------------------------------//
	
	// Embed Age
	let ageEmbed = new Discord.MessageEmbed().setTitle('Rôles Statut Juridique').setDescription('Sélectionnez dans la liste ci-dessous votre statut juridique.').setColor('#045668').setImage('https://media.giphy.com/media/13Z5kstwARnPna/giphy.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	// Option Mineur
	const ageMineur = new disbut.MessageMenuOption().setLabel('Mineur').setEmoji('🔞').setValue('mineur').setDescription('Vous n\'avez pas encore obtenu votre majorité.')
	// Option Majeur
	const ageMajeur = new disbut.MessageMenuOption().setLabel('Majeur').setEmoji('🍺').setValue('majeur').setDescription('Vous avez obtenu votre majorité.')
	
	// Menu Genres
	const ageSelector = new disbut.MessageMenu().setID('ageSelector').setPlaceholder('Âge').setMaxValues(1).setMinValues(1).addOption(ageMineur).addOption(ageMajeur)

	// Envoi du message
	message.channel.send(ageEmbed, ageSelector);

	//----------------------------------------------------------- PAYS ------------------------------------------------------------//
	
	// Embed Age
	let countryEmbed = new Discord.MessageEmbed().setTitle('Rôles Pays').setDescription('Sélectionnez dans la liste ci-dessous votre/vos pays. \n \n Tout abus/trolls dans les rôles de pays est passible d\'un bannissement (permanent)').setColor('#045668').setImage('https://media.giphy.com/media/kaf3CFotB4YfbExz2V/giphy.gif').setFooter(message.guild.name, "https://imgur.com/NpAGT6n.png")

	const Allemagne = new disbut.MessageMenuOption().setLabel('Allemagne').setEmoji('🇩🇪').setValue('Allemagne')
	const Algérie = new disbut.MessageMenuOption().setLabel('Algérie').setEmoji('🇩🇿').setValue('Algérie')
	const Angleterre = new disbut.MessageMenuOption().setLabel('Angleterre').setEmoji('🏴󠁧󠁢󠁥󠁮󠁧󠁿').setValue('Angleterre')
	const Argentine = new disbut.MessageMenuOption().setLabel('Argentine').setEmoji('🇦🇷').setValue('Argentine')
	const Bénin = new disbut.MessageMenuOption().setLabel('Bénin').setEmoji('🇧🇯').setValue('Bénin')
	const Belgique = new disbut.MessageMenuOption().setLabel('Belgique').setEmoji('🇧🇪').setValue('Belgique')
	const Brésil = new disbut.MessageMenuOption().setLabel('Brésil').setEmoji('🇧🇷').setValue('Brésil')
	const Cameroun = new disbut.MessageMenuOption().setLabel('Cameroun').setEmoji('🇨🇲').setValue('Cameroun')
	const Canada = new disbut.MessageMenuOption().setLabel('Canada').setEmoji('🇨🇦').setValue('Canada')
	const CapVert = new disbut.MessageMenuOption().setLabel('Cap-Vert').setEmoji('🇨🇻').setValue('CapVert')
	const Chili = new disbut.MessageMenuOption().setLabel('Chili').setEmoji('🇨🇱').setValue('Chili')
	const Chine = new disbut.MessageMenuOption().setLabel('Chine').setEmoji('🇨🇳').setValue('Chine')
	const Colombie = new disbut.MessageMenuOption().setLabel('Colombie').setEmoji('🇨🇴').setValue('Colombie')
	const Congo = new disbut.MessageMenuOption().setLabel('Congo (Rép. dém.)').setEmoji('🇨🇩').setValue('Congo')
	const Croatie = new disbut.MessageMenuOption().setLabel('Croatie').setEmoji('🇭🇷').setValue('Croatie')
	const Danemark = new disbut.MessageMenuOption().setLabel('Danemark').setEmoji('🇩🇰').setValue('Danemark')
	const Emirats = new disbut.MessageMenuOption().setLabel('Émirats arabes unis').setEmoji('🇦🇪').setValue('Emirats')
	const Espagne = new disbut.MessageMenuOption().setLabel('Espagne').setEmoji('🇪🇸').setValue('Espagne')
	const US = new disbut.MessageMenuOption().setLabel('États-Unis').setEmoji('🇺🇸').setValue('US')
	const Finlande = new disbut.MessageMenuOption().setLabel('Finlande').setEmoji('🇫🇮').setValue('Finlande')
	const France = new disbut.MessageMenuOption().setLabel('France').setEmoji('🇫🇷').setValue('France')
	const Grèce = new disbut.MessageMenuOption().setLabel('Grèce').setEmoji('🇬🇷').setValue('Grèce')

	const Inde = new disbut.MessageMenuOption().setLabel('Inde').setEmoji('🇮🇳').setValue('Inde')
	const Irlande = new disbut.MessageMenuOption().setLabel('Irlande').setEmoji('🇮🇪').setValue('Irlande')
	const Italie = new disbut.MessageMenuOption().setLabel('Italie').setEmoji('🇮🇹').setValue('Italie')
	const Japon = new disbut.MessageMenuOption().setLabel('Japon').setEmoji('🇯🇵').setValue('Japon')
	const Luxembourg = new disbut.MessageMenuOption().setLabel('Luxembourg').setEmoji('🇱🇺').setValue('Luxembourg')
	const Maldives = new disbut.MessageMenuOption().setLabel('Maldives').setEmoji('🇲🇻').setValue('Maldives')
	const Maurice = new disbut.MessageMenuOption().setLabel('Maurice').setEmoji('🇲🇺').setValue('Maurice')
	const Maroc = new disbut.MessageMenuOption().setLabel('Maroc').setEmoji('🇲🇦').setValue('Maroc')
	const Mexique = new disbut.MessageMenuOption().setLabel('Mexique').setEmoji('🇲🇽').setValue('Mexique')
	const Monaco = new disbut.MessageMenuOption().setLabel('Monaco').setEmoji('🇲🇨').setValue('Monaco')
	const Norvège = new disbut.MessageMenuOption().setLabel('Norvège').setEmoji('🇳🇴').setValue('Norvège')
	const Palestine = new disbut.MessageMenuOption().setLabel('Palestine').setEmoji('🇵🇸').setValue('Palestine')
	const Wales = new disbut.MessageMenuOption().setLabel('Pays de Galles').setEmoji('🏴󠁧󠁢󠁷󠁬󠁳󠁿').setValue('Wales')
	const Nederland = new disbut.MessageMenuOption().setLabel('Pays-Bas').setEmoji('🇳🇱').setValue('Nederland')
	const Pérou = new disbut.MessageMenuOption().setLabel('Pérou').setEmoji('🇵🇪').setValue('Pérou')
	const Pologne = new disbut.MessageMenuOption().setLabel('Pologne').setEmoji('🇵🇱').setValue('Pologne')
	const Portugal = new disbut.MessageMenuOption().setLabel('Portugal').setEmoji('🇵🇹').setValue('Portugal')
	const Qatar = new disbut.MessageMenuOption().setLabel('Qatar').setEmoji('🇶🇦').setValue('Qatar	')
	const Réunion = new disbut.MessageMenuOption().setLabel('Réunion').setEmoji('🇷🇪').setValue('Réunion')
	const Roumanie = new disbut.MessageMenuOption().setLabel('Roumanie').setEmoji('🇷🇴').setValue('Roumanie')
	const RU = new disbut.MessageMenuOption().setLabel('Royaume-Uni').setEmoji('🇬🇧').setValue('RU')
	const Russie = new disbut.MessageMenuOption().setLabel('Russie').setEmoji('🇷🇺').setValue('Russie')

	const StM = new disbut.MessageMenuOption().setLabel('Saint-Marin').setEmoji('🇸🇲').setValue('StM')
	const Antilles  = new disbut.MessageMenuOption().setLabel('Saint-Martin (Antilles)').setEmoji('🇲🇫').setValue('Antilles')
	const Salvador = new disbut.MessageMenuOption().setLabel('Salvador').setEmoji('🇸🇻').setValue('Salvador')
	const Sénégal = new disbut.MessageMenuOption().setLabel('Sénégal').setEmoji('🇸🇳').setValue('Sénégal')
	const Serbie = new disbut.MessageMenuOption().setLabel('Serbie').setEmoji('🇷🇸').setValue('Serbie')
	const Suède = new disbut.MessageMenuOption().setLabel('Suède').setEmoji('🇸🇪').setValue('Suède')
	const Suisse = new disbut.MessageMenuOption().setLabel('Suisse').setEmoji('🇨🇭').setValue('Suisse')
	const Thaïlande = new disbut.MessageMenuOption().setLabel('Thaïlande').setEmoji('🇹🇭').setValue('Thaïlande')
	const Tunisie = new disbut.MessageMenuOption().setLabel('Tunisie').setEmoji('🇹🇳').setValue('Tunisie')
	const Turquie = new disbut.MessageMenuOption().setLabel('Turquie').setEmoji('🇹🇷').setValue('Turquie')
	const Ukraine = new disbut.MessageMenuOption().setLabel('Ukraine').setEmoji('🇺🇦').setValue('Ukraine')
	const Uruguay = new disbut.MessageMenuOption().setLabel('Uruguay').setEmoji('🇺🇾').setValue('Uruguay')
	const Venezuela = new disbut.MessageMenuOption().setLabel('Venezuela').setEmoji('🇻🇪').setValue('Venezuela')
	const Zimbabwe = new disbut.MessageMenuOption().setLabel('Zimbabwe').setEmoji('🇿🇼').setValue('Zimbabwe')

	const countryList = [Allemagne, Algérie, Angleterre, Argentine, Bénin, Belgique, Brésil, Cameroun, Canada, CapVert, Chili, Chine, Colombie, Congo, Croatie, Danemark, Emirats, Espagne, US, Finlande, France, Grèce]
	const country2List = [Inde, Irlande, Italie, Japon, Luxembourg, Maldives, Maurice, Maroc, Mexique, Monaco, Norvège, Palestine, Wales, Nederland, Pérou, Pologne, Portugal, Qatar, Réunion, Roumanie, RU, Russie]
	const country3List = [StM, Antilles, Salvador, Sénégal, Serbie, Suède, Suisse, Thaïlande, Tunisie, Turquie, Ukraine, Uruguay, Venezuela, Zimbabwe]

	const countrySelector = new disbut.MessageMenu().setID('countrySelector').setPlaceholder('Pays (A-G)').setMaxValues(5).setMinValues(1)
	countryList.forEach(r => {countrySelector.addOption(r)});

	const country2Selector = new disbut.MessageMenu().setID('country2Selector').setPlaceholder('Pays (I-R)').setMaxValues(5).setMinValues(1)
	country2List.forEach(r => {country2Selector.addOption(r)});

	const country3Selector = new disbut.MessageMenu().setID('country3Selector').setPlaceholder('Pays (S-Z)').setMaxValues(5).setMinValues(1)
	country3List.forEach(r => {country3Selector.addOption(r)});

	message.channel.send(countryEmbed, countrySelector);
	message.channel.send("⁣⁣", country2Selector);
	message.channel.send("⁣⁣", country3Selector);
	
};

module.exports.infos = {
	name: ['4DFb2RgdPbyL%d8='],
};