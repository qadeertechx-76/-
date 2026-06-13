const axios = require("axios");
const yts = require("yt-search");
const { cmd } = require("../command");

cmd({
    pattern: "ytmp4",
    alias: ["ytvideo", "video"],
    react: "🎬",
    desc: "Download YouTube Video",
    category: "download",
    filename: __filename
},

async (conn, mek, m, { from, args, reply }) => {

try {

let text = args.join(" ");

if (!text) {
return reply(
`╭┉◉◉◉⍟
┃ ❌ *Give YouTube name/url*
┃
┃ Example:
┃ .ytmp4 Shape of You
┃ .ytmp4 https://youtu.be/xxxx
╰┉◉◉◉⍟

> ʀᴀʜᴍᴀɴ-ᴍᴅ`
);
}


await conn.sendMessage(from,{
react:{
text:"⏳",
key:mek.key
}
});


// URL or Search

let videoUrl = text;


if(!text.includes("youtube.com") && !text.includes("youtu.be")){

let result = await yts(text);

if(!result.videos || result.videos.length === 0){
return reply("❌ Video not found");
}

videoUrl = result.videos[0].url;

}



// API CALL

let api = 
`https://api.delirius.store/download/ytmp4?url=${encodeURIComponent(videoUrl)}&format=360p`;


let response = await axios.get(api);


if(!response.data.status){
return reply("❌ API Error");
}



let data = response.data.data;


if(!data.download){
return reply("❌ Download link not found");
}




let caption = 
`╭┉◉◉◉⍟
┃ 🎬 *YOUTUBE VIDEO*
┃
┃ 🎵 *Title:* ${data.title}
┃ 👤 *Author:* ${data.author}
┃ 👀 *Views:* ${data.views}
┃ ❤️ *Likes:* ${data.likes}
╰┉◉◉◉⍟
> Oowered by Qadeer-KD`;



// SEND THUMBNAIL FIRST

await conn.sendMessage(from,
{
image:{
url:data.image
},
caption:caption
},
{
quoted:mek
});




// SEND VIDEO

await conn.sendMessage(from,
{
video:{
url:data.download
},
mimetype:"video/mp4",
fileName:`${data.title}.mp4`,
caption:
`🎬 ${data.title}

> powered by rahman-md`
},
{
quoted:mek
});



await conn.sendMessage(from,{
react:{
text:"✅",
key:mek.key
}
});


}catch(err){

console.log(err);

await conn.sendMessage(from,{
react:{
text:"❌",
key:mek.key
}
});

reply(
`❌ Error:
${err.message}`
);

}

});
