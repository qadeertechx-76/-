const axios = require("axios");
const yts = require("yt-search");
const config = require("../config");
const { cmd, commands } = require("../command");

cmd({
    pattern: "ytdl",
    alias: ["video1", "youtube", "video"],
    react: "🎥",
    desc: "Download YouTube Video & Audio",
    category: "download",
    use: ".ytdl <youtube url or name>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) return reply("*❌ Please provide a YouTube URL or song name!*\nExample:\n.video1 alan walker faded\n.ytdl https://youtu.be/xxx");

        await conn.sendMessage(from, {
            react: { text: "⏳", key: mek.key }
        });

        // Search or direct URL
        let videoUrl

        if (q.includes('youtu')) {
            videoUrl = q.trim()
        } else {
            const search = await yts(q)
            if (!search.videos?.length) return reply("❌ *No results found*")
            videoUrl = search.videos[0].url
        }

        const api = `https://api.princetechn.com/api/download/ytdl?apikey=prince&url=${encodeURIComponent(videoUrl)}`;

        const { data } = await axios.get(api, { timeout: 120000 });

        if (!data.success) {
            return reply("*❌ Failed to fetch video!*");
        }

        const res = data.result;

        const caption =
`📍*ᴛɪᴛʟᴇ: ${res.title}*
⌛ *ᴅᴜʀᴀᴛɪᴏɴ: ${res.duration}*
🎥 *ᴠɪᴅᴇᴏ: ${res.video_quality}*
🎵 *ᴀᴜᴅɪᴏ: ${res.audio_quality}*`

        // Thumbnail + info
        await conn.sendMessage(from, {
            image: { url: res.thumbnail },
            caption: caption
        }, { quoted: mek });

        // Video send
        await conn.sendMessage(from, {
            video: { url: res.video_url },
            mimetype: "video/mp4",
            fileName: `${res.title}.mp4`,
            caption:
`*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ₊‧.°.⋆𝐐𝐀𝐃𝚵𝚵𝐑-𝐊𝐃•˚₊‧⋆.*`
        }, { quoted: mek });

        // Audio send
        await conn.sendMessage(from, {
            document: { url: res.audio_url },
            mimetype: "audio/mpeg",
            fileName: `${res.title}.mp3`
        }, { quoted: mek });

        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});