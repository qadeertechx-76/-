const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "FAIZAN-MD~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUNHMG5YOHJ4MldtR2dZenpmQXI4ZXhFUEdLY203ZWR2U3dBS1JsRXhtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNitHQ2Y0cTVSQ1JRM0FrQnRiRjFpc2w1clJjalJQTHJpa2hRYkduZkNCOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SmxmNXhyeWJVdTRNWXdySmNMRzZpZG1USXc4KzVvTmtGUk0yWWRmb1VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QnhIWWJmY0x3Y2huOTE1dnNiT0UxSlRoZW4zdmVSUXhXRGo2MlZZUW5BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNEVWFhaUNDMTlKd0F3Y2NGVEdjdnltb24ydDdjZjlWcnpGV0pGL3RWWGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklaNVVSeUNRVDM1Z2JJUCs3TXVZYzJGdUhRZjcrNTh5WVJXbkhnMFdBUWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0x3MWI4NGlIWXE5QmNXWlF0R1Exckx6MEhyV2RHa0hVT3ZlcERMT0MxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk93dkdMUC93aXhoeHNuN0lqNXBEUWNBVHJHTnVmWVJjK1d0b2JJTVptQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNxYnlFMFp0VkRvYVJKdEFjRzQ1Sk5ZaEt4cWl1ZENCOW9JMFBTeEVEQU42VHpjUEdKWjhtaTdwS3pDVU1oeUROOVExQlJqOFVDSW94RzIycW5VVUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc4LCJhZHZTZWNyZXRLZXkiOiJEeCtKU2JOY0UycGZ1N1RjQk9UTStTSmlVQ25HSUpPc2gzKzBtOVFmUWRRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzM2OTQyMzUzMUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQ0ZGMDgyNEJBRUJCRDY0MzAxRjQ2RkI4NUQyRTQ0MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzc4NjEyMDUyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MjMzNjk0MjM1MzFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUNBODcyMkFEMTI4NThCNDU1N0MyNDkwRTM3RUJGRjEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc3ODYxMjA1Mn1dLCJuZXh0UHJlS2V5SWQiOjgxMywiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjgxMywiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGQUlaQU5NRCIsIm1lIjp7ImlkIjoiOTIzMzY5NDIzNTMxOjQyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTU2NzA2NzYzOTg5MDg4OjQyQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFcwOFlZSEVMdnVqZEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZ3VnUjVHSVk0b2pmKzYxbTBMMnRtWGJia01KNWtVQmJhNmdrVmt6MEZoMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoia2s3djhmS05jTVZobDhuUGVrekhNT0xnMTgrU1h5ZEN4VUF5dnJ5cGlYa3IzZUdHdTZGQzN4SVh5TXc2QTVHcTBPQ3lzNSs1ZVdvMnpwWDNyQjhTQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImN3STA2VytNUmRvQ2QwOGx1c21WckJMSnRtWmNrWStCdWNMNzlyU1hEM01ycEJ5WmNQRGJRejgwWWNzR2lrbXRwaUF4UjRreUV0VzJBSmlRNnAzZEN3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMzY5NDIzNTMxOjQyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllMb0VlUmlHT0tJMy91dFp0QzlyWmwyMjVEQ2VaRkFXMnVvSkZaTTlCWWQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBTUlDd2dTIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc3ODYxMjA0NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHN0EifQ==",
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
