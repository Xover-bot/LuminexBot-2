

const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json");

module.exports = {
    config: {
        name: "lol",
        description: "Ban des utilisateurs du serveur !",
        usage: "<@membre> <raison>",
        category: "moderation",
        accessableby: "Administrateurs",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args, member) => {  



    if(!message.member.hasPermission('BAN_MEMBERS')) return error(message, "vous n'avez pas la permission d'utiliser cette commande")
    var user = message.mensions.members.first()
    if (!user) return erreor(message, "vous devez presiser le membre a bannir")
    var bannable = user.bannable;
    if (!bannable) return error(message, "je ne peut pas bannir ce membre")
    user.ban().then(() => {
        embed(message, "Ce membre a ete bannie avec succes !")
    }).catch(err => {
        console.log(err);
    })
  
}};