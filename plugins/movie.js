const axios = require('axios');
const { arslan } = require('../arslan');

arslan({
    pattern: "movie",
    desc: "Get movie info from IMDb",
    category: "utility",
    react: "🎬",
    filename: __filename
}, async (sock, mek, m, { from, q, reply }) => {
    try {
        const movieName = q;
        
        if (!movieName) {
            return reply("📽️ *Movie ka naam to do*\nExample: .movie Iron Man");
        }

        const apiUrl = `https://apis.davidcyriltech.my.id/imdb?query=${encodeURIComponent(movieName)}`;
        const { data } = await axios.get(apiUrl);

        if (!data?.status || !data?.movie) {
            return reply("🚫 *Movie nahi mili* 😕\nNaam check karke dobara try karo");
        }

        const movie = data.movie;
        
        // Safe date handling
        let releaseDate = 'N/A';
        try {
            if (movie.released) releaseDate = new Date(movie.released).toLocaleDateString('en-GB');
        } catch {}
        
        // Safe ratings handling
        const rtRating = movie.ratings?.find(r => r.source === 'Rotten Tomatoes')?.value || 'N/A';
        const poster = movie.poster && movie.poster !== 'N/A' ? movie.poster : 'https://files.catbox.moe/tguf7z.jpg';

        const caption = `
🎬 *${movie.title || 'N/A'}* (${movie.year || 'N/A'}) ${movie.rated || ''}

⭐ *IMDb:* ${movie.imdbRating || 'N/A'} | 🍅 *Rotten Tomatoes:* ${rtRating} | 💰 *Box Office:* ${movie.boxoffice || 'N/A'}

📅 *Released:* ${releaseDate}
⏳ *Runtime:* ${movie.runtime || 'N/A'}
🎭 *Genre:* ${movie.genres || 'N/A'}

📝 *Plot:* ${movie.plot || 'N/A'}

🎥 *Director:* ${movie.director || 'N/A'}
✍️ *Writer:* ${movie.writer || 'N/A'}
🌟 *Actors:* ${movie.actors || 'N/A'}

🌍 *Country:* ${movie.country || 'N/A'}
🗣️ *Language:* ${movie.languages || 'N/A'}
🏆 *Awards:* ${movie.awards || 'None'}

[View on IMDb](${movie.imdbUrl || '#'})
`.trim();

        await sock.sendMessage(from, {
            image: { url: poster },
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363424804601329@newsletter',
                    newsletterName: '𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error('Movie plugin error:', e);
        reply(`❌ *Error aa gaya:* ${e.message}\nAPI down ho sakti hai. 2 min baad try karna.`);
    }
});
