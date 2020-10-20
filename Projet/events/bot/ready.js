module.exports = bot => {
    console.log(`${bot.user.username} est en ligne !`)

    var i = 0
    setInterval(function () {
        if (i === 0) {
            bot.user.setActivity("tout les messages !", { type: "WATCHING" });
            i = 2
        }
        
        else if (i === 2) {
            bot.user.setActivity("X over", { type: "LISTENING" });
            i = 0
        }


    }, 5000)

}