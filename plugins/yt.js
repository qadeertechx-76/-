const axios = require("axios");
const config = require("../config");
const { cmd } = require("../command");

cmd({
    on: "body",
    fromMe: false,
    dontAddCommandList: true,
}, async (message, match) => {

    try {

        let text = message.body;

        if (!text) return;

        // YouTube link detect
        let url = text.match(
            /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+)/
        );

        if (!url) return;

        await message.react("⬇️");

        let api = `https://api.delirius.store/download/ytmp4?url=${encodeURIComponent(url[0])}&format=360p`;

        let { data } = await axios.get(api);

        if (!data.status || !data.data.download) {
            return await message.reply("❌ Download link nahi mila");
        }

        let video = data.data;

        let caption = `
╭┉◉◉◉◉◉◉◉◉◉◉┉┉┉┉┉┉┉┉┉┉◉
┃ 🎬 *YOUTUBE DOWNLOADER*
┃
┃ ⟡ Title: ${video.title}
┃ ⟡ Author: ${video.author}
┃ ⟡ Views: ${video.views}
┃ ⟡ Quality: ${video.format}
┃
╰┉◉◉◉◉◉◉◉◉◉◉┉┉┉┉┉┉┉┉┉┉◉
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Qadeer-KD 
`;

        await message.sendMessage(
            message.jid,
            {
                image: { url: video.image },
                caption
            }
        );

        await message.sendMessage(
            message.jid,
            {
                video: { url: video.download },
                mimetype: "video/mp4",
                caption: "✅ Download Complete"
            }
        );

        await message.react("✅");

    } catch (e) {

        console.log(e);

        await message.reply(
            "❌ Error while downloading video"
        );

        await message.react("❌");
    }

});