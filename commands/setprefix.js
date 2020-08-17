const Discord = require('discord.js');
const fs = require('fs')
const configs = require('../configs.json')
const colors = require('../color.json')

exports.run = async (bot, message, args) =>
{
    
    let embed = new Discord.RichEmbed();

    let prefixek = JSON.parse(fs.readFileSync("./prefixek.json", "utf8"));
    if(!prefixek[message.guild.id]) {
        prefixek[message.guild.id] = {
            prefix: configs.prefix
        }
    }
    let prefix = prefixek[message.guild.id].prefix;

    if(!message.member.hasPermission("MANAGE_GUILD")) {
        embed.setColor(colors.világos_piros)
        embed.setDescription(`${message.author.tag} Te nem tudod meg változtatni a bot prefixét!`)
        return message.channel.send(embed)
    }

    if(!args[0]) {
        embed.setColor(colors.világos_piros)
        embed.setDescription(`${message.author.tag} Kérlek adj meg egy prefixet!`)
        return message.channel.send(embed)
    }

    prefixek[message.guild.id] = {
        prefix: args[0]
    }

    fs.writeFile("./prefixek.json", JSON.stringify(prefixek), (err) => {
        if (err) console.log(err)
    })

    
    embed.setColor(colors.világos_zöld)
    embed.setTitle('PREFIX VÁLTOZOTT!')
    embed.setDescription(`A prefix erre változott: ${args[0]}`)

    message.channel.send(embed)

}

module.exports.help = {
    name: "setprefix",
    aliases: ["prefix"]
}
