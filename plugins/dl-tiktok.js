const { cmd } = require('../command');
const axios = require('axios');

// ===== TikTok API (OLD - No Change) =====
async function tiktok(url) {
    try {
        let res = await axios.get(`https://tikwuyfs97m.com/api/?url=${url}`);
        return res.data.data.play;
    } catch {
        return null;
    }
}

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    desc: "Download TikTok video",
    category: "downloader",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, args, reply }) => {

    
    let video = await tiktok(url);

    if (!video) return reply("❌ Download failed");

    return await conn.sendMessage(from, {
        video: { url: video },
        caption: "✅ TikTok Downloaded"
    }, { quoted: mek });
});
