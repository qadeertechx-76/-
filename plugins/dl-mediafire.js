const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "mediafire",
    alias: ["mfire", "mf"],
    desc: "Download MediaFire files",
    category: "download",
    react: "📥",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) return reply("📌 MediaFire link Give me");

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        const api = `https://backend1.tioo.eu.org/MediaFire?url=${encodeURIComponent(q)}`;

        const { data } = await axios.get(api);

        if (!data.status) {
            return reply("❌ File download nahi mili");
        }

        let caption = `
*MEDIAFIRE DOWNLOADER*

📂 *Name:* ${data.filename}
📦 *Size:* ${data.filesizeH}
📁 *Type:* ${data.type}
🗓️ *Upload:* ${data.upload_date}
👤 *Owner:* ${data.owner}

> powered by QADEER-KD
`;

        await conn.sendMessage(from, {
            document: {
                url: data.url
            },
            mimetype: data.mimetype,
            fileName: data.filename,
            caption: caption
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

        reply("❌ Error while downloading file");

    }

});
