const Discord = require('discord.js');
const figlet = require('figlet')
exports.run = async (bot, message, args) =>
{ 

    figlet.text('Shop!', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 120,
        whitespaceBreak: true
    }, function(err, data) {
        if (err) console.log(err)
        message.channel.send(data, {
            code: 'mb'
        })

        message.channel.send('Vip rang 300,000$', {
            code: 'fix'
        })
        message.channel.send('Tudsz vele a bot nevében írni!', {
            code: 'fix'
        })
        message.channel.send('Ha meg szeretnéd venni csak írd be: ?buy_vip', {
            code: 'fix'
        })
        message.channel.send('Vip+ rang 750,000$', {
            code: 'fix'
        })
        message.channel.send('Napi pénz e?daily2 - 15,000$ helyett 25,000$ ad. + vip cuccai', {
            code: 'fix'
        })
        message.channel.send('Ha meg szeretnéd venni: ?buy_vip+', {
            code: 'fix'
        })
        
        figlet.text('Shop!', {
            fonst: 'Big',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 120,
            whitespaceBreak: true
        }, function(err, data) {
            if(err) console.log(err)
            message.channel.send(data, {
                code: 'mb'
            })
        })

    });

}

module.exports.help = {
    name: "shop",
    aliases: []
}
