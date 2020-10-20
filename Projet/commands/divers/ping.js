const Discord = require("discord.js")
const botconfig = require("./../../botconfig.json");
const colours = require("./../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {
  
message.channel.send("Pong :ping-pong:")
  
}


module.exports.config = {
    name: "ping",
    description: "juste une commande de test",
    usage: "",
    accessableby: "Members",
    category: "divers",
    aliases: ["si", "serverdesc"]
}