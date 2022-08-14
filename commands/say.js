module.exports = {
    name: 'say',
    description: 'bot say cmd',
    aliases: ['s'],
    execute: (client, message, args) => {
        if(!message.member.roles.cache.has(role => role.name === "Owner")){
            if(message.deletable) message.delete();
            message.channel.send(args.join(' '));
            return;
        }
        message.channel.send('no');
    }
}