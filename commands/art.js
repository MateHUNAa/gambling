const Discord = require('discord.js');
const emo = require('../emoji.json');
const szinek = require('../color.json');
const moment = require('moment')
var figlet = require('figlet')
const colors = require('../color.json')
exports.run = async (bot, message, args, prefix) =>
{ 
    let embed = new Discord.RichEmbed();

    if(message.author.id === '648150131354632192') {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem használhatod ez a parancsot!`)
        return message.channel.send(embed);
    }

    if(!args.join(' ')) {
        message.delete()
        return message.channel.send('Adj meg egy szöveget').then(r => r.delete(3000))
    }
    figlet.text(args.join(' '), {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 1000,
        whitespaceBreak: true
    }, function(err, data) {
        if(err) return console.dir(err)
        message.channel.send(data, {
            code: 'mb'
        })
})
}

module.exports.help = {
    name: "art",
    aliases: ["ascii"]
}
