const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttdl", "tiktokdl"],
    desc: "Download TikTok video with audio",
    category: "download",
    react: "🎵",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {

    try {

        if (!q) return reply("❌ Please send TikTok URL");

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });


        let api = `https://api.princetechn.com/api/download/tiktokdlv4?apikey=prince&url=${encodeURIComponent(q)}`;

        let response = await axios.get(api);

        if (!response.data.success || response.data.status !== 200) {
            return reply("❌ TikTok download failed");
        }


        let result = response.data.result;


        let caption = `
*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*│•*👤 *ᴜsᴇʀɴᴀᴍᴇ:* ${result.username}
*│•*📝 *ᴛɪᴛʟᴇ:* ${result.title}‎
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
`;


        // Thumbnail + Info
        await conn.sendMessage(from, {
            image: {
                url: result.thumbnailUrl
            },
            caption: caption
        }, { quoted: mek });



        // Video Send
        await conn.sendMessage(from, {
            video: {
                url: result.videoUrl
            },
            mimetype: "video/mp4",
            caption: "*_✎﹏ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ x ϙᴀᴅᴇᴇʀ-ᴋᴅ_-*"
        }, { quoted: mek });



        // Audio Send
        await conn.sendMessage(from, {
            audio: {
                url: result.audioUrl
            },
            mimetype: "audio/mpeg",
            fileName: "tiktok-audio.mp3"
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

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

    }

});