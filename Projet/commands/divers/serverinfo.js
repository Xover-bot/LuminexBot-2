const Discord = require("discord.js")
const botconfig = require("./../../botconfig.json");
const colours = require("./../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
        .setColor(colours.cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`)
        .addField("**Nom Du Server :**", `${message.guild.name}.`)
        .addField("**Créateur Du Server :**", `${message.guild.owner}.`)
        .addField("**Nombre De Membre :**", `${message.guild.memberCount}.`)
        .addField("**Nombre De Rôles :**", `${message.guild.roles.size}.`)
        .setFooter(`Balyse | Footer`, bot.user.displayAvatarURL);
    message.channel.send({ embed: sEmbed });
}


module.exports.config = {
    name: "serverinfo",
    description: "tout savoir sur le server !",
    usage: ``,
    accessableby: "Members",
    category: "divers",
    aliases: ["si", "serverdesc"]
}