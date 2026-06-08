const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "fb",
    alias: ["fbdl", "vidfacebook", "Facebook"],
    react: "📥",
    desc: "Download Facebook Video",
    category: "download",
    filename: __filename
},
async (conn, mek, m, {
    from,
    q,
    reply
}) => {
    try {

        if (!q) {
            return reply("*Please provide a Facebook URL !*");
        }

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        const { data } = await axios.get(
            `https://api.princetechn.com/api/download/facebook?apikey=prince&url=${encodeURIComponent(q)}`
        );

        if (!data.success || !data.result) {
            return reply("*Failed to fetch Facebook video!*");
        }

        const fb = data.result;
        const video = fb.hd_video || fb.sd_video;

        let caption = `
◈ *Title :* ${fb.title || "N/A"}
◈ *Duration :* ${fb.duration || "N/A"}
◈ *Quality :* ${fb.hd_video ? "HD" : "SD"}
`;

        await conn.sendMessage(
            from,
            {
                video: {
                    url: video
                },
                mimetype: "video/mp4",
                caption: caption
            },
            {
                quoted: mek
            }
        );

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (e) {
        console.log(e);
        reply(`*Error :* ${e.message}`);
    }
});