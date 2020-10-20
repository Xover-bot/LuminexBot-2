module.exports = {
    config: {
        name: "reload",
        description: "reloads le bot !",
        usage: "x.reload",
        category: "owner",
        accessableby: "Owner",
        aliases: ["creload"]
    },
    run: async (bot, message, args) => {

        if (message.author.id != "401404501191294977") return message.channel.send("tu n'est pas le développer de se bot!")

        if (!args[0]) return message.channel.send("Veuillez fournir une commande pour reload !")

        let commandName = args[0].toLowerCase()

        try {
            delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
            bot.commands.delete(commandName)
            const pull = require(`./${commandName}.js`)
            bot.commands.set(commandName, pull)
        } catch (e) {
            return message.channel.send(`Impossible de recharger: \`${args[0].toUpperCase()}\``)
        }

        message.channel.send(`la commande \`${args[0].toUpperCase()}\` a bien été rechargé!`)

    }
}