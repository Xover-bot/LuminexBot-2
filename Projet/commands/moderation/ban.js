const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Ban des utilisateurs du serveur !",
        usage: "<@membre> <raison>",
        category: "moderation",
        accessableby: "Administrateurs",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args, member) => {  
        const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "Ban",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
    const no_member = {
  "description": "Il me manque la mention de l'utilisateur !",
  "color": 13632027,
  "author": {
    "name": "Ban",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({embed : no_perm})

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!banMember) return message.channel.send({embed : no_member})

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Pas de raison donné"
      
        let embed = new RichEmbed()
            .setColor(rouge)
            .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
            .addField("Moderation:", "ban")
            .addField("Membre:", banMember.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        
    
        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("J'ai pas les perm...")

        banMember.send({embed : embed}).then(() =>
            message.guild.ban(banMember, { days: 1, reason: reason })).catch(err => console.log(err))

      const ok = {
  "description": `${banMember.user.username} a été banni`,
  "color": 8307759,
  "author": {
    "name": "Ban",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};
      
        message.channel.send({embed : ok}).then(m => m.delete(5000))


        let sChannel = message.guild.channels.get("767858214279708672")
        sChannel.send(embed)
    }
}