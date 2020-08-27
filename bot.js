const commando = require('discord.js-commando');
const discord = require('discord.js');
const fs = require('fs')
const configs = require('./configs.json')
var bot = new commando.Client ({
    disabledEvryone: true,
    unknownCommandResponse: false
});
let cooldown = new Set();
let cdsec = 3;

const embed = new discord.RichEmbed();
embed.setTitle(`:BOT ERROR:`)

bot.login(process.env.token)

bot.on('ready', () => {
    console.log(`[${bot.user.username}] Elindult ennyi szerveren ${bot.guilds.size}`)
    console.log('\n \n \n \n \n \n \n \n \n ')
})



//READ COMMAND FOLDER

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

fs.readdir("./commands/", (err,files) => {
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        console.log('nem találni ilyen parancsot!')
        return
    }

    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} Betöltve!`)
        bot.commands.set(props.help.name, props)
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        })
    })
})

//FILE SYSTEM
bot.on('message', message => {


    let prefixek = JSON.parse(fs.readFileSync("./prefixek.json", "utf8"));
    if(!prefixek[message.guild.id]) {
        prefixek[message.guild.id] = {
            prefix: configs.prefix
        }
    }
    let prefix = prefixek[message.guild.id].prefix;

    if (!message.content.startsWith(prefix)) return;
    if (cooldown.has(message.author.id)) {
        message.delete()
        embed.setColor(colors.sötét_piros)
        embed.setDescription(`${message.author.tag} Várnod kell 3mp- et hogy használhasd a következő parancsot!`)
        embed.setFooter(`error: \`LIGHT ERROR\``, message.author.displayAvatarURL)
        return message.channel.send(embed)
    }
        cooldown.add(message.author.id);

    //ARGS

    let messageArry = message.content.split(" ");
    let cmd = messageArry[0];
    let args = messageArry.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdsec * 1000)

    //CHECK CHANNEL TYPE

    if(message.channel.type === 'dm') return;
    if(message.author.bot) return;

    //CHECK PREFIX, DEFINE ARGS & COMMAND

    // RUN COMMANDS 

   if(bot.commands.has(cmd)) {
       command = bot.commands.get(cmd);
   } else if (bot.aliases.has(cmd)) {
       commands = bot.commands.get(bot.aliases.get(cmd));
   }
    try {
        command.run(bot, message, args);
    } catch(e) {
        return
    }
});

//-------------------------------------
