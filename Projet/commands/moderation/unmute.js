const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json");

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes des membre du server!",
        usage: "<@membre> <raison>",
        category: "moderation",
        accessableby: "Moderateurs",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args, member) => {
      const botPerm = message.guild.roles.get("706111289952436244")
      
      const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "Unmute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      const no_member = {
  "description": "Il me manque la mention de l'utilisateur !",
  "color": 13632027,
  "author": {
    "name": "Mute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      const no_mute = {
  "description": "L'utilisateur mentionné n'est pas mute",
  "color": 13632027,
  "author": {
    "name": "Unmute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      
      
        // check if the command caller has permission to use the command
        if (!message.member.roles.some(role => role.name === 'mutePerm')) return message.channel.send({embed : no_perm});

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("J'ai pas les perm...")

        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send({embed : no_member});

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "pas de raison"

        //define mute role and if the mute role doesnt exist then send a message
        let muterole = message.guild.roles.find(r => r.name === "Mute")
        if (!muterole) return message.channel.send({embed: no_mute})

        //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        mutee.removeRole(muterole.id).then(() => {
            
            mutee.send(`Tu a été unmuted sur le server ${message.guild.name} pour la raison suivante: ${reason}`).catch(err => console.log(err))
          
            const ok = {
  "description": `${mutee.user.username} a bien été unmute`,
  "color": 8307759,
  "author": {
    "name": "Unmute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};
          
            message.channel.send({embed : ok})
        })

        //send an embed to the modlogs channel
        let embed = new RichEmbed()
            .setColor(rouge)
            .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
            .addField("Moderation:", "unmute")
            .addField("Membre:", mutee.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.get("767858214279708672")
        sChannel.send(embed)

    }
}