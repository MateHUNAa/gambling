const Discord = require('discord.js');
const fs = require('fs')
const money = require('../money.json')
const colors = require('../color.json')
exports.run = async (bot, message, args) =>
{ 

    let embed = new Discord.RichEmbed();
    embed.setTitle(`➖💰🎟️ ADMIN MINUS`)
    embed.setColor(colors.lila)

    if(message.author.id != '575342593630797825') {
        embed.setColor(colors.világos_piros)
        embed.setDescription(`${message.author.tag} Te nem használhatod ezt a parancsot!`)
        return message.channel.send(embed)
    }

    let user = message.mentions.members.first() || bot.users.get(args[0]);
    if(!user) {
        embed.setColor(colors.világos_piros)
        embed.setDescription(`${message.author.tag} Nem található ilyen felhasználó!`)
        return message.channel.send(embed)
    }

    if(!args[1]) {
        embed.setColor(colors.világos_piros)
        embed.setDescription(`${message.author.tag} Kérlek adj meg egy összeget!`)
        return message.channel.send(embed)
    }

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.get(user.id).tag,
            money: parseInt(args[1])
        }


        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }   else {
        money[user.id].money -= parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }
    embed.setColor(colors.lila)
    embed.setDescription(`Admin: ${message.author.username} elvett töled: ${bot.users.get(user.id).username} ennyit: ${args[1]}$ -t.`)
    console.log(`${message.author.tag} Levont tőle: ${bot.users.get(user.id).username} ennyit: ${args[1]}$ -t.`)
    return message.channel.send(embed)

}

module.exports.help = {
    name: "adminminus",
    aliases: ['removemoney']
}