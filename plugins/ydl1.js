const axios = require("axios");
const yts = require("yt-search");
const config = require("../config");
const { cmd } = require("../command");

cmd({
    pattern: "play",
    alias: ["ytmp3", "song"],
    react: "🎵",
    desc: "Download YouTube Audio",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) return reply("❌ Please give YouTube URL or song name");

        let url = q;

        // Search name support
        if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
            let search = await yts(q);
            if (!search.videos.length) return reply("❌ Song not found");
            url = search.videos[0].url;
        }

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        let api = `https://arslan-apis-v2.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`;

        let res = await axios.get(api);

        if (!res.data.status) {
            return reply("❌ Download failed");
        }

        let data = res.data.result;

        let title = data.metadata.title;
        let audioUrl = data.download.url;

        // Thumbnail first
        let thumb = `https://i.ytimg.com/vi/${url.split("v=")[1]?.split("&")[0] || ""}/hqdefault.jpg`;

        await conn.sendMessage(from, {
            image: { url: thumb },
            caption: `
🎵 *YOUTUBE AUDIO DOWNLOADER*
🎧 Title: ${title}
📀 Quality: ${data.download.quality}
> Powered by Qadeer-KD
            `
        }, { quoted: mek });


        // Audio send after info
        await conn.sendMessage(from, {
            audio: {
                url: audioUrl
            },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`
        }, { quoted: mek });


        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });


    } catch (e) {

        console.log(e);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        reply("❌ Error: " + e.message);
    }
});
