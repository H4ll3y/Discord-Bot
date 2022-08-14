const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Discord = require(`discord.js`);
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = {
    name: 'play',
    description: 'play music yt cmd',
    aliases: ['stop', 'skip', 'loop', 'offloop', 'queue', `3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`],
    execute(client, message, args, cmd, distube) {
        const voiceChannel = message.member.voice.channel;
        const embed = new Discord.MessageEmbed()
            .setColor('#3476f9')
            .setTimestamp();
        
        if(!voiceChannel){
            embed.addField('Error', "Go to voice room");
            message.channel.send(embed);
            return;
        }

        if(cmd === "play"){
            if(!args.length){
                embed.addField('Error', "Name song");
                message.channel.send(embed);
                return;
            }
            distube.play(message, args.join(" "));
        }
        
        if(cmd === "stop") message.member.voice.channel.leave()
    
        if(cmd === "skip") distube.skip(message);
    
        if(cmd === "loop") {
            distube.setRepeatMode(message, parseInt(args[0]));
            message.reply('Đã bật loop');
        }

        if(cmd === "offloop"){
            distube.setRepeatMode(message);
            message.reply('Đã tắt loop');
        }
            
        if(cmd === "queue") {
            let queue = distube.getQueue(message);
            message.channel.send('Danh sách hàng đợi :\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n"));
        }
    
        if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(cmd)) {
            let filter = distube.setFilter(message, cmd);
            message.channel.send("Current queue filter: " + (filter || "Off"));
        }


        distube
            .on("playSong", (message, queue, song) => message.channel.send(
                `Đang phát \`${song.name}\` - \`${song.formattedDuration}\`\nBy User: ${song.user}\n${status(queue)}`
            ))
            .on("addSong", (message, queue, song) => message.channel.send(
                `Đã thêm :${song.name} - \`${song.formattedDuration}\` vào hàng đợi ${song.user}`
            ))
            .on("playList", (message, queue, playlist, song) => message.channel.send(
                `Phát \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nBy User: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
            ))
            .on("addList", (message, queue, playlist) => message.channel.send(
                `Đã thêm :\`${playlist.name}\` playlist (${playlist.songs.length} songs) vào hàng đợi\n${status(queue)}`
            ))
            .on("searchResult", (message, result) => {
                let i = 0;
                message.channel.send(`**Chọn bài hát**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n`);
            })
            .on("searchCancel", (message) => message.channel.send(`Đã hủy vì chưa chọn 1 trong số các bài hát ở trên hoặc chọn sai`))
            .on("error", (message, e) => {
                console.error(e)
                message.channel.send("Lỗi: " + e);
            });
    }
}

