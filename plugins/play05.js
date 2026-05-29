const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "play",
    alias: ["mp3o", "song5"],
    desc: "Search and download YouTube audio (MP3/M4A)",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a song name*
Example:
.play5 alone heart
.play5 zahe muqaddar`)

        await reply("⏳ *Searching, please wait...*")

        const api = `https://omegatech-api.dixonomega.tech/api/download/play?query=${encodeURIComponent(q)}&format=mp3&quality=128k`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.success || !res.data?.downloadUrl) {
            return reply("❌ *Failed to fetch audio*")
        }

        const {
            title,
            thumbnail,
            duration,
            views,
            ago,
            author,
            fileSize,
            extension,
            downloadUrl
        } = res.data

        const caption =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* 🎵 *ʀᴀʜᴍᴀɴ-ᴍᴅ ᴀᴜᴅɪᴏ ᴅʟ*
*┇•* ℹ️ *ᴛɪᴛʟᴇ: ${title}*
*┇•* ⌛ *ᴅᴜʀᴀᴛɪᴏɴ: ${duration?.timestamp || 'N/A'}*
*┇•* 👁️ *ᴠɪᴇᴡs: ${views?.toLocaleString() || 'N/A'}*
*┇•* 📆 *ᴜᴘʟᴏᴀᴅᴇᴅ: ${ago || 'N/A'}*
*┇•* 📡 *ᴄʜᴀɴɴᴇʟ: ${author?.name || 'N/A'}*
*┇•* 📁 *ꜱɪᴢᴇ: ${fileSize || 'N/A'} (${extension || 'MP3'})*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`

        // Thumbnail + info send
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: mek })

        // Audio send
        await conn.sendMessage(from, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mpeg',
            ptt: false
        }, { quoted: mek })

        await conn.sendMessage(from, {
            text:
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred while downloading audio*")
    }
})