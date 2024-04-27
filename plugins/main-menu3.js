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
  ╰──────────⳹`
  
  let funmenu = `
  ✦ ───『 *ғᴜɴ* 』─── ⚝
  ◈ .ᴀғᴋ <ʀᴇᴀsᴏɴ>
  ◈ .ᴛᴏᴍᴘ3
  ◈ .ᴛᴏᴀᴠ
  ◈ .ʙᴏᴛ
  ◈ .ᴄʜᴀʀᴀᴄᴛᴇʀ @ᴛᴀɢ
  ◈ .ᴅᴀʀᴇ
  ◈ .ғʟɪʀᴛ
  ◈ .ɢᴀʏ @ᴜsᴇʀ
  ◈ .ᴘɪᴄᴋᴜᴘʟɪɴᴇ
  ◈ .ϙᴜᴇsᴛɪᴏɴ
  ◈ .sʜᴀʏᴀʀɪ
  ◈ .sʜɪᴘ
  ◈ .ʏᴏᴍᴀᴍᴀᴊᴏᴋᴇ
  ◈ .ᴛʀᴜᴛʜ
  ◈ .ᴡᴀsᴛᴇ @ᴜsᴇʀ
  ◈ .ɪᴍᴀɢᴇ
  ◈ .ᴍᴇᴍᴇ
  ◈ .ϙᴜᴏᴛᴇ
  ╰──────────⳹`
  
  let reactmenu = `
  ✦ ───『 *ʀᴇᴀᴄᴛɪᴏɴ* 』─── ⚝
  ◈ .ʙᴜʟʟʏ @ᴛᴀɢ
  ◈ .ᴄᴜᴅᴅʟᴇ @ᴛᴀɢ
  ◈ .ᴄʀʏ @ᴛᴀɢ
  ◈ .ʜᴜɢ @ᴛᴀɢ
  ◈ .ᴀᴡᴏᴏ @ᴛᴀɢ
  ◈ .ᴋɪss @ᴛᴀɢ
  ◈ .ʟɪᴄᴋ @ᴛᴀɢ
  ◈ .ᴘᴀᴛ @ᴛᴀɢ
  ◈ .sᴍᴜɢ @ᴛᴀɢ
  ◈ .ʙᴏɴᴋ @ᴛᴀɢ
  ◈ .ʏᴇᴇᴛ @ᴛᴀɢ
  ◈ .ʙʟᴜsʜ @ᴛᴀɢ
  ◈ .sᴍɪʟᴇ @ᴛᴀɢ
  ◈ .ᴡᴀᴠᴇ @ᴛᴀɢ
  ◈ .ʜɪɢʜғɪᴠᴇ @ᴛᴀɢ
  ◈ .ʜᴀɴᴅʜᴏʟᴅ @ᴛᴀɢ
  ◈ .ɴᴏᴍ @ᴛᴀɢ
  ◈ .ʙɪᴛᴇ @ᴛᴀɢ
  ◈ .ɢʟᴏᴍᴘ @ᴛᴀɢ
  ◈ .sʟᴀᴘ @ᴛᴀɢ
  ◈ .ᴋɪʟʟ @ᴛᴀɢ
  ◈ .ʜᴀᴘᴘʏ @ᴛᴀɢ
  ◈ .ᴡɪɴᴋ @ᴛᴀɢ
  ◈ .ᴘᴏᴋᴇ @ᴛᴀɢ
  ◈ .ᴅᴀɴᴄᴇ @ᴛᴀɢ
  ◈ .ᴄʀɪɴɢᴇ @ᴛᴀɢ
  ╰──────────⳹`
  
  let dlmenu = `
  ✦ ───『 *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 』───✫
  │◈ .ғᴀᴄᴇʙᴏᴏᴋ <ᴜʀʟ>
  │◈ .ɢᴅʀɪᴠᴇ <ᴜʀʟ>
  │◈ .ɢɪᴛᴄʟᴏɴᴇ <ᴜʀʟ>
  │◈ .ɪɢsᴛᴀʟᴋ
  │◈ .ɪɴsᴛᴀɢʀᴀᴍ
  │◈ .ᴍᴇᴅɪᴀғɪʀᴇ <ᴜʀʟ>
  │◈ .ᴍᴇɢᴀ
  │◈ .ᴍᴏᴅᴀᴘᴋ
  │◈ .ᴘʟᴀʏ <ϙᴜᴇʀʏ>
  │◈ .ᴘʟᴀʏʏ <ᴛᴇxᴛ>
  │◈ .ᴠɪᴅᴇᴏ <ᴛᴇxᴛ>
  │◈ .ᴛɪᴋᴛᴏᴋ <ᴜʀʟ>
  │◈ .ᴛɪᴋᴛᴏᴋsᴛᴀʟᴋ
  │◈ .ᴛᴡɪᴛᴛᴇʀ <ᴜʀʟ>
  │◈ .ʏᴛᴀ <ᴜʀʟ>
  │◈ .ʏᴛᴅʟ <ᴜʀʟ>
  │◈ .ʏᴛᴠ <ᴜʀʟ>
  │◈ .ʏᴛᴍᴘ3 <ᴜʀʟ>
  │◈ .ʏᴛsᴇᴀʀᴄʜ <ϙᴜᴇʀʏ>
  │◈ .ʏᴛᴍᴘ4 <ʏᴛ-ʟɪɴᴋ>
  │◈ .ᴡᴀʟʟᴘᴀᴘᴇʀ <ϙᴜᴇʀʏ>
  ╰━━━━━━━━━━━━━━━━━━━━╯`
  
  let gamemenu = `
  ✦ ───『 *ɢᴀᴍᴇ* 』─── ⚝
  ◈ .sʟᴏᴛ <ᴀᴍᴏᴜɴᴛ>
  ◈ .ᴄʜᴇss [ғʀᴏᴍ ᴛᴏ]
  ◈ .ᴄʜᴇss ᴅᴇʟᴇᴛᴇ
  ◈ .ᴄʜᴇss ᴊᴏɪɴ
  ◈ .ᴄʜᴇss sᴛᴀʀᴛ
  ◈ .ᴅᴇʟᴛᴛᴛ
  ◈ .ɢᴜᴇssғʟᴀɢ
  ◈ .Mᴀᴛʜs <ᴍᴏᴅᴇs>
  ◈ .ᴘᴘᴛ <ʀᴏᴄᴋ/ᴘᴀᴘᴇʀ/sᴄɪssᴏʀs>
  ◈ .ᴛɪᴄᴛᴀᴄᴛᴏᴇ <ᴛᴀɢ ɴᴜᴍʙᴇʀ>
  ╰──────────⳹`

  let logomenu = `
  ✦ ───『 *ᴍᴀᴋᴇʀ* 』─── ⚝
  ◈ .ʙʟᴜʀ
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
  
  
   let ucpn = `${ucapan()}`
  
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
   `
;

  
  const { result, key, timeout } = await conn.sendMessage(m.chat, { video: { url: menuvid }, caption: infoText.trim(),  gifPlayback: true,
  gifAttribution: 0}, { quoted: m})
  
 ` ╭━༻𝑪𝒀𝑩𝑬𝑹_𝑾𝑨𝑹𝑹𝑰𝑶𝑹༺⊰━─


╭━⊱「Wᴇʟᴄᴏᴍᴇ ᴛᴏ ᴄᴍᴅ ᴍᴇɴᴜ⊱━╮
│
│🕋✫ - 「${usedPrefix}𝘘𝘶𝘳𝘢𝘯𝘮𝘦𝘯𝘶
│📚✫ - 「${usedPrefix}𝘚𝘵𝘶𝘥𝘺𝘮𝘦𝘯𝘶
│🛡️✫ - 「${usedPrefix}𝘖𝘸𝘯𝘦𝘳𝘮𝘦𝘯𝘶
│💌✫ - 「${usedPrefix}𝘉𝘰𝘵𝘮𝘦𝘯𝘶 
│🧬✫ - 「${usedPrefix}𝘎𝘳𝘰𝘶𝘱𝘮𝘦𝘯𝘶
│📥✫ - 「${usedPrefix}𝘋𝘭𝘮𝘦𝘯𝘶
│🧰✫ - 「${usedPrefix}𝘛𝘰𝘰𝘭𝘮𝘦𝘯𝘶
│🎨✫ - 「${usedPrefix}𝘚𝘵𝘪𝘤𝘬𝘦𝘳𝘮𝘦𝘯𝘶
│🎉✫ - 「${usedPrefix}𝘍𝘶𝘯𝘮𝘦𝘯𝘶 
│🎮✫ - 「${usedPrefix}𝘎𝘢𝘮𝘦𝘮𝘦𝘯𝘶
│🎩✫ - 「${usedPrefix}𝘓𝘰𝘨𝘰𝘮𝘦𝘯𝘶
│ *${usedPrefix}ᴍᴇɴᴜ2 ғᴏʀ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ*
│ *${usedPrefix}ᴍᴇɴᴜ3 ғᴏʀ sᴘᴇᴄɪᴀʟ ᴍᴇɴᴜ ʟɪsᴛ*
│ *${usedPrefix}ʟɪsᴛ ғᴏʀ ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅs ʟɪsᴛ*
│
│ *${greeting}*
╰━━━━━━━━━━━━━━━━━━━━━━╯
📚 *_Quote of the day: ${quote}_* 📚
`


    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, false)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help','h','commands'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
    function ucapan() {
      const time = moment.tz('Asia/Karachi').format('HH')
      let res = "happy early in the day☀️"
      if (time >= 4) {
        res = "Good Morning 🌄"
      }
      if (time >= 10) {
        res = "Good Afternoon ☀️"
     }
      if (time >= 15) {
        res = "Good Afternoon 🌇"
      }
      if (time >= 18) {
        res = "Good Night 🌙"
      }
      return res
    }
    const quotes = [
      "I'm not lazy, I'm just on my energy saving mode.",
      "Life is short, smile while you still have teeth.",
      "I may be a bad influence, but darn I am fun!",
      "I'm on a whiskey diet. I've lost three days already.",
      "Why don't some couples go to the gym? Because some relationships don't work out.",
      "I told my wife she should embrace her mistakes... She gave me a hug.",
      "I'm great at multitasking. I can waste time, be unproductive, and procrastinate all at once.",
      "You know you're getting old when you stoop to tie your shoelaces and wonder what else you could do while you're down there.",
      "I'm so good at sleeping, I can do it with my eyes closed.",
      "If you think nobody cares if you’re alive, try missing a couple of payments.",
      "I used to think I was indecisive, but now I'm not so sure.",
      "If you can't convince them, confuse them.",
      "I told my wife she was drawing her eyebrows too high. She looked surprised.",
      "I'm not clumsy, I'm just on a mission to test gravity.",
      "I told my wife she should do more push-ups. She said, 'I could do a hundred!' So I counted to ten and stopped.",
      "Life is like a box of chocolates; it doesn't last long if you're hungry.",
      "I'm not saying I'm Wonder Woman, I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "Why do they call it beauty sleep when you wake up looking like a troll?",
      "I don't always lose my phone, but when I do, it's always on silent.",
      "My bed is a magical place where I suddenly remember everything I was supposed to do.",
      "I love the sound you make when you shut up.",
      "I'm not arguing, I'm just explaining why I'm right.",
      "I'm not a complete idiot, some parts are missing.",
      "When life gives you lemons, squirt someone in the eye.",
      "I don't need anger management. You just need to stop making me angry.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together.",
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together.",
      "The early bird can have the worm because worms are gross and mornings are stupid.",
      "If life gives you lemons, make lemonade. Then find someone whose life has given them vodka and have a party!",
      "The road to success is always under construction.",
      "I am so clever that sometimes I don't understand a single word of what I am saying.",
      "Some people just need a high-five. In the face. With a chair.",
      "I'm not saying I'm perfect, but I'm pretty close.",
      "A day without sunshine is like, you know, night.",
      "The best way to predict the future is to create it.",
      "If you can't be a good example, then you'll just have to be a horrible warning.",
      "I don't know why I keep hitting the escape button. I'm just trying to get out of here.",
      "I'm not lazy. I'm on energy-saving mode.",
      "I don't need a hairstylist, my pillow gives me a new hairstyle every morning.",
      "I don't have a bad handwriting, I have my own font.",
      "I'm not clumsy. It's just the floor hates me, the table and chairs are bullies, and the walls get in my way.",
      "I'm not saying I'm Batman. I'm just saying no one has ever seen me and Batman in the same room together.",
      "I'm not saying I'm Wonder Woman. I'm just saying no one has ever seen me and Wonder Woman in the same room together.",
      "I'm not saying I'm Superman. I'm just saying no one has ever seen me and Superman in the same room together.",
      "I'm not saying I'm Spider-Man. I'm just saying no one has ever seen me and Spider-Man in the same room together."
      "I'm not saying I'm a superhero. I'm just saying no one has ever seen me and a superhero in the same room together." // Save the menu options to gurumenu
  conn.gurumenu[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, {
          delete: key
      });
      delete conn.gurumenu[m.sender];
  }, 180 * 1000),
  };
  };
  
 
  handler.before = async (m, { conn }) => {
    conn.gurumenu = conn.gurumenu ? conn.gurumenu : {};
    if (m.isBaileys || !(m.sender in conn.gurumenu)) return;
    const { result, key, timeout } = conn.gurumenu[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    
    if (choice === "1") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: botmenu
      }, { quoted: m});
      } else if (choice === "2") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: ownermenu
      }, { quoted: m});
      } else if (choice === "3") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: groupmenu
      }, { quoted: m});
      } else if (choice === "4") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: funmenu
      }, { quoted: m});
      } else if (choice === "5") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: reactmenu
      }, { quoted: m});
      } else if (choice === "6") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: dlmenu
      }, { quoted: m});
      } else if (choice === "7") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: groupmenu
      }, { quoted: m});
      } else if (choice === "8") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: logomenu
      }, { quoted: m});
      } else if (choice === "9") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: stickermenu
      }, { quoted: m});
      } else if (choice === "10") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: audiomenu
      }, { quoted: m});
      } else if (choice === "11") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: newsmenu
      }, { quoted: m});
      } else if (choice === "12") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: studymenu
      }, { quoted: m});
      } else if (choice === "13") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: toolsmenu
      }, { quoted: m});
      } else if (choice === "14") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: Aimenu
      }, { quoted: m});
      } else if (choice === "15") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/2BnfZMp.jpg' },
        caption: religionmenu
      }, { quoted: m});
      } else if (choice === "16") {
        await conn.sendMessage(m.chat, { image: { url: 'https://i.imgur.com/4IG2V4q.png' },
        caption: pluginmenu
      }, { quoted: m});
      } else {
        m.reply('Iɴᴠᴀʟɪᴅ ᴄʜᴏɪᴄᴇ. Pʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴡɪᴛʜ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ𒁂.');
      }
  
  };
  
  
  handler.help = ["play"];
  handler.tags = ["main"];
  handler.command = /^(menu)$/i;
  handler.limit = false;
  export default handler;
  
  
  
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
   }
   
   const more = String.fromCharCode(8206)
   const readMore = more.repeat(4001)
   
   function clockString(ms) {
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [h, " H ", m, " M ", s, " S "].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function clockStringP(ms) {
    let ye = isNaN(ms) ? "--" : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? "--" : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60
    return [ye, " *Years 🗓️*\n", mo, " *Month 🌙*\n", d, " *Days ☀️*\n", h, " *Hours 🕐*\n", m, " *Minute ⏰*\n", s, " *Second ⏱️*"].map(v => v.toString().padStart(2, 0)).join("")
   }
   
   function ucapan() {
    const time = moment.tz("Asia/Karachi").format("HH")
    let res = "Good morning ☀️"
    if (time >= 4) {
     res = "Good Morning 🌄"
    }
    if (time >= 10) {
     res = "Good Afternoon ☀️"
    }
    if (time >= 15) {
     res = "Good Afternoon 🌇"
    }
    if (time >= 18) {
     res = "Good Night 🌙"
    }
    return res
   }
  
