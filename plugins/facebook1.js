const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "fb3",
    alias: ["fbdl3", "facebook3", "fb"],
    desc: "Download Facebook video",
    category: "download",
    react: "📘",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a Facebook video link*
Example:
.fb3 https://www.facebook.com/share/v/xxx`)

        if (!q.includes('facebook.com') && !q.includes('fb.watch')) {
            return reply("❌ *Please provide a valid Facebook link*")
        }

        await reply("⏳ *Fetching Facebook video...*")

        const api = `https://api.delirius.store/download/facebook?url=${encodeURIComponent(q)}`
        const res = await axios.get(api, { timeout: 60000 })

        if (!res.data?.status || !res.data?.list?.length) {
            return reply("❌ *Failed to fetch video*")
        }

        const { thumb, list } = res.data
        const video = list[0]

        const caption =
`*ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ..........*`

        // Thumbnail send
        if (thumb) {
            await conn.sendMessage(from, {
                image: { url: thumb },
                caption: caption
            }, { quoted: mek })
        }

        // Video send
        await conn.sendMessage(from, {
            video: { url: video.url },
            mimetype: 'video/mp4',
            caption:
`*_ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃_*`
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred while fetching Facebook video*")
    }
})
