const Discord = require('discord.js');
const fs = require('fs');
const money = require('../money.json');
const colors = require('../color.json');
exports.run = async (bot, message, args) =>
{ 

    let embed = new Discord.RichEmbed();
    embed.setTitle('💰🎫ADMIN UTALÁS');
    embed.setColor(colors.zöld);


    

   // if(message.author.id != '575342593630797825' /*|| ''*/) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem rendelkezel 'ADMINISTRATOR' joggal, hogy használhasd a parancsot'!`)
        return message.channel.send(embed);
    }

    let user = message.mentions.members.first() || bot.users.get(args[0]);
    if(!user) {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Nem található ilyen felhasználó!`)
        return message.channel.send(embed);
    }


    if(!args[1]) {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Adj meg egy összeget!`)
        return message.channel.send(embed);
    }

    /*Ne utalhass magadnak pénz*/ //if(user.id === message.author.id) return message.reply('Nem utalhatsz magadnak pénzt')

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.get(user.id).tag,
            money: parseInt(args[1])
        }


        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }   else {
        money[user.id].money += parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err)
        });

    }
    embed.setColor(colors.zöld);
    embed.setDescription(`Admin: ${message.author.tag} jóváírt számdora: ${bot.users.get(user.id).username} ${args[1]}$ -t!`)
    console.log(`${message.author.tag} ADDOLT ${args[1]}$ -t Neki: ${bot.users.get(user.id).username}`)
    return message.channel.send(embed);

}

module.exports.help = {
    name: "adminpay",
    aliases: ['givemoney']
}