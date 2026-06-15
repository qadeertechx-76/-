const axios = require("axios");
const { cmd } = require("../command");
const config = require("../config");

cmd({
    pattern: "tiktok2",
    alias: ["tt2", "ttdl2"],
    desc: "Download TikTok video without watermark",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) return reply("❌ TikTok link give me\n\nExample:\n.tiktok https://vt.tiktok.com/xxxx");

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        let api = `https://api.princetechn.com/api/download/tiktok?apikey=prince&url=${encodeURIComponent(q)}`;

        let res = await axios.get(api);

        if (!res.data.success || !res.data.result.video) {
            return reply("❌ Video not finding");
        }

        let data = res.data.result;

        let caption = `
╭━━━━━━━━━━━━━━━━━━━━⍟
┃ 🎵 ᴛɪᴋᴛᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
┃
┃ 👤 Author: ${data.author.name}
┃ 🆔 ID: ${data.id}
┃ ⏱ Duration: ${data.duration}s
┃
┃ 📝 Title: ${data.title}
┃ 
╰━━━━━━━━━━━━━━━━━━━━⍟
`;

        await conn.sendMessage(from, {
            image: {
                url: data.cover
            },
            caption: caption
        }, { quoted: mek });


        await conn.sendMessage(from, {
            video: {
                url: data.video
            },
            caption: "🎬 TikTok Video\n\n> Pᴏᴡᴇʀᴇᴅ Bʏ Qᴀᴅᴇᴇʀ-KD"
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