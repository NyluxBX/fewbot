const Discord = require('discord.js');
const fs = require('fs');
 

async function Gender(m) {
    if(m.id !== 'genderSelector') { return }
	const genderRoles = ['867521093026709534', '867521180995158036', '867534961447141406', '867521260068929557'];
	if(m.values[0] === 'male') {
		m.reply.defer()
		genderRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867521180995158036') 
	} else if(m.values[0] === 'female') {
		m.reply.defer()
		genderRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867521093026709534') 
	} else if(m.values[0] === 'transgender') {
		m.reply.defer()
		genderRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867534961447141406') 
	} else if(m.values[0] === 'nonbinary') {
		m.reply.defer()
		genderRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867521260068929557') 
	}
}    

async function Orientation(m) {
    if(m.id !== 'orientationSelector') { return }
	const orientationRoles = ['867531672772673537', '867532124265513010', '867531902265196554', '867532361596272690', '867756169307881472', '867756336435036202'];
	if(m.values[0] === 'heterosexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867531672772673537') 
	} else if(m.values[0] === 'homosexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867532124265513010') 
	} else if(m.values[0] === 'bisexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867531902265196554') 
	} else if(m.values[0] === 'pansexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867532361596272690') 
	} else if(m.values[0] === 'polysexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867756169307881472') 
	}else if(m.values[0] === 'asexual') {
		m.reply.defer()
		orientationRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867756336435036202') 
	}
}
    
async function Statut(m) {
    if(m.id !== 'statutSelector') { return }
	const statutRoles = ['re', '867759500849053707', '867759563221630996', '867759656847409162'];
	if(m.values[0] === 'couple') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867759415554080798') 
	} else if(m.values[0] === 'celibataire') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867759656847409162') 
	} else if(m.values[0] === 'crush') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867759500849053707') 
	} else if(m.values[0] === 'complique') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867759563221630996') 
	}
}

async function Age(m) {
    if(m.id !== 'ageSelector') { return }
	const statutRoles = ['867767074399191091', '867767122108874803'];
	if(m.values[0] === 'mineur') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867767074399191091') 
	} else if(m.values[0] === 'majeur') {
		m.reply.defer()
		statutRoles.forEach(r => {if (m.clicker.member.roles.cache.has(r)) m.clicker.member.roles.remove(r);});
		m.clicker.member.roles.add('867767122108874803') 
	} 
}

async function Country(m) {
	if(m.id !== 'countrySelector') { return }
	m.values.forEach(r => {
	if(r === 'Allemagne') {	
		m.reply.defer()
		m.clicker.member.roles.add('867791079180075028') 
	} else if(r === 'Algérie') {
		m.reply.defer()
		m.clicker.member.roles.add('867793547927486495') 
	} else if(r === 'Angleterre') {
		m.reply.defer()
		m.clicker.member.roles.add('867791133517938708') 
	} else if(r === 'Argentine') {
		m.reply.defer()
		m.clicker.member.roles.add('867791174537707540') 
	} else if(r === 'Bénin') {
		m.reply.defer()
		m.clicker.member.roles.add('867791316271497246') 
	} else if(r === 'Belgique') {
		m.reply.defer()
		m.clicker.member.roles.add('867791249665687552') 
	} else if(r === 'Brésil') {
		m.reply.defer()
		m.clicker.member.roles.add('867791292959162399') 
	} else if(r === 'Cameroun') {
		m.reply.defer()
		m.clicker.member.roles.add('867792356526784532') 
	} else if(r === 'Canada') {
		m.reply.defer()
		m.clicker.member.roles.add('867792312540200991') 
	} else if(r === 'CapVert') {
		m.reply.defer()
		m.clicker.member.roles.add('867792813303136307') 
	} else if(r === 'Chili') {
		m.reply.defer()
		m.clicker.member.roles.add('867792400766992434') 
	} else if(r === 'Chine') {
		m.reply.defer()
		m.clicker.member.roles.add('867792415262638120') 
	} else if(r === 'Colombie') {
		m.reply.defer()
		m.clicker.member.roles.add('867792533747662889') 
	} else if(r === 'Congo') {
		m.reply.defer()
		m.clicker.member.roles.add('867792472535728149') 
	} else if(r === 'Croatie') {
		m.reply.defer()
		m.clicker.member.roles.add('867792535816110130') 
	} else if(r === 'Danemark') {
		m.reply.defer()
		m.clicker.member.roles.add('867792728258248724') 
	} else if(r === 'Emirats') {
		m.reply.defer()
		m.clicker.member.roles.add('867792810471194705') 
	} else if(r === 'Espagne') {
		m.reply.defer()
		m.clicker.member.roles.add('867792810799398933') 
	} else if(r === 'US') {
		m.reply.defer()
		m.clicker.member.roles.add('867792811344396298') 
	} else if(r === 'Finlande') {
		m.reply.defer()
		m.clicker.member.roles.add('867792811529207809') 
	} else if(r === 'France') {
		m.reply.defer()
		m.clicker.member.roles.add('867792812010111016') 
	} else if(r === 'Grèce') {
		m.reply.defer()
		m.clicker.member.roles.add('867792812720652309') 
	}
	});
};

async function Country2(m) {
	if(m.id !== 'country2Selector') { return }
	m.values.forEach(r => {
	if(r === 'Inde') {	
		m.reply.defer()
		m.clicker.member.roles.add('867792813620854834') 
	} else if(r === 'Irlande') {
		m.reply.defer()
		m.clicker.member.roles.add('867793213658365972') 
	} else if(r === 'Italie') {
		m.reply.defer()
		m.clicker.member.roles.add('867793213946724383') 
	} else if(r === 'Japon') {
		m.reply.defer()
		m.clicker.member.roles.add('867793214542053426') 
	} else if(r === 'Luxembourg') {
		m.reply.defer()
		m.clicker.member.roles.add('867793214769463316') 
	} else if(r === 'Maldives') {
		m.reply.defer()
		m.clicker.member.roles.add('867793215394021416') 
	} else if(r === 'Maurice') {
		m.reply.defer()
		m.clicker.member.roles.add('867792813172588544') 
	} else if(r === 'Maroc') {
		m.reply.defer()
		m.clicker.member.roles.add('867793216039288832') 
	} else if(r === 'Mexique') {
		m.reply.defer()
		m.clicker.member.roles.add('867793216073367612') 
	} else if(r === 'Monaco') {
		m.reply.defer()
		m.clicker.member.roles.add('867793216798720060') 
	} else if(r === 'Norvège') {
		m.reply.defer()
		m.clicker.member.roles.add('867793853658300456') 
	} else if(r === 'Palestine') {
		m.reply.defer()
		m.clicker.member.roles.add('867793853863034960') 
	} else if(r === 'Wales') {
		m.reply.defer()
		m.clicker.member.roles.add('867793854282203147') 
	} else if(r === 'Nederland') {
		m.reply.defer()
		m.clicker.member.roles.add('867793854405017620') 
	} else if(r === 'Pérou') {
		m.reply.defer()
		m.clicker.member.roles.add('867793855038750720') 
	} else if(r === 'Pologne') {
		m.reply.defer()
		m.clicker.member.roles.add('867794152502198325') 
	} else if(r === 'Portugal') {
		m.reply.defer()
		m.clicker.member.roles.add('867794153656287242') 
	} else if(r === 'Qatar') {
		m.reply.defer()
		m.clicker.member.roles.add('867794154087907348') 
	} else if(r === 'Réunion') {
		m.reply.defer()
		m.clicker.member.roles.add('867794155132813322') 
	} else if(r === 'Roumanie') {
		m.reply.defer()
		m.clicker.member.roles.add('867794155585667082') 
	} else if(r === 'RU') {
		m.reply.defer()
		m.clicker.member.roles.add('867794156205113354') 
	} else if(r === 'Russie') {
		m.reply.defer()
		m.clicker.member.roles.add('867794157254344704') 
	}
	});
};

async function Country3(m) {
	if(m.id !== 'country3Selector') { return }
	m.values.forEach(r => {
	if(r === 'StM') {	
		m.reply.defer()
		m.clicker.member.roles.add('867794523878719569') 
	} else if(r === 'Antilles') {
		m.reply.defer()
		m.clicker.member.roles.add('867794157588971580') 
	} else if(r === 'Salvador') {
		m.reply.defer()
		m.clicker.member.roles.add('867794524704342057') 
	} else if(r === 'Sénégal') {
		m.reply.defer()
		m.clicker.member.roles.add('867794525619224636') 
	} else if(r === 'Serbie') {
		m.reply.defer()
		m.clicker.member.roles.add('867794525904437248') 
	} else if(r === 'Suède') {
		m.reply.defer()
		m.clicker.member.roles.add('867794526440915005') 
	} else if(r === 'Suisse') {
		m.reply.defer()
		m.clicker.member.roles.add('867794527334826005') 
	} else if(r === 'Thaïlande') {
		m.reply.defer()
		m.clicker.member.roles.add('867794527812059146') 
	} else if(r === 'Tunisie') {
		m.reply.defer()
		m.clicker.member.roles.add('867794528362823691') 
	} else if(r === 'Turquie') {
		m.reply.defer()
		m.clicker.member.roles.add('867794936476073984') 
	} else if(r === 'Ukraine') {
		m.reply.defer()
		m.clicker.member.roles.add('867794936731795506') 
	} else if(r === 'Uruguay') {
		m.reply.defer()
		m.clicker.member.roles.add('867794937285967912') 
	} else if(r === 'Venezuela') {
		m.reply.defer()
		m.clicker.member.roles.add('867794937738428426') 
	} else if(r === 'Zimbabwe') {
		m.reply.defer()
		m.clicker.member.roles.add('867794937772769311') 
	} 
	});
};

async function Agents(m) {
	if(m.id !== 'agentsSelector') { return }
	m.values.forEach(r => {
	if(r === 'Astra') {	
		m.reply.defer()
		m.clicker.member.roles.add('934145595566882897') 
	} else if(r === 'Breach') {
		m.reply.defer()
		m.clicker.member.roles.add('934145613757579304') 
	} else if(r === 'Brimstone') {
		m.reply.defer()
		m.clicker.member.roles.add('934145616223801405') 
	} else if(r === 'Chamber') {
		m.reply.defer()
		m.clicker.member.roles.add('934145619310833704') 
	} else if(r === 'Cypher ') {
		m.reply.defer()
		m.clicker.member.roles.add('934145621877739581') 
	} else if(r === 'Jett ') {
		m.reply.defer()
		m.clicker.member.roles.add('934145624931201094') 
	} else if(r === 'Kayo') {
		m.reply.defer()
		m.clicker.member.roles.add('934145627129008129') 
	} else if(r === 'Killjoy') {
		m.reply.defer()
		m.clicker.member.roles.add('934145630044037210') 
	} else if(r === 'Neon') {
		m.reply.defer()
		m.clicker.member.roles.add('934145633391116328') 
	} else if(r === 'Omen') {
		m.reply.defer()
		m.clicker.member.roles.add('934145636104827000') 
	} else if(r === 'Phoenix') {
		m.reply.defer()
		m.clicker.member.roles.add('934145638906609694') 
	} else if(r === 'Raze') {
		m.reply.defer()
		m.clicker.member.roles.add('934145641381240832') 
	} else if(r === 'Reyna') {
		m.reply.defer()
		m.clicker.member.roles.add('934145643465822270') 
	} else if(r === 'Sage') {
		m.reply.defer()
		m.clicker.member.roles.add('934145646313742366') 
	} else if(r === 'Skye') {
		m.reply.defer()
		m.clicker.member.roles.add('934145648712884234') 
	} else if(r === 'Sova') {
		m.reply.defer()
		m.clicker.member.roles.add('867792728258248724') 
	} else if(r === 'Viper') {
		m.reply.defer()
		m.clicker.member.roles.add('934145653523767366') 
	} else if(r === 'Yoru') {
		m.reply.defer()
		m.clicker.member.roles.add('934145656044548106') 
	} 
	});
};

module.exports = async (client, m) => {
    Agents(m);
    Gender(m);
    Orientation(m);
    Statut(m);
    Age(m);
    Country(m);
    Country2(m);
    Country3(m);
    open_ticket(m)
}
