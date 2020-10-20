module.exports = {
    config: {
        name: "clear",
        description: "supprimer des messages en masse !",
        usage: "<nombre de message>",
        category: "moderation",
        accessableby: "moderateur",
        aliases: [""]
    },
    run: async (bot, message, args, member) => {
      const no_perm = {
  "description": "Tu n'a pas la permision pour utilisé cette commande !",
  "color": 13632027,
  "author": {
    "name": "clear",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fd4dfefae-7ba4-4329-8cc4-f08606273b66.image.png?v=1588416071107"
  }
};
      
      if (!message.member.hasPermission("MANAGE_MESSAGE")) return message.channel.send({embed : no_perm})
      
       if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
         const no_number = {
  "description": "Il me faut un nombre !",
  "color": 13632027,
  "author": {
    "name": "Clear",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2F0c5bf9f6-4629-4254-bf12-d6910f45c996.image.png?v=1588416078310"
  }
};
            return message.channel.send({embed : no_number}).then(m => m.delete(7000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("J'ai pas les perm...").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => {
          const ok = {
  "description": `${deleted.size} messages ont été supprimés`,
  "color": 8307759,
  "author": {
    "name": "Clear",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}};
          message.channel.send({embed : ok}).then(message => {message.delete(4000)})
          
        });
    


    
}};