const { arslan } = require('../arslan');
const axios = require('axios');
const { fakevCard } = require('../lib/fakevCard');

// Cobalt API - free, no key needed
const COBALT_API = "https://api.cobalt.tools/api/json";

const AXIOS_DEFAULTS = {
    timeout: 30000,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

// ❤️ React helper
async function react(sock, mek, emoji) {
    await sock.sendMessage(mek.key.remoteJid, {
        react: { text: emoji, key: mek.key }
    });
}

// 📦 Song info box
function songBox(title, url) {
    return `
‎*╔ஜ۩▒█ *ᴀʀꜱʟᴀɴ ᴍᴜsɪᴄ* █▒۩ஜ╗*
*|* *_ʏᴛ ᴍᴘ3 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ_*
*|┉◉┉━•⟢*
*|▸ 🎵 ᴛɪᴛʟᴇ:* ${title}
*|▸ 🔗 ʟɪɴᴋ:* ${url}
*╰━━━━━━━━━━⊷*`;
}

// 🎵 Download MP3 using Cobalt
async function downloadMP3(ytUrl) {
    const res = await axios.post(COBALT_API, {
        url: ytUrl,
        audioFormat: "mp3",
        audioBitrate: 128,
        filenameStyle: "pretty"
    }, AXIOS_DEFAULTS);
    
    if (res.data?.status === "success" && res.data.url)
        return res.data;
    throw new Error("Download failed");
}

// 🔍 Get YT link from search query
async function getYTLink(query) {
    const searchRes = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
    const videoId = searchRes.data.match(/"videoId":"([^"]+)"/)[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
}

// ===============================
// 🎵 COMMAND:.song <name|link>
// ===============================
arslan({
    pattern: "song",
    alias: ["mp3", "play", "music"],
    desc: "Search & download YouTube songs as MP3",
    category: "downloader",
    react: "🎵",
    filename: __filename
}, async (sock, mek, m, { reply }) => {

    try {
        const text = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
        const query = text.split(" ").slice(1).join(" ").trim();

        if (!query)
            return reply("⚠️ *Usage:*\n.song <song name or yt link>\n\n*Example:* .song Atif Aslam Tera Hoon");

        await react(sock, mek, "🔍");

        let songUrl = query;
        
        // Agar link nahi hai to search karo
        if (!query.startsWith("http")) {
            songUrl = await getYTLink(query);
        }

        await react(sock, mek, "⏳");

        // MP3 download
        const file = await downloadMP3(songUrl);

        await sock.sendMessage(m.chat, {
            audio: { url: file.url },
            mimetype: "audio/mpeg",
            fileName: `${file.filename || "song.mp3"}`,
            caption: songBox(file.filename || "YouTube Audio", songUrl)
        }, { quoted: fakevCard });

        await react(sock, mek, "✅");

    } catch (e) {
        console.error(e);
        await react(sock, mek, "❌");
        reply("❌ Song download failed! Link ya name check karo.");
    }
});