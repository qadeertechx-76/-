module.exports = {
    name: "numberChecker",
    command: ['c ban', 'c unban'],
    description: "Check if WhatsApp number is banned or unbanned",

    async execute(sock, m, args) {
        const msg = m.messages[0]
        const from = msg.key.remoteJid
        const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ""
        const command = body.toLowerCase().split(' ')[0] + ' ' + body.toLowerCase().split(' ')[1]

        if (command!== 'c ban' && command!== 'c unban') return

        // Number nikal le command se
        const number = body.split(' ')[2]

        if (!number) {
            return await sock.sendMessage(from, {
                text: `❌ Number to de bhai\n\nSahi format: \nc ban 923001234567\nc unban 923001234567`
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
                }, {