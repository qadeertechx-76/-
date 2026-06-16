const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "igdl",
    alias: ["insta", "instagram"],
    desc: "Instagram reels/video downloader",
    category: "downloader",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) return reply("📌 Instagram reel/video link give me");

        const api = `https://backend1.tioo.eu.org/api/downloader/igdl?url=${encodeURIComponent(q)}`;

        const res = await axios.get(api);

        const data = res.data?.[0];

        if (!data || !data.status || !data.url) {
            return reply("❌ Video download not find");
        }

        const caption = `
╭┉◉◉◉⍟
┋ *INSTAGRAM DOWNLOADER*
┋
┋ 👤 Creator: ${data.creator}
┋ 📥 Status: Success
┋
┋ ʀᴀʜᴍᴀɴ-ᴍᴅ
┋ powered by rahman-md
╰┉◉◉◉⍟
`;

        // 1st: Thumbnail send
        if (data.thumbnail) {
            await conn.sendMessage(from, {
                image: { url: data.thumbnail },
                caption: "📸 Preview Loading..."
            }, { quoted: mek });
        }

        // 2nd: Video send
        await conn.sendMessage(from, {
            video: { url: data.url },
            caption: caption
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Error: " + e.message);
    }

});