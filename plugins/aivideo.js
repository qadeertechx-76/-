const { cmd } = require('../command')
const axios = require('axios')

cmd({
    pattern: "text2video",
    alias: ["t2v", "ai2video", "aivieo"],
    desc: "Generate AI video from text prompt",
    category: "ai",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!q) return reply(
`❌ *Please provide a prompt*
Example:
.text2video cat playing with ball
.text2video sunset over ocean
.text2video dog running in park`)

        await reply("⏳ *Generating AI video, please wait...*")

        const api = `https://api.nabees.online/api/text2video?prompt=${encodeURIComponent(q)}`
        const res = await axios.get(api, { timeout: 120000 })

        if (!res.data?.data?.video_link) {
            return reply("❌ *Failed to generate video*")
        }

        const { video_link, cinematography } = res.data.data

        const caption =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━*
*┇•* 📝 *ᴘʀᴏᴍᴘᴛ: ${q}*
*┇•* 🤖 *ᴍᴏᴅᴇʟ: ${cinematography?.model || 'N/A'}*
*┇•* 🎞️ *ꜰᴘꜱ: ${cinematography?.fps || 30}*
*┇•* ⌛ *ᴅᴜʀᴀᴛɪᴏɴ: ${cinematography?.duration || '5s'}*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━*`

        await conn.sendMessage(from, {
            video: { url: video_link },
            mimetype: 'video/mp4',
            caption: caption
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred during video generation*")
    }
})
