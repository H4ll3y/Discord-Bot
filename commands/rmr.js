const Discord = require(`discord.js`);
module.exports = {
    name: 'rmr',
    description: 'remove role cmd',
    execute(client, message, args){
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();
        if(!message.member.roles.cache.has(role => role.name === "Mod") || message.member.roles.highest.position > "Mod"){
            const target = message.mentions.users.first();
            const { guild } = message;
          
            if(!target) {
                embed.addField('Member is not exist', "Try again");
                message.channel.send(embed);
                return;
            }

            const role = guild.roles.cache.find(role => role.name === args[1]);

            if(!role) {
                embed.addField('No role name:', args[1]);
                message.channel.send(embed);
                return;
            }

            const member = guild.members.cache.get(target.id);
            
            if(!member.roles.cache.get(role.id)) {
                embed.addField('No role:', args[1]);
                message.channel.send(embed);
                return;
            }

            member.roles.remove(role);

            embed.addField("UPDATE", args[0] + " is no more " + args[1]);
            message.channel.send(embed);
            return;
        }
        embed.addField('No Permissions', "You aren't MOD");
        message.channel.send(embed);
    }
}