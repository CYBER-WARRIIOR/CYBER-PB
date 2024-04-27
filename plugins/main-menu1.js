import {
    promises,
    readFileSync
   } from "fs"
   import {
    join
   } from "path"
   import {
    xpRange
   } from "../lib/levelling.js"
   import moment from "moment-timezone"
   import os from "os"

let groupmenu = ` 
   ✦ ───『 *ɢʀᴏᴜᴘ* 』─── ⚝
  ◈ .ɢᴇᴛʙɪᴏ <@ᴛᴀɢ/ʀᴇᴘʟʏ>  Ⓛ
  ◈ .ᴀɴɪᴍᴇϙᴜᴏᴛᴇ
  ◈ .Sᴇᴛᴅᴇsᴄ <ᴛᴇxᴛ>
  ◈ .sᴇᴛɴᴀᴍᴇ <ᴛᴇxᴛ>
  ◈ .ᴀᴅᴅ
  ◈ .ᴅᴇʟᴇᴛᴇ
  ◈ .ᴅᴇʟᴡᴀʀɴ @ᴜsᴇʀ
  ◈ .ᴅᴇᴍᴏᴛᴇ (@ᴛᴀɢ)
  ◈ .ɪɴғᴏɢᴘ
  ◈ .ʜɪᴅᴇᴛᴀɢ
  ◈ .ɪɴᴠɪᴛᴇ <923xxx>
  ◈ .ᴋɪᴄᴋ @ᴜsᴇʀ
  ◈ .ʟɪɴᴋ
  ◈ .ᴘᴏʟʟ ϙᴜᴇsᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ|ᴏᴘᴛɪᴏɴ
  ◈ .ᴘʀᴏғɪʟᴇ
  ◈ .ᴘʀᴏᴍᴏᴛᴇ
  ◈ .ʀᴇsᴇᴛʟɪɴᴋ
  ◈ .sᴇᴛʙʏᴇ <ᴛᴇxᴛ>
  ◈ .ɢʀᴏᴜᴘ *ᴏᴘᴇɴ/ᴄʟᴏsᴇ*
  ◈ .sᴇᴛᴡᴇʟᴄᴏᴍᴇ <ᴛᴇxᴛ>
  ◈ .sɪᴍᴜʟᴀᴛᴇ <ᴇᴠᴇɴᴛ> @ᴜsᴇʀ
  ◈ .sᴛᴀғғ
  ◈ .ᴛᴀɢᴀʟʟ
  ◈ .ᴛᴏᴛᴀɢ
  ◈ .ᴡᴀʀɴ @ᴜsᴇʀ
  ◈ .ᴡᴀʀɴs
  ◈ .ᴍᴀɪɴ
  ╰──────────⳹`
  
  let ownermenu = `
  ✦ ───『 *ᴏᴡɴᴇʀ* 』─── ⚝
  ◈ .ᴀᴅᴅᴘʀᴇᴍ <@ᴛᴀɢ>
  ◈ .ᴀᴅᴅᴏᴡɴᴇʀ @ᴜsᴇʀ
  ◈ .ᴀʟʟᴏᴡ <@ᴛᴀɢ>
  ◈ .HEROKU
  ◈ .ʙᴀɴ @ᴜsᴇʀ
  ◈ .ʙᴀɴᴄʜᴀᴛ
  ◈ .ᴛx
  ◈ .ʙʀᴏᴀᴅᴄᴀsᴛɢʀᴏᴜᴘ <ᴛᴇxᴛ>
  ◈ .ʙᴄɢᴄ <ᴛᴇxᴛ>
  ◈ .ᴄʟᴇᴀʀᴛᴍᴘ
  ◈ .ᴅᴇʟᴇxᴘɪʀᴇᴅ
  ◈ .ᴅᴇʟᴘʀᴇᴍ @ᴜsᴇʀ
  ◈ .ʀᴇᴍᴏᴠᴇᴏᴡɴᴇʀ @ᴜsᴇʀ
  ◈ .sᴇᴛᴘᴘʙᴏᴛғᴜʟʟ
  ◈ .ɢᴇᴛᴘʟᴜɢɪɴ <ɴᴀᴍᴇ ғɪʟᴇ>
  ◈ .ɢᴇᴛғɪʟᴇ <ɴᴀᴍᴇ ғɪʟᴇ>
  ◈ .ᴊᴏɪɴ <ᴄʜᴀᴛ.ᴡʜᴀᴛsᴀᴘᴘ.ᴄᴏᴍ> <ᴅɪᴀs>
  ◈ .ʀᴇsᴇᴛ <54xxx>
  ◈ .ʀᴇsᴇᴛᴘʀᴇғɪx
  ◈ .ʀᴇsᴛᴀʀᴛ
  ◈ ..sᴇᴛᴘʀᴇғɪx
  ◈ ..sᴇᴛᴘʀᴇғɪx [sʏᴍʙᴏʟ]
  ◈ .ᴜɴʙᴀɴ @ᴜsᴇʀ
  ◈ .ᴜɴʙᴀɴᴄʜᴀᴛ
  ◈ .ᴜᴘᴅᴀᴛᴇ
  ◈ .ᴄᴏɴғɪɢ
  ◈ .ʟɪsᴛʙᴀɴ
  ◈ .ᴅᴇʟᴇᴛᴇᴘʟᴜɢɪɴ <ɴᴀᴍᴇ>
  ◈ .ᴅɪғᴜᴍɪɴᴀʀ2
  ◈ .ʜᴏʀɴʏᴄᴀʀᴅ
  ◈ .ʜᴏʀɴʏʟɪᴄᴇɴsᴇ
  ◈ .ɢғx1
  ◈ .ɢғx2
  ◈ .ɢғx3
  ◈ .ɢғx4
  ◈ .ɢғx5
  ◈ .ɢғx6
  ◈ .ɢғx7
  ◈ .ɢғx8
  ◈ .ɢғx9
  ◈ .ɢғx10
  ◈ .ɢғx11
  ◈ .ɢғx12
  ◈ .sɪᴍᴘᴄᴀʀᴅ
  ◈ .ɪᴛssᴏsᴛᴜᴘɪᴅ
  ◈ .ɪss
  ◈ .sᴛᴜᴘɪᴅ
  ◈ .ᴛᴡᴇᴇᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  ◈ .ʟᴏʟɪᴄᴏɴ
  ◈ .ʏᴛᴄᴏᴍᴍᴇɴᴛ <ᴄᴏᴍᴍᴇɴᴛ>
  ╰──────────⳹`
  
  let stickermenu = `
  🛡️ ───『 *sᴛɪᴄᴋᴇʀ* 』─── 🛡️
  ◈ .ᴇᴍᴏᴊɪᴍɪx <ᴇᴍᴏᴊɪ+ᴇᴍᴏᴊɪ>
  ◈ .ɢᴇᴛsᴛɪᴄᴋᴇʀ
  ◈ .sᴍᴀᴋᴇʀ
  ◈ .sᴛɪᴄᴋᴇʀᴡɪᴛʜᴍᴇᴍᴇ (ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  ◈ .sᴡᴍᴇᴍᴇ <ᴜʀʟ>
  ◈ .sᴡᴍ(ᴄᴀᴘᴛɪᴏɴ|ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ)
  ◈ .sғᴜʟʟ
  ◈ .ᴛᴏɪᴍɢ <sᴛɪᴄᴋᴇʀ>
  ◈ .ᴛᴏᴠɪᴅ
  ◈ .ᴛʀɪɢɢᴇʀ <@ᴜsᴇʀ>
  ◈ .ᴛᴛᴘ
  ◈ .ᴛᴛᴘ2
  ◈ .ᴛᴛᴘ3
  ◈ .ᴛᴛᴘ4
  ◈ .ᴛᴛᴘ5
  ◈ .ᴀᴛᴛᴘ
  ◈ .ᴀᴛᴛᴘ2
  ◈ .ᴀᴛᴛᴘ3
  ◈ .ᴛᴀᴋᴇ <ɴᴀᴍᴇ>|<ᴀᴜᴛʜᴏʀ>
  ╰──────────⳹`
  
  let audiomenu = `
  🛡️ ───『 *ᴀᴜᴅɪᴏ* 』─── 🛡️
  ◈ .ʙᴀss [ᴠɴ]
  ◈ .ʙʟᴏᴡɴ [ᴠɴ]
  ◈ .ᴅᴇᴇᴘ [ᴠɴ]
  ◈ .ᴇᴀʀʀᴀᴘᴇ [ᴠɴ]
  ◈ .ғᴀsᴛ [ᴠɴ]
  ◈ .ғᴀᴛ [ᴠɴ]
  ◈ .ɴɪɢʜᴛᴄᴏʀᴇ [ᴠɴ]
  ◈ .ʀᴇᴠᴇʀsᴇ [ᴠɴ]
  ◈ .ʀᴏʙᴏᴛ [ᴠɴ]
  ◈ .sʟᴏᴡ [ᴠɴ]
  ◈ .sᴍᴏᴏᴛʜ [ᴠɴ]
  ◈ .ᴛᴜᴘᴀɪ [ᴠɴ]
  ╰──────────⳹`
  
  
  let newsmenu = `
  ✦ ───『 *ɴᴇᴡs* 』─── ⚝
  ◈ .ɴᴇᴡs
  ◈ .ᴛᴇᴄʜɴᴇᴡs
  ◈ .ɴᴅᴛᴠ
  ╰──────────⳹
  `
  
  let toolsmenu = `
  🛡️ ───『 *ᴛᴏᴏʟs* 』─── 🛡️
  🛡️ .ɴᴏᴡᴀ
  🛡️ .ϙʀ <ᴛᴇxᴛ>
  🛡️ .ϙʀᴄᴏᴅᴇ <ᴛᴇxᴛ>
  🛡️ .sᴛʏʟᴇ <ᴋᴇʏ> <ᴛᴇxᴛ>
  🛡️ .ᴡᴇᴀᴛʜᴇʀ *<ᴘʟᴀᴄᴇ>*
  🛡️ .ᴅᴇʜᴀᴢᴇ
  🛡️ .ʀᴇᴄᴏʟᴏʀ
  🛡️ .ʜᴅʀ
  🛡️ .ʟᴇɴɢᴛʜ <ᴀᴍᴏᴜɴᴛ>
  🛡️ .ᴛɪɴʏᴜʀʟ <ʟɪɴᴋ>
  🛡️ .sʜᴏʀᴛᴇɴ <ʟɪɴᴋ>
  🛡️ .ᴛᴇᴍᴘᴍᴀɪʟ
  🛡️ .sʜᴀᴢᴀᴍ
  🛡️ .ᴄᴀʟ <ᴇϙᴜᴀᴛɪᴏɴ>
  🛡️ .ᴄᴀʀʙᴏɴ <ᴄᴏᴅᴇ>
  🛡️ .ᴅᴇғɪɴᴇ <ᴡᴏʀᴅ>
  🛡️ .ᴇʟᴇᴍᴇɴᴛ
  🛡️ .ɢᴏᴏɢʟᴇ
  🛡️ .ɪᴛᴜɴᴇs
  🛡️ .ʟʏʀɪᴄs
  🛡️ .ɪᴍᴅʙ
  🛡️ .ᴄᴏᴜʀsᴇ
  🛡️ .ʀᴀɴᴅᴏᴍᴄᴏᴜʀsᴇ
  🛡️ .ʀᴇᴀᴅᴍᴏʀᴇ <ᴛᴇxᴛ1>|<ᴛᴇxᴛ2>
  🛡️ .ʀᴇᴀᴅᴠᴏ
  🛡️ .ʀᴇᴍᴏᴠᴇʙɢ
  🛡️ .ss <ᴜʀʟ>
  🛡️ .ssғ <ᴜʀʟ>
  🛡️ .sᴜʙʀᴇᴅᴅɪᴛ
  🛡️ .ᴛᴇʟᴇsᴛɪᴄᴋᴇʀ  Ⓛ
  🛡️ .ᴛᴏᴜʀʟ
  🛡️ .ᴛʀᴀɴsʟᴀᴛᴇ <ʟᴀɴɢ> <ᴛᴇxᴛ>
  🛡️ .ᴛʀᴜᴇ
  🛡️ .ᴛᴛs <ʟᴀɴɢ> <ᴛᴀsᴋ>
  🛡️ .ᴡᴀ
  🛡️ .ᴡɪᴋɪᴘᴇᴅɪᴀ
  ╰━━━━━━━━━━━━━━━━━━━━╯`
  
  let Aimenu = `
  🛡️ ───『 *AI* 』─── 🛡️
  🛡️.ʙɪɴɢ
  🛡️.ᴅᴀʟʟᴇ
  🛡️.ɢᴘᴛ
  🛡️.ᴛᴏᴀɴɪᴍᴇ
  🛡️.ᴛᴏᴄᴀʀᴛᴏᴏɴ
  🛡️.ᴀɪ
  🛡️.ʙᴀʀᴅ
  🛡️.ᴀʟᴇxᴀ
  🛡️.ɢᴘᴛ2
  ╰━━━━━━━━━━━━━━━━╯
  `
  let religionmenu = `
  ✦ ───『 *ʀᴇʟɪɢɪᴏɴ* 』─── ⚝
  ◈ .ϙᴜʀᴀɴᴍᴇɴᴜ ғᴏʀ ɢᴇᴛᴛɪɴɢ ɴᴜᴍʙᴇʀ
  ◈ .ϙᴜʀᴀɴ [sᴜʀᴀʜ_ɴᴜᴍʙᴇʀ|sᴜʀᴀʜ_ɴᴀᴍᴇ]
  ╰──────────⳹`

  let studymenu = `╭━━⊱•🛡️ *sᴛᴜᴅʏᴍᴇɴᴜ* 🛡️•⊱━━╮
│✫ .ϙᴜʀᴀɴᴍᴇɴᴜ
│✫ .sᴜʀᴀʜ 36  
│✫ .ɢᴘᴛ
│✫ .ɢᴘᴛ2    
│✫ .ʙɪɴɢ  
│✫ .ʙᴀʀᴅ 
│✫ .ϙᴜᴏᴛᴇ  
│✫ .ᴀɪsᴇᴀʀᴄʜ 
│✫ .ᴅᴇғɪɴᴇ
│✫ .ᴇʟᴇᴍᴇɴᴛ
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  
  let botmenu = `
  🛡️ ───『 *Bᴏᴛ Mᴇɴᴜ* 』─── 🛡️
  🛡️ .ᴘɪɴɢ
  🛡️ .ʀᴜɴᴛɪᴍᴇ
  🛡️ .sᴄʀɪᴘᴛ
  🛡️ .sᴇʀᴠᴇʀ
  🛡️ .ʙʟᴏᴄᴋʟɪsᴛ
  🛡️ .ᴀʟɪᴠᴇ
  🛡️ .ɪɴғᴏ
  🛡️ .ᴏᴡɴᴇʀ
  🛡️ .ᴛᴏᴛᴀʟғᴇᴀᴛᴜʀᴇ
  🛡️ .ʟɪsᴛ
  🛡️ .ᴄʀɪsᴛɪᴀɴᴏʀᴏɴᴀʟᴅᴏ
  🛡️ .ᴄʀ7
  🛡️ .ᴘᴘᴄᴏᴜᴘʟᴇ 
  🛡️ .ᴘᴘᴄᴘ
  🛡️ .ᴘɪɴᴛᴇʀᴇsᴛ
  🛡️ .ᴍʏsɴ
  ╰━━━━━━━━━━━━━━━━━━━╯
  `
  let pluginmenu = `
  ✦ ───『 *ᴘʟᴜɢɪɴ* 』─── ⚝
  ◈ .ᴘʟᴜɢɪɴs
  ◈ .ɪɴsᴛᴀʟʟ <Gɪsᴛ URL>
  ╰──────────⳹
  `

  const handler = async (m, {
    conn,
    command,
    text,
    args,
    usedPrefix
  }) => {
    
  
   let glb = global.db.data.users
   let usrs = glb[m.sender]
   let tag = `@${m.sender.split("@")[0]}`
   let mode = global.opts["self"] ? "Private" : "Public"
   
   let {
  age,
  exp,
  limit,
  level,
  role,
  registered,
  credit
   } = glb[m.sender]
   let {
  min,
  xp,
  max
   } = xpRange(level, global.multiplier)
   let name = await conn.getName(m.sender)
   let premium = glb[m.sender].premiumTime
   let prems = `${premium > 0 ? "Premium": "Free"}`
   let platform = os.platform()
  
 
  
   let _uptime = process.uptime() * 1000
   let _muptime
   if (process.send) {
  process.send("uptime")
  _muptime = await new Promise(resolve => {
  process.once("message", resolve)
  setTimeout(resolve, 1000)
  }) * 1000
   }
   let muptime = clockString(_muptime)
   let uptime = clockString(_uptime)
  
   
   let totalfeatures = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
   let totalreg = Object.keys(glb).length
  
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    
   
    global.fcontact = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
    const infoText = `

     ╭━༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺⊰━─


╭━⊱「Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴄᴍᴅ ᴍᴇɴᴜ⊱━╮
│
│🕋✫ - 「1${usedPrefix}𝘘𝘶𝘳𝘢𝘯𝘮𝘦𝘯𝘶
│📚✫ - 「2${usedPrefix}𝘚𝘵𝘶𝘥𝘺𝘮𝘦𝘯𝘶
│🛡️✫ - 「3${usedPrefix}𝘖𝘸𝘯𝘦𝘳𝘮𝘦𝘯𝘶
│💌✫ - 「4${usedPrefix}𝘉𝘰𝘵𝘮𝘦𝘯𝘶 
│🧬✫ - 「5${usedPrefix}𝘎𝘳𝘰𝘶𝘱𝘮𝘦𝘯𝘶
│📥✫ - 「6${usedPrefix}𝘋𝘭𝘮𝘦𝘯𝘶
│🧰✫ - 「7${usedPrefix}𝘛𝘰𝘰𝘭𝘮𝘦𝘯𝘶
│🎨✫ - 「8${usedPrefix}𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘮𝘦𝘯𝘶
│🎉✫ - 「9${usedPrefix}𝘍𝘶𝘯𝘮𝘦𝘯𝘶 
│🎮✫ - 「10${usedPrefix}𝘎𝘢𝘮𝘦𝘮𝘦𝘯𝘶
│🎩✫ - 「11${usedPrefix}𝘓𝘰𝘨𝘰𝘮𝘦𝘯𝘶
╰━━━━━━━━━━━━━━━━━━━━━━╯
    *⏜✩ 𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹 𓃮•:)*                  

*🌸🤭- " 𝐀 𝐅ɑkə 𝐒mıɭə 𝐂ɑη ┣𝐥ıdə  𝐌ıɭɭıoηs 𝐎f 𝐓əɑrs ||%❤😚*
 ` 
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: fcontact })
  
  // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 150 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: quranmenu
      }, { quoted:fcontact });
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: studymenu
      }, { quoted:fcontact });
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: ownermenu
      }, { quoted:fcontact });
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: botmenu 
      }, { quoted:fcontact });
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: groupmenu
      }, { quoted:fcontact });
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: dlmenu
      }, { quoted:fcontact });
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: toolmenu
      }, { quoted:fcontact });
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: stickermenu
      }, { quoted:fcontact });
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: funmenu
      }, { quoted:fcontact });
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: gamemenu
      }, { quoted:fcontact });
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4DUbHJG.jpeg' },
        caption: logomenu
      }, { quoted:fcontact });
      
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["downloader"];
  handler.command = /^(menu)$/i;
  handler.limit = true;
  export default handler;
 