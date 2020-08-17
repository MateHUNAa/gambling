const Discord = require("discord.js");
const fs = require("fs");
const money = require("../money.json");
const ms = require("parse-ms");
const cooldowns = require("../cooldowns.json");
const colors = require('../color.json');


exports.run = async (bot, message, args) =>
{ 


    let timeout = 86400000;
    let reward = 15000;

    let embed = new Discord.RichEmbed();
    embed.setTitle("NAPI JUTALOM!");
    if(message.author.id === '648150131354632192') {
        embed.setColor(colors.világos_piros);
        embed.setDescription(`${message.author.tag} Te nem használhatod ez a parancsot!`)
        return message.channel.send(embed);
    }

    if(!money[message.author.id]) {

        money[message.author.id] = {
            name: bot.users.get(message.author.id).tag,
            money: reward
        }
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

        if(!cooldowns[message.author.id]) {
            cooldowns[message.author.id] = {
                name: bot.users.get(message.author.id).tag,
                hours: Date.now()
            }
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);
            });
        } else {
            cooldowns[message.author.id].hours = Date.now();
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);
            });
        }

        embed.setDescription(`Napi jutalmad: ${reward}. Jelenlegi pénzed: ${money[message.author.id]
        .money}.`);
        embed.setColor("00ff00");
        return message.channel.send(embed);

    } else {
        if(!cooldowns[message.author.id]) {
            cooldowns[message.author.id] = {
                name: bot.users.get(message.author.id).tag,
                hours: Date.now()
            }
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);
            });

            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });

            embed.setDescription(`Napi jutalmad: ${reward}. Jelenlegi pénzed: ${money[message.author.id]
                .money}.`);
            embed.setColor("00ff00");
            return message.channel.send(embed);
        
        } else {
            
            if(timeout - (Date.now() - cooldowns[message.author.id].hours) > 0) {

                let time = ms(timeout - (Date.now() - cooldowns[message.author.id].hours));

                embed.setColor("ff0000");
                embed.setDescription(`**Te már össz szedted a jutalmad!**`);
                embed.addField(`Ennyi idő míg újra összed tudod szedni:`, ` ${time.hours}óra ${time.minutes}p ${time.seconds}mp`);
                return message.channel.send(embed);

            } else {

                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if(err) console.log(err);
                });

                cooldowns[message.author.id].hours = Date.now();
                fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });

                embed.setDescription(`Napi jutalmad: ${reward}. Jelenlegi pénzed: ${money[message.author.id]
                    .money}.`);
                    embed.setColor("00ff00");
                    return message.channel.send(embed);
            }
        }



    }
    

    
    
}

module.exports.help = {
    name:'daily',
    aliases: []
}