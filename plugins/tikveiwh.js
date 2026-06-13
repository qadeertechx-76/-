const axios = require("axios");
const config = require("../config");
const { cmd } = require("../command");

cmd({
    pattern: "tiktokviews",
    alias: ["ttviews", "views"],
    react: "👀",
    desc: "Increase TikTok Video Views",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) {
            return reply("❌ Please provide TikTok video URL\n\nExample:\n.tiktokviews https://vt.tiktok.com/ZSaaagyHA/");
        }

        const api = `https://omegatech-api.dixonomega.tech/api/tools/tiktok-views?url=${encodeURIComponent(q)}`;

        const { data } = await axios.get(api);

        if (!data.status) {
            return reply("❌ Request failed");
        }

        let caption = `
╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉⍟
│👀 *TIKTOK VIEWS*
│
│✅ Status : Success
│🎬 Video : ${data.videoUrl}
│🚀 Response : ${data.response?.success || "Success"}
│🤖 Source : ʀᴀʜᴍᴀɴ-ᴍᴅ
│🕓 Time : ${data.timestamp}
╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉⍟
`;

        await conn.sendMessage(
            from,
            { text: caption },
            { quoted: mek }
        );

    } catch (e) {

        console.log(e);
        reply("❌ Error: " + e.message);

    }
});
