const Discord = require(`discord.js`);
const ms = require(`ms`);
module.exports = {
    name: "mute",
    description: "mute cmd",
    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();

        const embed2 = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();

        if(!message.member.roles.cache.has(role => role.name === "Mod") || message.member.roles.highest.position > "Mod"){
            const target = message.mentions.members.first();
            const { guild } = message;
            const member = guild.members.cache.get(target.id);
            const muteRoles = guild.roles.cache.find(role => role.name === "Muted");
            
            const author =  message.author.id;

            if(member.roles.cache.get(muteRoles.id)){
                embed.addField('Already muted:', 'Muted');
                message.channel.send(embed);
                return;
            }

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

            if(args[1]){
                member.roles.add(muteRoles.id);
                embed.addField('OKay', "<@" + member + ">" + " was muted by " + "<@" + author + ">" + " for " + ms(ms(args[1])));
                message.channel.send(embed);
                setTimeout(function(){
                    member.roles.remove(muteRoles.id);
                    embed2.addField('OKay', "<@" + member + ">" + " no longer muted");
                    message.channel.send(embed2);
                }, ms(args[1]));
                return;
            }
  
            embed.addField('OKay', "<@" + member + ">" + " was muted by " + "<@" + author + ">");
            message.channel.send(embed);
            member.roles.add(muteRoles.id);
            return;
        }
        embed.addField('No Permissions', "You aren't MOD");
        message.channel.send(embed);
    }
}