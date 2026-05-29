const { arslan } = require('../arslan');

async function react(sock, mek, emoji) {
    await sock.sendMessage(mek.key.remoteJid, {
        react: { text: emoji, key: mek.key }
    });
}

// ===============================
// 👥 TAG ALL
// ===============================
arslan({
    pattern: "tagall",
    desc: "Mention all group members",
    category: "group",
    react: "📢",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Ye command sirf group mein chalti hai");

        const metadata = await sock.groupMetadata(m.chat);
        const participants = metadata.participants;

        let text = `📢 *${metadata.subject}*\n\n`;
        let mentions = [];

        for (let mem of participants) {
            text += `@${mem.id.split('@')[0]} `;
            mentions.push(mem.id);
        }

        await sock.sendMessage(m.chat, { text, mentions }, { quoted: mek });
        await react(sock, mek, "✅");
    } catch (e) {
        reply("❌ Error: " + e.message);
    }
});

// ===============================
// ⬆️ PROMOTE
// ===============================
arslan({
    pattern: "promote",
    desc: "Make someone admin",
    category: "group",
    react: "⬆️",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group command");
        if (!m.isAdmin) return reply("❌ Sirf admin use kar sakta hai");

        let user = m.mentionedJid[0] || m.quoted?.sender;
        if (!user) return reply("⚠️ User mention karo ya reply karo");

        await sock.groupParticipantsUpdate(m.chat, [user], "promote");
        await reply(`✅ @${user.split('@')[0]} ko admin bana diya`, { mentions: [user] });
    } catch (e) {
        reply("❌ Failed: " + e.message);
    }
});

// ===============================
// ⬇️ DEMOTE
// ===============================
arslan({
    pattern: "demote",
    desc: "Remove admin",
    category: "group",
    react: "⬇️",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group command");
        if (!m.isAdmin) return reply("❌ Sirf admin use kar sakta hai");

        let user = m.mentionedJid[0] || m.quoted?.sender;
        if (!user) return reply("⚠️ User mention karo ya reply karo");

        await sock.groupParticipantsUpdate(m.chat, [user], "demote");
        await reply(`✅ @${user.split('@')[0]} se admin hataya`, { mentions: [user] });
    } catch (e) {
        reply("❌ Failed: " + e.message);
    }
});

// ===============================
// 👢 KICK
// ===============================
arslan({
    pattern: "kick",
    desc: "Remove member from group",
    category: "group",
    react: "👢",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group command");
        if (!m.isAdmin) return reply("❌ Sirf admin use kar sakta hai");

        let user = m.mentionedJid[0] || m.quoted?.sender;
        if (!user) return reply("⚠️ User mention karo ya reply karo");

        await sock.groupParticipantsUpdate(m.chat, [user], "remove");
        await reply(`👢 @${user.split('@')[0]} ko nikal diya`, { mentions: [user] });
    } catch (e) {
        reply("❌ Failed: " + e.message);
    }
});