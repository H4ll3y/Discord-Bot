const googleIt = require('google-it')
const Discord = require(`discord.js`);

module.exports = {
    name: 'google',
    description: 'google search cmd',
    aliases: ['gg'],
    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setTitle("Google Search Results")
            .setColor('#3476f9')
            .setTimestamp();

        googleIt({'query': args.join(' ')}).then(results => {
            results.forEach(function(item, index) { 
                embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
            });
            message.channel.send(embed);
        }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
        });
    }
}


