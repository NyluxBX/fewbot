const Discord = require('discord.js');
const pagination = require("discord.js-pagination");

module.exports.run = async (client, message, args) => {
    message.delete()

    const embedPanel = new Discord.MessageEmbed()
        .setTitle("Menu Aide")
        .setColor("#045668")
        .addFields({
            name: "⚙ Admin",
            value: "f!help admin",
            inline: true
        }, {
            name: "🎮 Fun",
            value: "f!help fun",
            inline: true
        }, {
            name: "🎶 Musique",
            value: "f!help music",
            inline: true
        }, {
            name: "🔫 VALORANT",
            value: "f!help valorant",
        })
        .setDescription("Sélectionnez l'une des catégories ci-dessous")
        .setThumbnail("https://imgur.com/NpAGT6n.png")

    const embedPanel1 = new Discord.MessageEmbed()
        .setTitle("Menu Aide")
        .setColor("#045668")
        .addFields({
            name: "KDR",
            value: "kills ÷ morts",
            inline: true
        }, {
            name: "KDA",
            value: "(kills + (assistances ÷ 2)) ÷ morts",
            inline: true
        }, {
            name: "KAD",
            value: "(kills + assistances) ÷ morts",
            inline: true
        }, {
            name: "Erreur commune",
            value: "Lorsque vous liez un compte à votre ID Discord, vous devez taper la commande correctement.\n" +
                "Ne pas inclure `< >` entre votre nom d'utilisateur et votre tag. Non sensible à la casse.\n" +
                "Commande: `f!link username#tag`" + "\n" + "Examples: `f!link sen tenz#0505` `f!link CMDRVo#CMDR` `f!link 100t aSUnA#1111`"
        }, )
        .setThumbnail("https://imgur.com/NpAGT6n.png")

    const adminPanel = new Discord.MessageEmbed()
        .setTitle("Aide Admin")
        .setColor("#045668")
        .addFields({
            name: "`f!gstart [salon] [durée s/m/h/d/w] [nombre de gagnants] [récompense]`",
            value: "Permet de créer un giveaway"
        }, {
            name: "`f!greroll [id du giveaway]`",
            value: "Permet de re déterminer un gagnant au giveaway"
        }, {
            name: "`f!gstop [id du giveaway]`",
            value: "Permet d'arreter un giveaway"
        })
        .setThumbnail("https://imgur.com/NpAGT6n.png")

    const funPanel = new Discord.MessageEmbed()
        .setTitle("Aide Fun")
        .setColor("#045668")
        .addFields({
            name: "`f!kiss [mention]`",
            value: "Faîtes un bisou à quelqu'un!"
        }, {
            name: "`f!hug [mention]`",
            value: "Faîtes un calin à quelqu'un!"
        }, {
            name: "`f!slap [mention]`",
            value: "Donnez une grosse tarte à quelqu'un."
        }, {
            name: "`f!8ball [question]`",
            value: "Posez une question à la boule magique"
        }, {
            name: "`f!calc [calcul]`",
            value: "Demandez de l'aide pour vos calculs!"
        })
        .setThumbnail("https://imgur.com/NpAGT6n.png")

    const musicPanel = new Discord.MessageEmbed()
        .setTitle("Aide Musique")
        .setColor("#045668")
        .addFields({
            name: "`f!clip [nom]`",
            value: "Écoute le son d'un clip."
        }, {
            name: "`f!clips`",
            value: "Liste tous les clips."
        }, {
            name: "`f!loop`",
            value: "Mettre la musique en boucle."
        }, {
            name: "`f!lyrics`",
            value: "Obtenir les paroles de la chanson en cours de lecture."
        }, {
            name: "`f!move [Nombre dans la file d'attente]`",
            value: "Déplacer les chansons de la file d'attente."
        }, {
            name: "`f!nowplaying`",
            value: "Afficher la chanson en cours de lecture."
        }, {
            name: "`f!pause`",
            value: "Mettre en pause la musique en cours de lecture."
        }, {
            name: "`f!play [YouTube URL | Nom Vidéo]`",
            value: "Écoute de la musique depuis YouTube."
        }, {
            name: "`f!playlist [URL Playlist Youtube | Nom Playlist]`",
            value: "Écoute une playlist venant de YouTube."
        }, {
            name: "`f!queue`",
            value: "Afficher la file d'attente et la musique en cours de lecture."
        }, {
            name: "`f!remove [nombre de la musique dans la file d'attente]`",
            value: "Supprimer la chanson de la file d'attente."
        }, {
            name: "`f!resume`",
            value: "Reprendre la lecture de la musique en cours"
        }, {
            name: "`f!search [Nom Vidéo]`",
            value: "Rechercher et sélectionner des vidéos à écouter"
        }, {
            name: "`f!shuffle`",
            value: "Mélange la file d'attente"
        }, {
            name: "`f!skip`",
            value: "Skip la musique en cours de lecture"
        }, {
            name: "`f!skipto [Nombre dans la file d'attente]`",
            value: "Passer au numéro de file d'attente sélectionné"
        }, {
            name: "`f!stop`",
            value: "Arrête la musique"
        }, {
            name: "`f!volume [volume souhaité 0-100]`",
            value: "Changer le volume de la musique en cours de lecture"
        }, )
        .setThumbnail("https://imgur.com/NpAGT6n.png")

    const valorantPanel = new Discord.MessageEmbed()
        .setTitle("Aide VALORANT")
        .setColor("#045668")
        .addFields({
            name: "`f!stats pseudo#tag` | `f!comp pseudo#tag`",
            value: "Afficher les statistiques de la carrière compétitive d'un utilisateur"
        }, {
            name: "`f!unrated pseudo#tag`",
            value: "Afficher les statistiques de carrière non notées d'un utilisateur",
        }, {
            name: "`f!sr pseudo#tag` | `f!spikerush pseudo#tag`",
            value: "Afficher les statistiques de carrière spike rush d'un utilisateur",
        }, {
            name: "`f!dm pseudo#tag` | `f!deathmatch pseudo#tag`",
            value: "Afficher les statistiques de carrière en match à mort d'un utilisateur",
        }, {
            name: "`f!intensification pseudo#tag`",
            value: "Afficher les statistiques de carrière en intensification d'un utilisateur",
        }, {
            name: "`f!lastmatch pseudo#tag`",
            value: "Afficher les informations sur le dernier match d'un utilisateur",
        }, {
            name: "`f!agent username#tag`",
            value: "Afficher le top 5 des agents d'un utilisateur",
        }, {
            name: "`f!weapon username#tag`",
            value: "Afficher les statistiques des armes en compétition d'un utilisateur",
        }, {
            name: "`f!map username#tag`",
            value: "Afficher les statistiques de la carte en compétition d'un utilisateur"
        }, {
            name: "`f!link username#tag` | `f!unlink` | `f!linked`",
            value: "Lier/délier un compte VALORANT à/depuis votre ID Discord",
        }, )
        .setThumbnail("https://imgur.com/NpAGT6n.png")
    
        const helpPages = [embedPanel, embedPanel1]; // Pages

        const flipPage = ["⬅️", "➡️"]; // Flip Pags
    
        const timeout = "100000"; // Timeout

    if (args[0] == 'admin') {
        message.channel.send(adminPanel)
    } else if (args[0] == 'fun') {
        message.channel.send(funPanel)
    } else if (args[0] == 'music') {
        message.channel.send(musicPanel)
    } else if (args[0] == 'valorant') {
        message.channel.send(valorantPanel)
    } else {
        pagination(message, helpPages, flipPage, timeout);
    }
    



    

};

module.exports.infos = {
    name: ['help', 'aide'],
};