const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok",
    alias: ["tt", "tikdl"],
    desc: "Download TikTok video",
    category: "downloader",
    react: "⬇️",
    filename: __filename
}, async (conn, mek, m, { from, quoted, args, reply }) => {

    try {

        if (!args[0]) {
            return reply("❌ Please provide TikTok link");
        }

        let url = args[0];

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });


        let api = `https://axlyapi.qzz.io/download/tiktok?url=${encodeURIComponent(url)}`;

        let { data } = await axios.get(api);

        if (!data.status) {
            return reply("❌ Failed to fetch TikTok video");
        }


        let result = data.result.data;

        let caption = `
‎*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇┄─̇─̣┄᛭*
‎*┋ ─̣─̇─̣╌⊰ ϙᴀᴅᴇᴇʀ-ᴋᴅ ⊱─̣─̇─̣╌*
‎*┋┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇┄─̇─̣┄᛭*
‎*┋*❀ 📌 *ᴛɪᴛʟᴇ:* ${result.title || "No title"}
‎*┋*❀ 👤 *ᴀᴜᴛʜᴏʀ:* ${result.author?.nickname || "Unknown"}
‎*┋*❀ 👁️ *ᴠɪᴇᴡs:* ${result.play_count || "0"}
‎*┋*❀ ❤️ *ʟɪᴋᴇs:* ${result.digg_count || "0"}
‎*┋*❀ 💬 *ᴄᴏᴍᴍᴇɴᴛs:* ${result.comment_count || "0"}
‎*┋*❀ 
‎*╰┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇┄─̇─̣┄᛭*
`;

        await conn.sendMessage(from, {
            image: { url: result.cover },
            caption: caption
        }, { quoted: mek });


        await conn.sendMessage(from, {
            video: { url: result.play },
            caption: "*_✎﹏ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ x ϙᴀᴅᴇᴇʀ_*"
        }, { quoted: mek });


        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });


    } catch (e) {

        console.log(e);

        reply("❌ Error: " + e.message);

    }

});
