const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const Distube = require('distube');
const distube = new Distube(client, {searchSongs: true, emitNewSongOnly: true });


client.once('ready', () => {
    console.log('Bot is Online now');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot || !message.content.startsWith(prefix))
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(a => a.aliases && a.aliases.includes(command));

    if(!cmd) {
        message.channel.send('No command: ' + command);
        return;
    }
    cmd.execute(client, message, args, command, distube);

});

// Your token bot
client.login('');
