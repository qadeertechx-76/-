const { cmd } = require('../command')
const axios = require('axios')
const FormData = require('form-data')

cmd({
    pattern: "pti",
    alias: ["aiimg", "aiimage"],
    desc: "Transform image with AI prompt",
    category: "ai",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
    try {
        if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
            return reply(
`❌ *Reply to any image with .pti <prompt>*
Example:
• Send any photo
• Reply with *.aiimage make it anime style*
• Reply with *.aiimage cartoon style*
• Reply with *.aiimage oil painting*`)
        }

        if (!q) return reply("❌ *Please provide a prompt*\nExample: .pti make it anime style")

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

        await reply("🎨 *Transforming image with AI...*")

        // API call
        const api = `https://api.nabees.online/api/ai/pti?prompt=${encodeURIComponent(q)}&image_url=${encodeURIComponent(imageUrl)}&ratio=auto`
        const res = await axios.get(api, { timeout: 120000 })

        if (!res.data?.data?.image_url) {
            return reply("❌ *Failed to generate image, please try again*")
        }

        const { image_url, prompt } = res.data.data

        const caption =
`*╭┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*
*┇•* 🎨 *𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃 ᴀɪ ɪᴍᴀɢᴇ*
*┇•* 📝 *ᴘʀᴏᴍᴘᴛ: ${prompt}*
*┇•* ✅ *ɪᴍᴀɢᴇ ɢᴇɴᴇʀᴀᴛᴇᴅ!*
*╰┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉━┈᛭*`

        await conn.sendMessage(from, {
            image: { url: image_url },
            caption: caption
        }, { quoted: mek })

    } catch (err) {
        console.error(err)
        reply("❌ *An error occurred during image transformation*")
    }
})