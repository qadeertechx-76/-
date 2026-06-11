const axios = require("axios");
const yts = require("yt-search");
const { cmd } = require("../command");

cmd({
    pattern: "song",
    alias: ["play", "ytmp3", "music", "audio"],
    react: "🎵",
    desc: "Download YouTube audio by name or URL",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song name or YouTube URL");

        let ytUrl = q;

        // If URL not to search it
        if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
            const search = await yts(q);
            if (!search.all.length) return reply("❌ Song not found");

            ytUrl = search.all[0].url;
        }

        const api = `https://api.azbry.com/api/download/ytmp3?url=${encodeURIComponent(ytUrl)}`;
        const { data } = await axios.get(api);

        if (!data.status) return reply("❌ Failed to fetch audio");

        const res = data.result;

        let caption = `
╭━━━━━━━━━━━━━━━⪼
┃⫸ *Title:* ${res.title}
┃⫸ *Format:* ${res.format}
╰━━━━━━━━━━━━━━━⪼
`;

        await conn.sendMessage(
            from,
            {
                image: { url: res.thumbnail },
                caption
            },
            { quoted: mek }
        );

        await conn.sendMessage(
            from,
            {
                audio: { url: res.download },
                mimetype: "audio/mpeg",
                fileName: `${res.title}.mp3`
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});