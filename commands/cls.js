const Discord = require(`discord.js`);
module.exports = {
    name: 'cls',
    description: 'clear cmd',
    async execute(client, message, args){
        const author =  message.author.id;
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();

        if(!args[0]) {
            embed.addField('Error', "<@"+author+">" + " Enter the mount of message");
            message.channel.send(embed);
            return;
        } 

        if(isNaN(args[0])) {
            embed.addField('Error', "<@"+author+">" + " Enter the real number");
            message.channel.send(embed);
            return;
        }
        
        if(args[0] > 10 || args[0] < 1){
            embed.addField('Error', "<@"+author+">" + " Enter 0 < number < 10");
            message.channel.send(embed);
            return;
        }

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages, true);
        }); 
    }
}