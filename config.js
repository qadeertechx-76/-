const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "Qadeer-KD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkFyamtFUXVvVWxmZzlBQlF4d2hpdGJnakpxdTIrT3JheTkrUGUvL0JFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2NiM0ZUbTNlZWVVQXk0L3cxM2xsaFJCWSs2MkZtSHZ1Z0ZtaDNDWENFND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXREovV1M4aWVlUXJ2VE9wZWg5Ry9ZeUJ0em9TcEp2RGZoRTVqVDBUbms4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVOGwvNlBWc2V0MUMxZzV2K1NtZlNvNFFCTm5rZi8xMEFqYnVpazlTMFZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVKQ1EvbXo0anV5NEtZTnlBZkhNZzRzVW9FZUp1WEExMms1bEpRQzNNa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlmR3JQMTBVYlZFdVN5MFoya0RDN0VsTVh1ek1xUm16VVQ1WFZtSHlueDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU5nc3c3UTFNcGRQV1M1RFlHTWFtQU5vcm1BaW5YbUxwaU1vZlhLV1FGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWRzN3ZxSElKV1A1eXNsQW53UEZNK2ozSzVHV1ZKZGVnZWlXS0xxL3NDVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRTmQ4M09oR1grTVZ3TkZReDVMZEZQbFN3QXdXVjJkLysvUndFbndNZ3JSdWNvdFFWZCtIVWxieHZqdStJdmczQVhxL1Z2VkYrY1c0ZnlLSjhPaGpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiIwQXRPdWNwNXBPR3EyYkFkK1E3NXIrVzM0aHRIRGU4VjlqS2d0QTEwNnpVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6ODE0LCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODE0LCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkFDOTlITEJXIiwibWUiOnsiaWQiOiI5MjMzNjk0MjM1MzE6NDNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNTY3MDY3NjM5ODkwODg6NDNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQVzA4WVlIRU1HUmx0QUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJndWdSNUdJWTRvamYrNjFtMEwydG1YYmJrTUo1a1VCYmE2Z2tWa3owRmgwPSIsImFjY291bnRTaWduYXR1cmUiOiJHcjFIaXZFYzhVV3hvSklxaURQNjF5R2ZhbS91NGEyYXhZSUpYT2szaDcwVEs4Y2NxaTdlckFQdytkRXRxY0ZOa1lFNlVaV09LckNhckxpNW1BeUREQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoickwxWUpjOHVnenV0UVN6YndQL09WdFhVVngyMGdJQ0Q1eHRSZ1N0bmtBVzg1d3VHakpBaDZONHpzNlVlS3NucVdyQWg0eDA0bW5rZmtWa1JNTUhhamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxNTY3MDY3NjM5ODkwODg6NDNAbGlkIiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllMb0VlUmlHT0tJMy91dFp0QzlyWmwyMjVEQ2VaRkFXMnVvSkZaTTlCWWQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElDQWdTIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3ODc0NzU5NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHN0EifQ==",
// add your Session Id 
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*𝚂𝙴𝙴𝙽 𝚈𝙾𝚄𝚁 𝚂𝚃𝙰𝚃𝚄𝚂 𝙱𝚈 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃 🤍*",
// set the auto reply massage on status reply  
ANTI_DELETE: process.env.ANTI_DELETE || "true",
// set true false for anti delete     
ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", 
// change it to 'same' if you want to resend deleted message in same chat     
WELCOME: process.env.WELCOME || "true",
// true if want welcome and goodbye msg in groups    
ADMIN_EVENTS: process.env.ADMIN_EVENTS || "false",
// make true to know who dismiss or promoted a member in group
ANTI_LINK: process.env.ANTI_LINK || "true",
// make anti link true,false for groups 
MENTION_REPLY: process.env.MENTION_REPLY || "false",
// make true if want auto voice reply if someone menetion you 
MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://eliteprotech-url.zone.id/1778606368589obfzir.jpg",
// add custom menu and mention reply image url
PREFIX: process.env.PREFIX || ".",
// add your prifix for bot   
BOT_NAME: process.env.BOT_NAME || "𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃",
// add bot namw here for menu
STICKER_NAME: process.env.STICKER_NAME || "𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃",
// type sticker pack name 
CUSTOM_REACT: process.env.CUSTOM_REACT || "true",
// make this true for custum emoji react    
CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️‍🩹,❤️,🧡,💛,💚,💙,💜,🤎,🖤,🤍",
// chose custom react emojis by yourself 
DELETE_LINKS: process.env.DELETE_LINKS || "true",
// automatic delete links witho remove member 
OWNER_NUMBER: process.env.OWNER_NUMBER || "923369423531",
// add your bot owner number
OWNER_NAME: process.env.OWNER_NAME || "𓆩𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃𓆪",
// add bot owner name
DESCRIPTION: process.env.DESCRIPTION || "*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃 ❣️*",
// add bot owner name    
ALIVE_VID: process.env.ALIVE_VID || "𝐐𝐚𝐝ᥱ֟፝𝐞𝐫-𝐊𝐃",
// add img for alive msg
LIVE_MSG: process.env.LIVE_MSG || "𝚉𝙸𝙽𝙳𝙰 𝙷𝚄𝙽 𝚈𝙰𝚁 🤖",
// add alive msg here 
READ_MESSAGE: process.env.READ_MESSAGE || "false",
// Turn true or false for automatic read msgs
AUTO_REACT: process.env.AUTO_REACT || "false",
// make this true or false for auto react on all msgs
ANTI_BAD: process.env.ANTI_BAD || "true",
// false or true for anti bad words  
MODE: process.env.MODE || "private",
// make bot public-private-inbox-group 
ANTI_LINK_KICK: process.env.ANTI_LINK_KICK || "true",
// make anti link true,false for groups 
AUTO_STICKER: process.env.AUTO_STICKER || "false",
// make true for automatic stickers 
AUTO_REPLY: process.env.AUTO_REPLY || "false",
// make true or false automatic text reply 
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false",
// maks true for always online 
PUBLIC_MODE: process.env.PUBLIC_MODE || "false",
// make false if want private mod
AUTO_TYPING: process.env.AUTO_TYPING || "true",
// true for automatic show typing   
READ_CMD: process.env.READ_CMD || "false",
// true if want mark commands as read 
DEV: process.env.DEV || "923369423531",
//replace with your whatsapp number        
ANTI_VV: process.env.ANTI_VV || "false",
// true for anti once view 
AUTO_RECORDING: process.env.AUTO_RECORDING || "false"
// make it true for auto recoding 
};
