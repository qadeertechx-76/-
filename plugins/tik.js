const { cmd } = require('../command')
const axios = require('axios')

if (!global.tt4Sessions) global.tt4Sessions = {}

cmd({
    pattern: "tiktok2",
    alias: ["tt2", "ttvideo"],
    desc: "Download TikTok video or audio",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a TikTok link*
Example:
.tiktok4 https://vt.tiktok.com/ZSaaagyHA/`)

        if (!q.includes('tiktok.com') && !q.includes('vt.tiktok')) {
            return reply("❌ *Please provide a valid TikTok link*")
        }

        await reply("⏳ *Fetching TikTok data...*")

        const api = `https://v2.api-varhad.my.id/download/tt?url=${encodeURIComponent(q)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.result) {
            return reply("❌ *Failed to fetch TikTok data*")
        }

        const { title, thumbnail, mp4, mp4_hd, mp3 } = res.data.result

        // Session save
        global.tt4Sessions[from] = { mp4, mp4_hd, mp3 }

        const caption =
`📝 *ᴛɪᴛʟᴇ: ${title?.substring(0, 50)}*
🎯 *ꜱᴇʟᴇᴄᴛ ꜰᴏʀᴍᴀᴛ:*
1️⃣ 📹 *Video (MP4)*
2️⃣ 📹 *Video HD (MP4)*
3️⃣ 🎵 *Audio (MP3)*`

        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred while fetching TikTok data*")
    }
})

// ─── REPLY HANDLER ───────────────────────────────────────────────────────────

cmd({
    on: "text"
}, async (conn, mek, m, { from, reply, body }) => {
    try {
        if (!global.tt4Sessions?.[from]) return
        if (!['1', '2', '3'].includes(body?.trim())) return

        const { mp4, mp4_hd, mp3 } = global.tt4Sessions[from]
        delete global.tt4Sessions[from]

        const choice = body.trim()
        const label = choice === '1' ? 'Video' : choice === '2' ? 'Video HD' : 'Audio'
        await reply(`⏳ *Downloading ${label}...*`)

        const footerCaption =
`*_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴍᴀɴ-ᴍᴅ_*`

        if (choice === '1') {
            await conn.sendMessage(from, {
                video: { url: mp4 },
                mimetype: 'video/mp4',
                caption: footerCaption
            }, { quoted: mek })
        } else if (choice === '2') {
            await conn.sendMessage(from, {
                video: { url: mp4_hd },
                mimetype: 'video/mp4',
                caption: footerCaption
            }, { quoted: mek })
        } else {
            await conn.sendMessage(from, {
                audio: { url: mp3 },
                mimetype: 'audio/mpeg',
                ptt: false
            }, { quoted: mek })
            await conn.sendMessage(from, { text: footerCaption }, { quoted: mek })
        }

    } catch (err) {
        console.error(err)
    }
})