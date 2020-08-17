const fs = require('fs')
const money = require('../money.json')
const Discord = require('discord.js');
const colors = require('../color.json') 
exports.run = async (bot, message, args, moment) =>
{ 

    let embed = new Discord.RichEmbed();
    embed.setTitle('BALANCE')
    embed.setColor(colors.pink)

    if(message.author.id === '648150131354632192') {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem használhatod ez a parancsot!`)
        return message.channel.send(embed);
    }

if(!args[0]) {
    var user = message.author;
} else {
    var user =message.mentions.users.first() || bot.users.get(args[0]);
}

if(!money[user.id]) {
    money[user.id] = {
        name:bot.users.get(user.id).tag,
        money: 0
    }
    fs.writeFile('./money.json', JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });
}
embed.setDescription(`${bot.users.get(user.id).username} nak/nek van $${money[user.id].money} ja.`)
return message.channel.send(embed);

}

module.exports.help = {
    name:'balance',
    aliases: ['bal']
}
