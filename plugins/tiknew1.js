const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok",
    alias: ["tt", "vidttdl"],
    react: "🎵",
    desc: "Download TikTok Video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { q, reply }) => {
    try {

        if (!q) {
            return reply("❌ Please provide a TikTok link.");
        }

        await conn.sendMessage(
            m.chat,
            { react: { text: "⏳", key: mek.key } }
        );

        const api = `https://v2.api-varhad.my.id/download/tt?url=${encodeURIComponent(q)}`;

        const { data } = await axios.get(api);

        if (!data.status) {
            return reply("❌ Failed to fetch TikTok video.");
        }

        const res = data.result;

        const caption = `
🎵 *TIKTOK DOWNLOADER*

📌 *Title:*
${res.title || "No Title"}

> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 ₊‧.°.⋆𝐐𝐀𝐃𝚵𝚵𝐑-𝐊𝐃•˚₊‧⋆.
`;

        await conn.sendMessage(
            m.chat,
            {
                image: { url: res.thumbnail },
                caption
            },
            { quoted: mek }
        );

        await conn.sendMessage(
            m.chat,
            {
                video: { url: res.mp4_hd || res.mp4 },
                mimetype: "video/mp4",
                caption: "🎥 TikTok Video Downloaded Successfully"
            },
            { quoted: mek }
        );

        await conn.sendMessage(
            m.chat,
            {
                audio: { url: res.mp3 },
                mimetype: "audio/mpeg",
                ptt: false
            },
            { quoted: mek }
        );

        await conn.sendMessage(
            m.chat,
            { react: { text: "✅", key: mek.key } }
        );

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});
