const { cmd } = require('../command');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { runtime } = require('../lib/functions');
const config = require('../config');

/* =======================
   FULL SYSTEM PING
   Command: .ping
======================= */
cmd({
    pattern: "ping",
    react: "🌈",
    desc: "Check system speed & full report",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const speed = Date.now() - m.messageTimestamp * 1000;

        const caption = `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│⚡ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐑𝐄𝐏𝐎𝐑𝐓*
*│*
*│🚀 𝐒𝐩𝐞𝐞𝐝:* ${speed}ms
*│🧠 𝐔𝐩𝐭𝐢𝐦𝐞:* ${runtime(process.uptime())}
*│💾 𝐑𝐀𝐌:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*│🔥 𝐂𝐏𝐔:* ${os.cpus()[0].model}
*│📦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* v${config.VERSION || "5.0.0"}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃
`;

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424804601329@newsletter',
                    newsletterName: '𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // 🔊 Audio
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: mek });
        }

    } catch (e) {
        console.error("PING ERROR:", e);
        reply("❌ Ping command failed");
    }
});


/* =======================
   QUICK PING
   Command: .ping2
======================= */
cmd({
    pattern: "ping5",
    react: "🚀",
    desc: "Quick ping check",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const start = Date.now();
        const temp = await conn.sendMessage(from, { text: "⏳ *Checking speed...*" }, { quoted: mek });
        const speed = Date.now() - start;

        const msg = `
*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣⊰ 𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪 ⊱┈─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│⚡ 𝐐𝐔𝐈𝐂𝐊 𝐏𝐈𝐍𝐆*
*│*
*│🚀 𝐒𝐩𝐞𝐞𝐝:* ${speed}ms
*│🟢 𝐒𝐭𝐚𝐭𝐮𝐬:* Online
*│📦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧:* v${config.VERSION || "5.0.0"}
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𓆩ZAIDI-MD𓆪
`;

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424804601329@newsletter',
                    newsletterName: '𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // 🔊 Audio
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mp4',
                ptt: false
            }, { quoted: mek });
        }

    } catch (e) {
        console.error("PING ERROR:", e);
        reply("❌ Ping command failed");
    }
});
