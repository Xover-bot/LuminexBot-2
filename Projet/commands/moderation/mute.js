const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json");

module.exports = {
    config: {
        name: "mute",
        description: "Mutes des membres du seveur!",
        usage: "<@membre> <raison>",
        category: "moderation",
        accessableby: "Staffs",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args, member) => {

      const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "Mute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      
   
      
        // check if the command caller has permission to use the command
       if (!message.member.roles.some(role => role.name === 'mutePerm')) return message.channel.send({embed : no_perm});

        if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("J'ai pas les perm...")

      const no_member = {
  "description": "Il me manque la mention de l'utilisateur !",
  "color": 13632027,
  "author": {
    "name": "Mute",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      
        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!mutee) return message.channel.send({embed : no_member});

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "pas de raison"

        //define mute role and if the mute role doesnt exist then create one
        let muterole = message.guild.roles.find(r => r.name === "Mute")
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Mute",
                    color: "#514f48",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        //add role to the mentioned user and also send the user a dm explaing where and why they were muted
        mutee.addRole(muterole.id).then(() => {

            const ok = {
                "description": `${mutee.user.username} a bien été mute`,
                "color": 8307759,
                "author": {
                  "name": "Mute",
                  "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};

            mutee.send(`Tu as été mute sur le serveur ${message.guild.name} pour la raison suivante: ${reason}`).catch(err => console.log(err))
            message.channel.send({embed : ok})
        })

        //send an embed to the modlogs channel
        let embed = new RichEmbed()
            .setColor(rouge)
            .setAuthor(`${message.guild.name} logs`, message.guild.iconURL)
            .addField("Moderation:", "mute")
            .addField("Membre:", mutee.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Raison:", reason)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.get("767858214279708672")
        sChannel.send(embed)
    }
}