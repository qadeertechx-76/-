module.exports = {
    name: "numberChecker",
    command: ['.cban', '.cunban'],
    description: "Check if WhatsApp number is banned or unbanned with. prefix",

    async execute(sock, m, args) {
        const msg = m.messages[0]
        const from = msg.key.remoteJid
        const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""

        // Prefix check
        if (!body.toLowerCase().startsWith('.cban') &&!body.toLowerCase().startsWith('.cunban')) return

        // Number nikal le command se
        const number = body.split(' ')[1]

        if (!number) {
            return await sock.sendMessage(from, {
                text: `❌ Number to de bhai\n\nSahi format: \n.cban 923001234567\n.cunban 923001234567`
            }, { quoted: msg })
        }

        // Country code ke saath hona chahiye, bina + ke
        const jid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

        try {
            await sock.sendMessage(from, { text: `🔍 Checking ${number}...` }, { quoted: msg })

            const [result] = await sock.onWhatsApp(jid)

            if (result?.exists) {
                await sock.sendMessage(from, {
                    text: `✅ *UNBAN HAI*\n\nNumber: +${number}\nStatus: WhatsApp pe active hai\n\nNote: 100% sure nahi, kabhi kabhi network issue bhi ho sakta hai`
                }, { quoted: msg })
            } else {
                await sock.sendMessage(from, {
                    text: `❌ *BAN YA EXIST NAHI KARTA*\n\nNumber: +${number}\nStatus: WhatsApp pe nahi mila\n\nReason: Ya to ban hai, ya number galat hai, ya kabhi WhatsApp pe tha hi nahi`
                }, { quoted: msg })
            }

        } catch (error) {
            await sock.sendMessage(from, {
                text: `⚠️ Error aa gaya bhai\n\n${error.message}\n\nHo sakta hai bot ka number hi ban ho gaya ho`
            }, { quoted: msg })
        }
    }
}
