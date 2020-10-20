const Discord = require("discord.js")
const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Discord.Client({partials: ["MESSAGE","CHANNEL","REACTION"]});

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);