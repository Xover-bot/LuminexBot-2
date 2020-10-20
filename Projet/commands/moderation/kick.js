const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Kick un utilisateur du server !",
        usage: "<@membre> <raison>",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
    },
    run: async (bot, message, args, member) => {

      const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "Kick",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      const no_member = {
  "description": "Il me manque la mention de l'utilisateur !",
  "color": 13632027,
  "author": {
    "name": "Kick",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({embed : no_perm})

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!kickMember) return message.channel.send({embed : no_member})

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "Pas de raison"

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("J'ai pas les perm...")
        
      let embed = new RichEmbed()
            .setColor(rouge)
            .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
            .addField("Moderation:", "kick")
            .addField("Membre:", kickMember.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
      
      
        kickMember.send(embed).then(() =>
            kickMember.kick()).catch(err => console.log(err))
         
      const ok = {
  "description": `${kickMember.user.username} a été kick`,
  "color": 8307759,
  "author": {
    "name": "Kick",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};
      
        message.channel.send({embed: ok}).then(m => m.delete(5000))

        

        let sChannel = message.guild.channels.get("767858214279708672")
        sChannel.send(embed)

    }
}