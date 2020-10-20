const { RichEmbed } = require("discord.js")
const { rouge } = require("../../colours.json")

module.exports = {
    config: {
        name: "addrole",
        description: "rajoute un role a un membre!",
        usage: "<@membre> <@role>",
        category: "moderation",
        accessableby: "Moderateurs",
        aliases: ["ar", "roleadd"]
    },
    run: async (bot, message, args, member) => {
        const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "addrole",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      const no_member = {
  "description": "Il me manque la mention de l'utilisateur !",
  "color": 13632027,
  "author": {
    "name": "Mention",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
      const no_role = {
  "description": "Il me manque la mention du role !",
  "color": 13632027,
  "author": {
    "name": "Mention",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};


        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send({embed:no_perm})
        let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
        if (!rMember) return message.channel.send({embed : no_member})
        let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
        if (!role) return message.channel.send({embed : no_role})

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send({embed : no_perm})

        if (rMember.roles.has(role.id)) {
          const aleredy_role = {
  "description": "le membre a déja se role ! !",
  "color": 13632027,
  "author": {
    "name": "Mention",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
            return message.channel.send({embed : aleredy_role})
        } else {
          const ok = {
  "description": `Le rôle ${role.name} a bien été ajouté à ${rMember.displayName}.`,
  "color": 8307759,
  "author": {
    "name": "Succés",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};
            await rMember.addRole(role.id).catch(e => console.log(e.message))
            message.channel.send({embed: ok})
        }

        let embed = new RichEmbed()
            .setColor(rouge)
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
            .addField("Moderation:", "Addrole")
            .addField("membre:", rMember.user.username)
            .addField("Moderateur:", message.author.username)
            .addField("Date:", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.get("767858214279708672")
        sChannel.send(embed)
    }
}