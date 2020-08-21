const Discord = require('discord.js');
const money = require('../money.json')
const fs = require('fs')
const colors = require('../color.json')
exports.run = async (bot, message, args) =>
{
    

    let embed = new Discord.RichEmbed();

    /*if(message.author.id === '648150131354632192') {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem használhatod ez a parancsot!`)
        return message.channel.send(embed);
    }*/

    var maxBet = 100000; 

    if(!money[message.author.id] || money[message.author.id].money <= 0) {
        embed.setDescription(`${message.author.tag} Te nem rendelkezel ennyi pénzel!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    if(!args[0]) {
        embed.setDescription(`${message.author.tag} Kérlek tedd meg a téted!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    if(args[0].toLowerCase() == "all") args[0] = money[message.author.id].money;

    try {
        var bet = parseFloat(args[0]);
    } catch {
        embed.setDescription(`${message.author.tag} Csak egész számokat adhatsz meg!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    if(bet != Math.floor(bet)) {
        embed.setDescription(`${message.author.tag} Csak egész számokat adhatsz meg!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    if(money[message.author.id].money < bet ) {
        embed.setDescription(`${message.author.tag} Te nem rendelkezel ennyi pénzel!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    if(bet > maxBet) {
        embed.setDescription(`${message.author.tag} Maximum tét az ${maxBet.toLocaleString()}!`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    }

    let chances = ["win", "lose"]
    var pick = chances[Math.floor(Math.random() * chances.length)];

    if(pick == "lose") {
        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        })
        embed.setDescription(`${message.author.tag} Te vesztettél. Új egyeleged: ${money[message.author.id].money}`)
        embed.setColor(colors.világos_piros)
        return message.channel.send(embed)
    } else {
            money[message.author.id].money += bet;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            })
            
            embed.setDescription(`${message.author.tag} Te nyertél. Új egyeleged: ${money[message.author.id].money}`)
            embed.setColor(colors.zöld)
            message.channel.send(embed)
    }

}

module.exports.help = {
    name:'mb',
    aliases: ['gambel']
}