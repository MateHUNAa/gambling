const Discord = require('discord.js');

const colors = require('../color.json')

exports.run = async (bot, message, args, moment) =>
{ 

    const embed = new Discord.RichEmbed()
    .setColor(colors.világos_zöld)
    .setTitle('PARANCSOK')
    .addField('**e?mb**', 'Játék')
    .addField('**e?balance**', 'le írja mennyi pénzed van.')
    .addField('**e?pay**', 'Át tudsz utali pénzt!')
    .addField('**e?money**', `Óránkénti pénz`)
    .addField('**e?daily**', 'Napi pénz')
    .addField('**e?shop**', 'Meg mutatja mit tudsz venni')
message.channel.send(embed)
}

module.exports.help = {
    name: "help",
    aliases: []
}
