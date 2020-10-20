module.exports = {
    config: {
        name: "shutdown",
        description: "éteindre le bot!",
        usage: "x.shutdown",
        category: "owner",
        accessableby: "Owner",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {

      const shutdown_ok = {
  "description": `Commande réalisé avec succés !`,
  "color": 8307759,
  "author": {
    "name": "Shutdown",
    "icon_url": "https://cdn.glitch.com/54bc5e5e-09fc-40f2-96d3-15b94d199d39%2Fa6262814-c56e-4e41-884a-a8e9d93f3789.image.png?v=1588416054897"}}; 
      
if (message.author.id != "401404501191294977") return message.channel.send("seul le developperur de se bot a le droit d'utiliser cette commande")

        try {
            await message.channel.send("le bot s'éteind...")
            process.exit()
        } catch (e) {
            message.channel.send(`ERROR: ${e.message}`)
        }



    }


    }
