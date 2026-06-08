
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "simdatabase",
    alias: ["simdata", "pkdata", "numberinfo"],
    desc: "Search Pakistan database by phone number",
    category: "tools",
    react: "🔍",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("🔍 Please provide a phone number!\n\nExample: .simdata 3336504197");

        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        const number = q.replace(/[^0-9]/g, ''); // Remove non-digits
        
        if (number.length < 10) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return await reply("❌ Please provide a valid phone number!\n\nMinimum 10 digits required.");
        }

        const api = `https://fam-official.serv00.net/api/famdatabase.php?number=${number}`;
        
        const res = await axios.get(api);
        const json = res.data;

        if (!json.success || !json.data || json.data.records_count === 0) {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            return await reply("❌ No records found for this number!");
        }

        const { records_count, records } = json.data;

        let message = `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇─̣┈⊰ ₊‧.°.⋆𝐐𝐀𝐃𝚵𝚵𝐑-𝐊𝐃•˚₊‧⋆. ⊱┈─̇─̣*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣─᛭*
*│* 🔍 *ʀᴀʜᴍᴀɴ ᴅᴀᴛᴀʙᴀꜱᴇ ꜱᴇᴀʀᴄʜ*
*│*
*│* 📱 *ɴᴜᴍʙᴇʀ:* ${number}
*│* 📊 *ʀᴇᴄᴏʀᴅꜱ ꜰᴏᴜɴᴅ:* ${records_count}
*╰┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*\n\n`;

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            message += `*╭ׂ┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│* 📝 *ʀᴇᴄᴏʀᴅ ${i + 1}*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄┄─̇─̇─᛭*̣
*│* 👤 *ɴᴀᴍᴇ:* ${record.full_name}
*│* 📞 *ᴘʜᴏɴᴇ:* ${record.phone}
*│* 🆔 *ᴄɴɪᴄ:* ${record.cnic}
*│* 📍 *ᴀᴅᴅʀᴇꜱꜱ:* ${record.address}
*│* 🧑‍💻 *ᴄʀᴇᴅɪᴛ*: ʀᴀʜᴍᴀɴ ᴛᴇᴄʜ
*╰┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*\n\n`;
        }

        message += `*_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ₊‧.°.⋆𝐐𝐀𝐃𝚵𝚵𝐑-𝐊𝐃•˚₊‧⋆._*`;

        await conn.sendMessage(from, {
            text: message
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("simdata Database Error:", e);
        await reply("❌ Error occurred! Please try again.\n\nMake sure you provided a valid phone number.");
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});
