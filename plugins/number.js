const { onWhatsApp } = require('@whiskeysockets/baileys')

module.exports = {
    name: 'cban',
    alias: ['.cban', '.cunban'],
    category: 'tools',
    desc: 'Check WhatsApp number ban status',
    async run(sock, m, { text }) {
        
        if (!text) return m.reply(`❌ Number to de bhai\n\nExample: .cban 923001234567`)
        
        const number = text.replace(/[^0-9]/g, '')
        const jid = number + '@s.whatsapp.net'
        
        try {
            await m.reply(`🔍 Checking ${number}...`)
            
            const [result] = await sock.onWhatsApp(jid)
            
            if (result?.exists) {
                await m.reply(`✅ *UNBAN HAI*\n\nNumber: +${number}\nStatus: WhatsApp pe active hai`)
            } else {
                await m.reply(`❌ *BAN YA EXIST NAHI KARTA*\n\nNumber: +${number}\nStatus: WhatsApp pe nahi mila`)
            }
            
        } catch (e) {
            await m.reply(`⚠️ Error: ${e.message}`)
        }
    }
}
