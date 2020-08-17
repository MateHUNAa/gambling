const Discord = require('discord.js');
const money = require('../money.json')
const colors = require('../color.json')
const fs = require('fs')
exports.run = async (bot, message, args) =>
{ 

    let embed = new Discord.RichEmbed();
    embed.setTitle('Bolt')

    let myRole = message.member.roles.find(r => r.name === "VIP+")
    if(message.member.roles.some(r=>["VIP", "VIP+"].includes(r.name)) ) {
    embed.setDescription('Te már rendelkezel ezzel a rangal vagy nagyobbal')
    embed.setColor(colors.világos_piros)
    return message.channel.send(embed)
    } else {
        if (money[message.author.id].money >= '300000') {
            message.member.addRole('744877508830298124').catch(console.error);
            
            money[message.author.id].money -= '300000';
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
            })

            embed.setColor(colors.zöld)
            embed.setDescription(message.author.tag + ' Sikeressen meg vetted a VIP rangot!')
            return message.channel.send(embed)
        } else {
            if (money[message.author.id].money < '300000') {
                embed.setColor(colors.világos_piros)
                embed.setDescription('Te nem rendelkezel 300,000$ -al.')
                return message.channel.send(embed)
            }
        }
    }
}

module.exports.help = {
    name: "buy_vip",
    aliases: ["bolt"]
}
