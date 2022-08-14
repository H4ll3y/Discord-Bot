const Discord = require(`discord.js`);
module.exports = {
    name: "ban",
    description: "ban cmd",
    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();
        if(!message.member.roles.cache.has(role => role.name === "Mod") || message.member.roles.highest.position > "Mod"){
            const target = message.mentions.members.first();

            if(!target){
                embed.addField('Member is not exist', "Try again");
                message.channel.send(embed);
                return;
            }

            if(message.member.roles.highest.position >= target.roles.highest.position){
                embed.addField('No Permissions', "Your role is not higher");
                message.channel.send(embed);
                return;
            }

            const { guild } = message;
            const member =  guild.members.cache.get(target.id);
            const author =  message.author.id;
            embed.addField('OKay', "<@" + member + ">" + " was banned by " + "<@" + author + ">");
            message.channel.send(embed);
            member.ban();
            return;
        }
        embed.addField('No Permissions', "You aren't MOD");
        message.channel.send(embed);
    }
}