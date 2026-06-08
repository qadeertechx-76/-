const axios = require("axios");
const config = require("../config");
const { cmd, commands } = require("../command");

cmd({
    pattern: "ytdl",
    alias: ["yt1", "youtube", "yt", "video"],
    react: "🎥",
    desc: "Download YouTube Video & Audio",
    category: "download",
    use: ".ytdl <youtube url>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) return reply("*❌ Please provide a YouTube URL!*");

        await conn.sendMessage(from, {
            react: { text: "⏳", key: mek.key }
        });

        const api = `https://api.princetechn.com/api/download/ytdl?apikey=prince&url=${encodeURIComponent(q)}`;

        const { data } = await axios.get(api);

        if (!data.success) {
            return reply("*❌ Failed to fetch video!*");
        }

        const res = data.result;

        let caption = `
*🎬 YOUTUBE DOWNLOADER*

*📌 Title :* ${res.title}
*⏱ Duration :* ${res.duration}
*🎥 Video Quality :* ${res.video_quality}
*🎵 Audio Quality :* ${res.audio_quality}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: res.thumbnail },
                caption: caption
            },
            { quoted: mek }
        );

        // Video Send
        await conn.sendMessage(
            from,
            {
                video: { url: res.video_url },
                mimetype: "video/mp4",
                fileName: `${res.title}.mp4`,
                caption: `🎥 ${res.title}`
            },
            { quoted: mek }
        );

        // Audio Send
        await conn.sendMessage(
            from,
            {
                document: { url: res.audio_url },
                mimetype: "audio/mpeg",
                fileName: `${res.title}.mp3`
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
