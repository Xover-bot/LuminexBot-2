module.exports = {
    config: {
        name: "say",
        description: "faire parler le bot !",
        usage: "<message>",
        category: "moderation",
        accessableby: "Staffs",
        aliases: ["acc", "announcement"]
    },
    run: async (bot, message, args, member) => {

      const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "Say",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      
      const botPerm = message.guild.roles.get("706111289952436244")
 if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({embed : no_perm})  
      
        let argsresult;
        let mChannel = message.mentions.channels.first()

        message.delete()
        if (mChannel) {
            mChannel.send(args.slice(1).join(" ").subString(mChannel.lenght))
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult)
        }

    }
}