const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'avatar',
    aliases: ['avt'],
    execute(client, message, args){
        const member = message.mentions.members.first() || message.guild.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({format: 'jpg', dynamic: true, size: 1024 })

            if (message.deletable) message.delete()

            const avatarEmbed = new MessageEmbed()
                .setImage(URL)
                .setURL(URL)
                .setTitle(`${member.user.username}`)
                .setColor('#3476f9')
                .setTimestamp();
            message.channel.send(avatarEmbed)

            if(!URL) message.channel.send(` ${member.user} Đổi avatar đi con lợn này !`)
    }
}