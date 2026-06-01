const { arslan } = require('../arslan');

// ===============================
// 😂 MEMES + STICKERS
// ===============================
arslan({
    pattern: "meme",
    desc: "Random meme bhejta hai",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    const memes = [
        "https://i.imgflip.com/30b1gx.jpg",
        "https://i.imgflip.com/1g8my4.jpg",
        "https://i.imgflip.com/26am.jpg"
    ];
    const meme = memes[Math.floor(Math.random() * memes.length)];
    await sock.sendImage(m.chat, meme, "😂 Le meme", mek);
});

arslan({
    pattern: "sticker",
    desc: "Reply to image to make sticker",
    category: "fun",
    react: "🎨",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    if (!m.quoted || !m.quoted.message?.imageMessage) 
        return reply("❌ Kisi image ko reply karo sticker banane ke liye");
    
    let media = await m.quoted.download();
    await sock.sendSticker(m.chat, media, mek);
});

// ===============================
// 🤣 JOKES + SHAYARI
// ===============================
const jokes = [
    "Teacher: 2+2=?\nStudent: 5\nTeacher: Galat!\nStudent: Thoda sa sahi to hai 😂",
    "Me: Paisa bachana hai\nAlso me: *Sees sale* Bank balance = 0 💸",
    "Exam mein likh diya: 'Iska jawab mujhe bhi nahi pata, aap batao' 🤡"
];

const shayari = [
    "Mohabbat bhi kitni ajeeb hai na,\nMsg seen karke reply na karna 💔",
    "Log kehte hain intezar mat karo,\nPar tera reply to karna padta hai 😅",
    "Dil to chahta hai keh dun I love you,\nPar net pack khatam hai, kal keh dunga 😂"
];

arslan({
    pattern: "joke",
    desc: "Random joke",
    category: "fun",
    react: "🤣",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await reply(joke);
});

arslan({
    pattern: "shayari",
    desc: "Random shayari",
    category: "fun",
    react: "💔",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    const shay = shayari[Math.floor(Math.random() * shayari.length)];
    await reply(`*${shay}*`);
});

// ===============================
// 🎬 MOVIE DIALOGUE + STATUS
// ===============================
const dialogues = [
    "Pushpa: Jhukega nahi sala 🔥",
    "Gabbar: Kitne aadmi the? 😈",
    "Babu Rao: Ye babu bhaiya ka style hai 💼",
    "KGF: Power 🔥"
];

const statuses = [
    "Busy with dreams ✨",
    "Offline for peace ☮️",
    "Good vibes only 🌈",
    "Living my best life 💯"
];

arslan({
    pattern: "dialogue",
    desc: "Movie dialogue",
    category: "fun",
    react: "🎬",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    const d = dialogues[Math.floor(Math.random() * dialogues.length)];
    await reply(`🎬 ${d}`);
});

arslan({
    pattern: "status",
    desc: "WhatsApp status",
    category: "fun",
    react: "📝",
    filename: __filename
}, async (sock, mek, m, { reply }) => {
    const s = statuses[Math.floor(Math.random() * statuses.length)];
    await reply(`📝 ${s}`);
});