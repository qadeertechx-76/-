const { cmd } = require("../command");
const axios = require("axios");
const yts = require("yt-search");

cmd({
    pattern: "ytmp4",
    alias: ["video", "ytvideo", "yt"],
    desc: "Download YouTube Video",
    category: "download",
    react: "🎬",
    use: ".ytmp4 <url/song name>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {

        if (!q) {
            return await reply(
                "🎬 Please provide a YouTube URL or Song Name!\n\nExample:\n.ytmp4 zahe muqaddar\n.ytmp4 https://youtu.be/xxxxx"
            );
        }

        await conn.sendMessage(from, {
            react: { text: "⬇️", key: mek.key }
        });

        let vid = null;
        let videoUrl = q;

        // Search by name
        if (!q.includes("youtube.com") && !q.includes("youtu.be")) {
            const { videos } = await yts(q);

            if (!videos || videos.length === 0) {
                return await reply("❌ No results found!");
            }

            vid = videos[0];
            videoUrl = vid.url;
        }

        // Download API
        const { data } = await axios.get(
            `https://api.azbry.com/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}`
        );

        if (!data?.status || !data?.result) {
            return await reply("❌ Failed to fetch video!");
        }

        const video = data.result;

        // Fallback metadata for direct URL
        if (!vid) {
            vid = {
                title: video.title || "Unknown Title",
                thumbnail: video.thumbnail,
                timestamp: "Unknown",
                author: {
                    name: "Unknown"
                }
            };
        }

        // Thumbnail + Info Card
        await conn.sendMessage(
            from,
            {
                image: { url: vid.thumbnail || video.thumbnail },
                caption: `‎‎
*ℹ️ ᴛɪᴛʟᴇ:* ${vid.title}
‎*🕘 ᴅᴜʀᴀᴛɪᴏɴ:* ${vid.timestamp}
‎*👤 ᴀᴜᴛʜᴏʀ:* ${vid.author?.name || "Unknown"}
‎*🎥 ǫᴜᴀʟɪᴛʏ:* ${video.quality}
‎*📦 ꜰᴏʀᴍᴀᴛ:* ${video.format}`
            },
            { quoted: mek }
        );

        // Send Video
        await conn.sendMessage(
            from,
            {
                video: { url: video.download },
                mimetype: "video/mp4",
                fileName: `${vid.title}.mp4`,
                caption: `🎬 *${vid.title}*`
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, {
            react: { text: "✅", key: mek.key }
        });

    } catch (e) {
        console.error("YTMP4 Error:", e);

        await conn.sendMessage(from, {
            react: { text: "❌", key: mek.key }
        });

        await reply("❌ Error occurred while downloading video!");
    }
});