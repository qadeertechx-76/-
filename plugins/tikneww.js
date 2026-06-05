const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "tiktok",
    alias: ["tt", "ttvideo5"],
    desc: "Download TikTok HD video + Audio",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a TikTok link*
Example:
.tiktok5 https://vt.tiktok.com/ZSaaagyHA/`)

        if (!q.includes('tiktok.com') && !q.includes('vt.tiktok')) {
            return reply("❌ *Please provide a valid TikTok link*")
        }

        await reply("⏳ *Fetching TikTok data...*")

        const api = `https://api.nabees.online/api/tiktok?url=${encodeURIComponent(q)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.data?.formats?.length) {
            return reply("❌ *Failed to fetch TikTok data*")
        }

        const { title, author, thumbnail, formats } = res.data.data

        // HD no watermark video
        const hdVideo = formats.find(f => f.quality === 'hd_no_watermark' && f.type === 'video')
        // Audio
        const audio = formats.find(f => f.type === 'audio')

        const caption =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* 🎵 *𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃 ᴛɪᴋᴛᴏᴋ ᴅʟ*
*┇•* 📝 *ᴛɪᴛʟᴇ: ${title?.substring(0, 50)}*
*┇•* 👤 *ᴀᴜᴛʜᴏʀ: ${author}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`

        // Thumbnail send
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: mek })

        // HD Video send
        if (hdVideo) {
            await conn.sendMessage(from, {
                video: { url: hdVideo.url },
                mimetype: 'video/mp4',
                caption:
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* 📹 *ʜᴅ ɴᴏ ᴡᴀᴛᴇʀᴍᴀʀᴋ*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`
            }, { quoted: mek })
        }

        // Audio send
        if (audio) {
            await conn.sendMessage(from, {
                audio: { url: audio.url },
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: mek })

            await conn.sendMessage(from, {
                text:
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃_*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`
            }, { quoted: mek })
        }

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred while fetching TikTok data*")
    }
})