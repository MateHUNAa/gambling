const Discord = require('discord.js');
exports.run = async (bot, message, args) =>
{
    if(message.member.roles.some(r=>["VIP", "VIP+"].includes(r.name)) ) {
       message.channel.send(message.author.username + ': ' + args, {
           code: 'fix'
       })
      } else {
       message.channel.send('Te nem rendelkezel Vip vagy Vip+ rangal!')
      }
    }
module.exports.help = {
    name: "say",
    aliases: ["p"]
}
