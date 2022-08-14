const Discord = require(`discord.js`);
module.exports = {
    name: 'ping',
    description: 'ping cmd',
    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();
        embed.addField('PING', "${message.author} ping: ${client.ws.ping} ms");
        message.channel.send(embed);
    }
}