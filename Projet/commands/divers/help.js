const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        usage: "(command)",
        category: "divers",
        description: "Affiche toutes les commandes du bot.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if (!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`Ce sont les commandes disponibles pour le bot  ${message.guild.me.displayName}\nLe prefix du bot est: **${prefix}**\n\nPour plus d'info :\nx.help <nom_de_la_commande>\n`)
            embed.setFooter(`© ${message.guild.me.displayName} | totales des commandes: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1, 2).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch (e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("Commande Invalide.").setDescription(`fait \`${prefix}help\` pour la liste des commandes.`))
            command = command.config

            embed.setDescription(stripIndents`Le prefix du bot est: \`${prefix}\`\n\nPour plus d'info :\nx.help <nom_de_la_commande>\n
            **Commande:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "Aucune description fournie."}
            **Utilisation:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Pas d'utilisation"}
            **Accessible par:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`)

            return message.channel.send(embed)
        }
    }
}