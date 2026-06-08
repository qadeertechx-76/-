const { arslan } = require('../arslan');
const axios = require('axios');
const { fakevCard } = require('../lib/fakevCard');

const XV_API = "https://arslan-apis-v2.vercel.app";

const AXIOS_DEFAULTS = {
    timeout: 30000,
    headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
    }
};

// 🔁 Retry helper
async function tryRequest(fn, tries = 3) {
    let err;
    for (let i = 1; i <= tries; i++) {
        try {
            return await fn();
        } catch (e) {
            err = e;
            await new Promise(r => setTimeout(r, i * 1000));
        }
    }
    throw err;
}

// ❤️ React helper
async function react(sock, mek, emoji) {
    await sock.sendMessage(mek.key.remoteJid, {
        react: { text: emoji, key: mek.key }
    });
}

// 📦 Stylish info box
function xBox(data) {
    return `
╔═━═━═❰ *Qadeer-KD* ❱═━═━═╗
┃ 🔞 *XVIDEO DOWNLOADER*
┃━━━━━━━━━━━━━━━━━━
┃ 📌 *Title:* ${data.title}
┃ ⏱ *Duration:* ${data.duration || "N/A"}
┃ 👁️ *Views:* ${data.views || "N/A"}
┃ 🔥 *Quality:* HD
╚━━━━━━━━━━━━━━━━━━╝`;
}

// 🔍 Search API
async function searchXvideos(query) {
    const api = `${XV_API}/download/xvideosSearch?text=${encodeURIComponent(query)}`;

    const res = await tryRequest(() =>
        axios.get(api, AXIOS_DEFAULTS)
    );

    if (res.data?.status && res.data.result?.length) {
        return res.data.result;
    }

    throw new Error("Search failed");
}

// 🎬 Download API
async function downloadXvideo(url) {
    const api = `${XV_API}/download/xvideosDown?url=${encodeURIComponent(url)}`;

    const res = await tryRequest(() =>
        axios.get(api, AXIOS_DEFAULTS)
    );

    if (res.data?.status && res.data.result?.url) {
        return res.data.result;
    }

    throw new Error("Download failed");
}

// ===============================
// 🔞 COMMAND: .xxx <query|link>
// ===============================
arslan({
    pattern: "xxx",
    alias: ["xvideo", "porn", "sex", "xvideos", "sexy"],
    desc: "Search and download xvideos",
    category: "adult",
    react: "🔞",
    filename: __filename
},
async (sock, mek, m, { reply }) => {

    try {

        const text =
            m.message?.conversation ||
            m.message?.extendedTextMessage?.text ||
            "";

        const query = text.split(" ").slice(1).join(" ").trim();

        if (!query) {
            return reply(
                `⚠️ *Usage Example:*\n.xxx mia khalifa`
            );
        }

        await react(sock, mek, "🔍");

        let videoData;
        let videoUrl;

        // 🔗 Direct URL
        if (query.startsWith("http")) {

            videoUrl = query;

            videoData = {
                title: "Xvideos Video",
                duration: "Unknown",
                views: "Unknown"
            };

        } else {

            // 🔎 Search Video
            const results = await searchXvideos(query);

            videoData = results[0];
            videoUrl = videoData.url;
        }

        // 📦 Send Info
        await sock.sendMessage(m.chat, {
            image: {
                url: videoData.thumb || "https://files.catbox.moe/16i1l7.jpg"
            },
            caption: xBox(videoData)
        }, {
            quoted: fakevCard
        });

        await react(sock, mek, "⏳");

        // 🎬 Download Video
        const file = await downloadXvideo(videoUrl);

        await sock.sendMessage(m.chat, {
            video: {
                url: file.url
            },
            mimetype: "video/mp4",
            fileName: `${videoData.title}.mp4`,
            caption: `
╔═━═━═❰ *Qadeer-KD* ❱═━═━═╗
┃ ✅ *VIDEO DOWNLOADED*
┃ 🚀 Powered By Qadeer-KD
╚━━━━━━━━━━━━━━━━━━╝`
        }, {
            quoted: fakevCard
        });

        await react(sock, mek, "✅");

    } catch (e) {

        console.log(e);

        await react(sock, mek, "❌");

        reply("❌ Failed to download video!");
    }
});