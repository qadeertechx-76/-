const { cmd } = require('../command')
const axios = require('axios')
const FormData = require('form-data')

cmd({
    pattern: "wink",
    alias: ["winkenhance", "winkai"],
    desc: "Enhance image using Wink AI",
    category: "tools",
    react: "✨",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
            return reply(
`❌ *Reply to any image with .wink*
Example:
• Send any photo
• Reply to it with *.wink*`)
        }

        await reply("⏳ *Uploading image...*")

        // Buffer download
        const buffer = await m.quoted.download()

        // Catbox pe upload
        const form = new FormData()
        form.append('reqtype', 'fileupload')
        form.append('fileToUpload', buffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg'
        })

        const upload = await axios.post('https://catbox.moe/user/api.php', form, {
            headers: form.getHeaders(),
            timeout: 60000
        })

        const imageUrl = upload.data.trim()
        if (!imageUrl.startsWith('http')) return reply("❌ *Image upload failed, please try again*")

        await reply("✨ *Enhancing image with Wink AI...*")

        // API call
        const api = `https://api.azbry.com/api/tools/wink?url=${encodeURIComponent(imageUrl)}&mode=hd`
        const res = await axios.get(api, { timeout: 120000 })

        if (!res.data?.status || !res.data?.result?.result_url) {
            return reply("❌ *Enhancement failed, please try again*")
        }

        const { result_url, mode } = res.data.result

        const caption =
`🎨 *ᴍᴏᴅᴇ: ${mode.toUpperCase()}*
✅ *ɪᴍᴀɢᴇ ᴇɴʜᴀɴᴄᴇᴅ!*`

        await conn.sendMessage(from, {
            image: { url: result_url },
            caption: caption
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred during image enhancement*")
    }
})