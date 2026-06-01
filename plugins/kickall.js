// ===============================
// 👢 KICKALL - Sabko nikalo
// ===============================
arslan({
    pattern: "kickall",
    alias: ["removeall", "fuckall", "niklosab", "kamranbc🖐️", "💪", "waleedkigand"],
    desc: "Remove all members except admins",
    category: "group",
    react: "⚠️",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    try {
        if (!m.isGroup) return reply("❌ Group command");
        if (!m.isAdmin) return reply("❌ Sirf admin use kar sakta hai");
        if (!m.isBotAdmin) return reply("❌ Bot ko admin banao pehle");

        const metadata = await sock.groupMetadata(m.chat);
        const participants = metadata.participants;

        // Admins ko nikal do array se
        const toKick = participants.filter(p => !p.admin && p.id !== sock.user.id);

        if (toKick.length === 0) return reply("✅ Koi member nahi hai kick karne ko");

        await react(sock, mek, "⚠️");
        await reply(`⚠️ *Confirm karo*: ${toKick.length} members ko nikalna hai?\n\nDobara .kickall likho 10 sec mein confirm karne ke liye`);

        // 10 sec ka wait confirmation ke liye
        const filter = (msg) => msg.sender === m.sender && msg.body === ".kickall";
        const collected = await sock.waitForMessage(m.chat, filter, 10000);

        if (!collected) return reply("❌ Cancel ho gaya");

        await react(sock, mek, "👢");
        await reply(`👢 ${toKick.length} members ko nikal raha hun...`);

        let count = 0;
        for (let member of toKick) {
            try {
                await sock.groupParticipantsUpdate(m.chat, , "remove");
                count++;
                await new Promise(r => setTimeout(r, 2000)); // 2 sec delay ban se bachne ke liye
            } catch (e) {
                console.log(e);
            }
        }

        await reply(`✅ ${count} members ko nikal diya`);

    } catch (e) {
        reply("❌ Error: " + e.message);
    }
});