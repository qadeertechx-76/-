const { cmd } = require('../command')
const axios = require('axios')
const yts = require('yt-search')

cmd({
    pattern: "video",
    alias: ["ytmp4", "yt4", "yt", "video"],
    desc: "Download YouTube video (MP4)",
    category: "download",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a video name or YouTube link*
Example:
.video Zahe muqaddar huzoor haq se
.video4 https://youtube.com/watch?v=xxx`)

        await reply("⏳ *Searching, please wait...*")

        // Search or direct link
        let videoUrl, thumbnail, ytTitle, duration, views, ago, channel

        if (q.includes('youtu')) {
            videoUrl = q.trim()
            const vidId = videoUrl.split('v=')[1]?.split('&')[0] ||
                          videoUrl.split('youtu.be/')[1]?.split('?')[0] ||
                          videoUrl.split('shorts/')[1]?.split('?')[0]
            const search = await yts({ videoId: vidId || '' })
            if (search?.videos?.length) {
                const v = search.videos[0]
                thumbnail = v.thumbnail
                ytTitle = v.title
                duration = v.timestamp
                views = v.views
                ago = v.ago
                channel = v.author.name
            }
        } else {
            const search = await yts(q)
            if (!search.videos?.length) return reply("❌ *No results found*")
            const v = search.videos[0]
            videoUrl = v.url
            thumbnail = v.thumbnail
            ytTitle = v.title
            duration = v.timestamp
            views = v.views
            ago = v.ago
            channel = v.author.name
        }

        await reply("⬇️ *Downloading video...*")

        // API call
        const api = `https://eliteprotech-apis.zone.id/ytmp4?url=${encodeURIComponent(videoUrl)}`
        const res = await axios.get(api, { timeout: 120000 })

        if (!res.data?.status || !res.data?.result?.url) {
            return reply("❌ *Failed to fetch video*")
        }

        const { title, size, url: downloadUrl } = res.data.result
        const sizeMB = size ? (size / 1024 / 1024).toFixed(2) + ' MB' : 'N/A'

        const caption =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* ℹ️ *ᴛɪᴛʟᴇ: ${title || ytTitle}*
*┇•* ⌛ *ᴅᴜʀᴀᴛɪᴏɴ: ${duration || 'N/A'}*
*┇•* 👁️ *ᴠɪᴇᴡs: ${views?.toLocaleString() || 'N/A'}*
*┇•* 📆 *ᴜᴘʟᴏᴀᴅᴇᴅ: ${ago || 'N/A'}*
*┇•* 📡 *ᴄʜᴀɴɴᴇʟ: ${channel || 'N/A'}*
*┇•* 📁 *ꜱɪᴢᴇ: ${sizeMB}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`

        // Thumbnail + info
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: caption
        }, { quoted: mek })

        // Video send
        await conn.sendMessage(from, {
            video: { url: downloadUrl },
            mimetype: 'video/mp4',
            caption:
`*_ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃_*`
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred while downloading video*")
    }
})
