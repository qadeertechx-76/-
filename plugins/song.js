const { cmd } = require('../command');
const axios = require('axios');
const yts = require('yt-search');

// ============ SAB APIS YAHAN DEFINED HAIN ============

    {
        name: "EliteProTech",
        url: (ytLink) => `https://eliteprotech-apis.zone.id/ytdown?url=${encodeURIComponent(ytLink)}&format=mp3`,
        getAudioUrl: (data) => {
            if (data?.success && data?.downloadURL) {
                return data.downloadURL;
            }
            return null;
        },
        getTitle: (data) => data?.title,
        getThumbnail: (data) => data?.thumbnail
    },
    {
        name: "Yupra",
        url: (ytLink) => `https://api.yupra.my.id/api/downloader/ytmp3?url=${encodeURIComponent(ytLink)}`,
        getAudioUrl: (data) => {
            if (data?.success && data?.data?.download_url) {
                return data.data.download_url;
            }
            return null;
        },
        getTitle: (data) => data?.data?.title,
        getThumbnail: (data) => data?.data?.thumbnail
    }
];

// ============ FUNCTION JO PEHLI WORKING API SE LE AAYEGA ============
async function getAudioFromApi(youtubeUrl) {
    for (const api of APIS) {
        try {
            console.log(`📡 Trying ${api.name}...`);
            const response = await axios.get(api.url(youtubeUrl), { timeout: 30000 });
            const audioUrl = api.getAudioUrl(response.data);
            
            if (audioUrl) {
                console.log(`✅ ${api.name} Success!`);
                return {
                    success: true,
                    audioUrl: audioUrl,
                    title: api.getTitle(response.data),
                    thumbnail: api.getThumbnail(response.data),
                    apiUsed: api.name
                };
            }
        } catch (error) {
            console.log(`❌ ${api.name} Failed:`, error.message);
        }
    }
    return { success: false, error: "All APIs failed" };
}

// ============ ORIGINAL COMMAND (BAS API CALL CHANGE HUA) ============
cmd({
    pattern: "music",
    alias: ["play", "song", "audio", "roohi", "ayezal"],
    desc: "Searches a song on YouTube and downloads it as MP3",
    category: "download",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        const query = q ? q.trim() : '';

        if (!query) {
            return await reply(`╭━〔 🎵MUSIC ENGINE 〕━⬣
┃ ⚠️ .play pal pal 
╰━━━━━━━━━━━━━━━━━━⬣
> 🚀 Qadeer KD`);
        }

        await conn.sendMessage(from, {
            react: { text: '⌛', key: m.key }
        });

        const isYoutubeLink =
            /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)?)([a-zA-Z0-9_-]{11})/i.test(query);

        let videoUrl = query;
        let title = 'Unknown YouTube Song';
        let thumbnail = '';
        let duration = '';
        let author = 'Unknown';
        let views = 0;

        if (!isYoutubeLink) {
            const search = await yts(query);

            if (!search?.videos?.length) {
                await conn.sendMessage(from, {
                    react: { text: '❌', key: m.key }
                });

                return await reply(`╭━〔 🔎 NO RESULTS FOUND 〕━⬣
┃ No matching results for:
┃ ➤ "${query}"
┃
┃ Try:
┃   • Different keywords
┃   • Artist name + song title
╰━━━━━━━━━━━━━━━━━━⬣
> 🎵 Search Engine`);
            }

            const video = search.videos[0];
            videoUrl = video.url;
            title = video.title || title;
            thumbnail = video.thumbnail || '';
            duration = video.timestamp || '';
            author = video.author?.name || 'Unknown';
            views = video.views || 0;
        } else {
            const videoId = query.match(/([a-zA-Z0-9_-]{11})/i)?.[1];
            const search = await yts({ videoId: videoId });

            if (search) {
                title = search.title || title;
                thumbnail = search.thumbnail || '';
                duration = search.timestamp || '';
                videoUrl = search.url || query;
                author = search.author?.name || 'Unknown';
                views = search.views || 0;
            }
        }

        // 🔥 YAHAN PEHLE SIRF EK API THI, AB 4 APIS TRY HONGE
        const apiResult = await getAudioFromApi(videoUrl);
        
        if (!apiResult.success || !apiResult.audioUrl) {
            throw new Error(apiResult.error || "No API could process your request");
        }
        
        const audioUrl = apiResult.audioUrl;
        
        // Update title and thumbnail from API if available
        title = apiResult.title || title;
        thumbnail = apiResult.thumbnail || thumbnail;

        if (!audioUrl) {
            await conn.sendMessage(from, {
                react: { text: '❌', key: m.key }
            });

            return await reply(`╭━〔 ❌ DOWNLOAD FAILED 〕━⬣
┃ Unable to process your request.
┃
┃ ➤ Possible Reasons:
┃   • Song not found
┃   • Video unavailable
┃   • API returned no audio URL
┃
┃ Please try again.
╰━━━━━━━━━━━━━━━━━━⬣
> 🎵 DmlDownloader`);
        }

        const safeTitle = title.replace(/[<>:"/\\|?*]/g, '_').trim();

        // ✅ First: Send Thumbnail Image with Song Info
        await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: `🎧 *Qadeer KD AUDIO DOWNLOADER*
╭━━━━━━━━━━━━━━━⬣
┃ 🎵 *Title:* ${safeTitle}
┃ 👤 *Author:* ${author}
┃ ⏱️ *Duration:* ${duration}
┃ 👁️ *Views:* ${views.toLocaleString()}
┃ 🔌 *API:* ${apiResult.apiUsed}
┃ 📥 *Status:* Downloading...
╰━━━━━━━━━━━━━━━⬣
> ⚡ *Qadeer KD*`
        }, { quoted: mek });

        // ✅ Second: Send Audio File
        await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: 'audio/mpeg',
            fileName: `${safeTitle}.mp3`
        }, { quoted: mek });

        // ✅ Success Reaction
        await conn.sendMessage(from, {
            react: { text: '✅', key: m.key }
        });

    } catch (error) {
        console.error('Play error:', error);

        await conn.sendMessage(from, {
            react: { text: '❌', key: m.key }
        });

        await reply(`╭━〔 🚨 PLAY ERROR 〕━⬣
┃ Something went wrong while processing.
┃
┃ Error:
┃ ${error.message}
┃
┃ Please try again later.
╰━━━━━━━━━━━━━━━━━━⬣
> 🛠️ Qadeer KD System`);
    }
});
