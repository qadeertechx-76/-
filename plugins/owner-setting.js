const { cmd } = require('../command');

// ================================
// Shutdown Bot
// ================================
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { isOwner, reply }) => {

    if (!isOwner) {
        return reply("❌ Only owner can use this command.");
    }

    await reply("🛑 Shutting down bot...");
    process.exit(0);
});


// ================================
// Broadcast Message
// ================================
cmd({
    pattern: "broadcast",
    alias: ["bc"],
    desc: "Broadcast message to all groups",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { isOwner, args, reply }) => {

    if (!isOwner) {
        return reply("❌ Only owner can use this command.");
    }

    if (!args[0]) {
        return reply("📢 Give a message to broadcast.");
    }

    try {

        const text = args.join(" ");
        const groups = Object.keys(
            await conn.groupFetchAllParticipating()
        );

        for (let jid of groups) {

            await conn.sendMessage(jid, {
                text: `📢 *Broadcast Message*\n\n${text}`
            });

        }

        reply(`✅ Broadcast sent to ${groups.length} groups.`);

    } catch (e) {
        console.log(e);
        reply("❌ Broadcast failed.");
    }
});


// ================================
// Set Profile Picture
// ================================
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { isOwner, quoted, reply }) => {

    if (!isOwner) {
        return reply("❌ Only owner can use this command.");
    }

    if (!quoted) {
        return reply("❌ Reply to an image.");
    }

    try {

        const media = await quoted.download();

        await conn.updateProfilePicture(
            conn.user.id,
            media
        );

        reply("✅ Profile picture updated.");

    } catch (e) {
        console.log(e);
        reply("❌ Failed to update profile picture.");
    }
});


// ================================
// Clear Chats
// ================================
cmd({
    pattern: "clearchats",
    desc: "Delete all chats",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { isOwner, reply }) => {

    if (!isOwner) {
        return reply("❌ Only owner can use this command.");
    }

    try {

        const chats = Object.keys(conn.chats);

        for (let chat of chats) {
            await conn.chatModify(
                { delete: true },
                chat
            );
        }

        reply("✅ All chats cleared.");

    } catch (e) {
        console.log(e);
        reply("❌ Failed to clear chats.");
    }
});


// ================================
// Group JIDs
// ================================
cmd({
    pattern: "gjid",
    desc: "Get all group JIDs",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { isOwner, reply }) => {

    if (!isOwner) {
        return reply("❌ Only owner can use this command.");
    }

    try {

        const groups = await conn.groupFetchAllParticipating();

        let txt = "📝 *Group JIDs List*\n\n";

        for (let jid in groups) {
            txt += `• ${jid}\n`;
        }

        reply(txt);

    } catch (e) {
        console.log(e);
        reply("❌ Failed to fetch group JIDs.");
    }
});


// ================================
// Delete Message
// ================================
cmd({
    pattern: "delete",
    alias: ["del"],
    desc: "Delete replied message",
    category: "group",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    isOwner,
    isAdmins,
    isBotAdmins,
    quoted,
    reply
}) => {

    // Permission Check
    if (!isOwner && !isAdmins) {
        return reply("❌ Only owner or admin can use this command.");
    }

    if (!isBotAdmins) {
        return reply("❌ Bot must be admin.");
    }

    if (!quoted) {
        return reply("❌ Reply to a message.");
    }

    try {

        await conn.sendMessage(m.chat, {
            delete: quoted.key
        });

    } catch (e) {
        console.log(e);
        reply("❌ Failed to delete message.");
    }
});
