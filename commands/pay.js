const money = require('../money.json')
const fs = require('fs')
const discord = require('discord.js');
const colors = require('../color.json')
exports.run = async (bot, message, args, moment) =>
{ 


    let embed = new discord.RichEmbed();
    embed.setTitle(`💰 UTALÁS`)
    embed.setColor(colors.kék)

    if(message.author.id === '648150131354632192') {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem használhatod ez a parancsot!`)
        return message.channel.send(embed);
    }

let user = message.mentions.users.first() || bot.users.get(args[0]);
if(!user) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Nincs ilyen felhasználó!`)
    return message.channel.send(embed)
}

if(user.id === message.author.id) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Nem utalhatsz magadnak pénzt!`)
    return message.channel.send(embed)
}

if(!args[1]) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Kérlek határozd meg mennyi pénzt szeretnél át utalni!`)
    return message.channel.send(embed)
}

if(!money[message.author.id]) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Nem rendelkezel ennyi pénzel!: ${args[1]}!`)
    return message.channel.send(embed)
}

if(parseInt(args[1]) > money[message.author.id].money) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Nem rendelkezel ennyi pénzel!: ${args[1]}!`)
    return message.channel.send(embed)
}
if(parseInt(args[1]) < 100) {
    embed.setColor(colors.világos_piros)
    embed.setDescription(`${message.author.tag} Nem utalhatsz 100$ alatt!`)
    return message.channel.send(embed)
}

if(!money[user.id]) {

    money[user.id] = {
        name: bot.users.get(user.id).tag,
        money: parseInt(args[1])
    }

    money[message.author.id].money -= parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });

} else {

    money[user.id].money += parseInt(args[1]);

    money[message.author.id].money -= parseInt(args[1]);

    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
        if(err) console.log(err)
    });

}
    embed.setDescription(`${message.author.tag} át utalt ${args[1]}$ neki: ${bot.users.get(user.id).username}`)
    return message.channel.send(embed)

}

module.exports.help = {
    name: "pay",
    aliases: []
}
