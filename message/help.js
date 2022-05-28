exports.menu = (ucapan, pushname) => {
    return `*${ucapan} ${pushname}*
    
Untuk mengetahui daftar menu bot
Tekan *button* dibawah untuk melihat menu`
}
exports.newMenu = (ucapan, ownerName, botName, multi, prefix, mode, pendaftar, runtime, ramadhan, pushname, isOwner, isPremium, sisalimit, limitCount, sisaGlimit, gcount, expiredPrem, tanggal, jam, emote) => {
    return `*${ucapan} ${pushname}*
┌──⭓ *${botName.toUpperCase()}*
│⭔ *Creator : ${ownerName}*
│⭔ *Lib : Baileys V.3.5.3*
│⭔ *Prefix : 「 ${multi ? 'Multi-Prefix' : prefix} 」*
│⭔ *Mode : ${mode}*
│⭔ *Total Pengguna : ${pendaftar.length}*
│⭔ *Tanggal : ${tanggal}*
│⭔ *Runtime Bot*
│⭔ *${runtime}*
└───────⭓ 

┌──⭓ *PUKUL* 
│⭔ *${jam}*
└───────⭓ 

┌──⭓ *USER INFO* 
│⭔ *Name* : *${pushname}*
│⭔ *Status* : *${isOwner ? 'Owner' : isPremium ? 'Premium' : 'Gratisan'}*
│⭔ *Limit* : *${isPremium ? sisalimit : `${sisalimit}/${limitCount}`}*
│⭔ *Limit Game* : *${isOwner ? 'Unlimited' : `${sisaGlimit}/${gcount}`}*
│⭔ *Expired Prem : ${isOwner ? '-' : isPremium ? expiredPrem : 'Not Premium'}*
└───────⭓ 

┌──⭓ *EMOTE INFO* 
│⭔ ${emote.free} *(FREE FEATURE)*
│⭔ ${emote.prem} *(PREMIUM FEATURE)*
│⭔ ${emote.owner} *(OWNER FEATURE)*
│⭔ ${emote.limit} *(FEATURE USING LIMIT)*
│⭔ ${emote.glimit} *(FEATURE USING GLIMIT)*
└───────⭓ 

┌──⭓ *CONVERT MENU* 
│⭔ *${prefix}sticker* ${emote.limit}
│⭔ *${prefix}toimg* ${emote.limit}
│⭔ *${prefix}smoji* ${emote.limit}
│⭔ *${prefix}emojimix* ${emote.limit}
│⭔ *${prefix}stcmeme* ${emote.limit}
│⭔ *${prefix}pet* ${emote.limit}
│⭔ *${prefix}stcsearch* ${emote.limit}
│⭔ *${prefix}take* ${emote.prem}
│⭔ *${prefix}swm* ${emote.prem}
│⭔ *${prefix}nulis* ${emote.limit}
│⭔ *${prefix}nuliskiri* ${emote.limit}
│⭔ *${prefix}nuliskanan* ${emote.limit}
│⭔ *${prefix}foliokiri* ${emote.limit}
│⭔ *${prefix}foliokanan* ${emote.limit}
│⭔ *${prefix}tomp3* ${emote.limit}
│⭔ *${prefix}tupai* ${emote.limit}
│⭔ *${prefix}textmaker* ${emote.limit}
└───────⭓ 

┌──⭓ *BAN MENU* 
│⭔ *${prefix}ban* ${emote.owner}
│⭔ *${prefix}unban* ${emote.owner}
│⭔ *${prefix}listban* ${emote.free}
└───────⭓ 

┌──⭓ *KERANG MENU* 
│⭔ *${prefix}kapan* ${emote.limit}
│⭔ *${prefix}apakah* ${emote.limit}
│⭔ *${prefix}bisakah* ${emote.limit}
│⭔ *${prefix}benarkah* ${emote.limit}
└───────⭓ 

┌──⭓ *DOWNLOAD MENU* 
│⭔ *${prefix}ytmp4* ${emote.limit}
│⭔ *${prefix}ytmp3* ${emote.limit}
│⭔ *${prefix}tiktok* ${emote.limit}
│⭔ *${prefix}tiktoknowm* ${emote.limit}
│⭔ *${prefix}tiktokaud* ${emote.limit}
│⭔ *${prefix}igdl* ${emote.limit}
│⭔ *${prefix}igstory* ${emote.limit}
│⭔ *${prefix}mediafire* ${emote.limit}
│⭔ *${prefix}fbdl* ${emote.limit}
│⭔ *${prefix}play* ${emote.prem}
└───────⭓ 

┌──⭓ *WEABOO MENU* 
│⭔ *${prefix}waifu* ${emote.limit}
│⭔ *${prefix}couple* ${emote.limit}
│⭔ *${prefix}loli* ${emote.limit}
│⭔ *${prefix}neko* ${emote.limit}
│⭔ *${prefix}husbu* ${emote.limit}
│⭔ *${prefix}kanna* ${emote.limit}
│⭔ *${prefix}anime* ${emote.limit}
│⭔ *${prefix}wait* ${emote.limit}
└───────⭓ 

┌──⭓ *NSFW MENU* 
│⭔ *${prefix}ahegao* ${emote.prem}
│⭔ *${prefix}ass* ${emote.prem}
│⭔ *${prefix}blowjob* ${emote.prem}
│⭔ *${prefix}hentai* ${emote.prem}
│⭔ *${prefix}pussy* ${emote.prem}
│⭔ *${prefix}yuri* ${emote.prem}
│⭔ *${prefix}boobs* ${emote.prem}
└───────⭓ 

┌──⭓ *SEARCHING MENU* 
│⭔ *${prefix}artinama* ${emote.limit}
│⭔ *${prefix}pinterest* ${emote.limit}
│⭔ *${prefix}lirik* ${emote.limit}
│⭔ *${prefix}ytsearch* ${emote.limit}
│⭔ *${prefix}igstalk* ${emote.limit}
│⭔ *${prefix}genshin* ${emote.limit}
│⭔ *${prefix}motivasi* ${emote.limit}
│⭔ *${prefix}gimg* ${emote.limit}
└───────⭓ 

┌──⭓ *GAME MENU* 
│⭔ *${prefix}topglobal* ${emote.free}
│⭔ *${prefix}toplocal* ${emote.free}
│⭔ *${prefix}buylimit* ${emote.free}
│⭔ *${prefix}buyglimit* ${emote.free}
│⭔ *${prefix}tictactoe* ${emote.glimit}
│⭔ *${prefix}delttc* ${emote.free}
│⭔ *${prefix}suit* ${emote.glimit}
│⭔ *${prefix}slot* ${emote.glimit}
│⭔ *${prefix}kasino* ${emote.glimit}
│⭔ *${prefix}tebakgambar* ${emote.glimit}
│⭔ *${prefix}family100* ${emote.glimit}
│⭔ *${prefix}caklontong* ${emote.glimit}
│⭔ *${prefix}tebakkata* ${emote.glimit}
│⭔ *${prefix}kuismath* ${emote.glimit}
│⭔ *${prefix}tekateki* ${emote.glimit}
│⭔ *${prefix}tebaklirik* ${emote.glimit}
│⭔ *${prefix}asahotak* ${emote.glimit}
│⭔ *${prefix}truth* ${emote.limit}
│⭔ *${prefix}dare* ${emote.limit}
└───────⭓ 

┌──⭓ *DATABASE MENU*
│⭔ *${prefix}setcmd* ${emote.free}
│⭔ *${prefix}delcmd* ${emote.free}
│⭔ *${prefix}listcmd* ${emote.free}
│⭔ *${prefix}lockcmd* ${emote.owner}
│⭔ *${prefix}unlockcmd* ${emote.owner}
└───────⭓

┌──⭓ *ANONYMOUS MENU*
│⭔ *${prefix}anonymous* ${emote.limit}
│⭔ *${prefix}start* ${emote.free}
│⭔ *${prefix}next* ${emote.free}
│⭔ *${prefix}keluar* ${emote.free}
└───────⭓

┌──⭓ *PREMIUM MENU* 
│⭔ *${prefix}cekprem* ${emote.prem}
│⭔ *${prefix}play* ${emote.prem}
│⭔ *${prefix}join* ${emote.prem}
│⭔ *${prefix}take* ${emote.prem}
│⭔ *${prefix}swm* ${emote.prem}
└───────⭓ 

┌──⭓ *INFO MENU* 
│⭔ *${prefix}limit* ${emote.free}
│⭔ *${prefix}owner* ${emote.free}
│⭔ *${prefix}speed* ${emote.free}
│⭔ *${prefix}donate* ${emote.free}
│⭔ *${prefix}runtime* ${emote.free}
│⭔ *${prefix}ping* ${emote.free}
│⭔ *${prefix}totalmsg* ${emote.free}
└───────⭓ 

┌──⭓ *LEVELING MENU* 
│⭔ *${prefix}level* ${emote.free}
│⭔ *${prefix}leaderboard* ${emote.free}
└───────⭓ 

┌──⭓ *GROUP MENU* 
│⭔ *${prefix}del* ${emote.free}
│⭔ *${prefix}groupinfo* ${emote.free}
│⭔ *${prefix}grouplist* ${emote.free}
│⭔ *${prefix}add* ${emote.free}
│⭔ *${prefix}kick* ${emote.free}
│⭔ *${prefix}promote* ${emote.free}
│⭔ *${prefix}demote* ${emote.free}
│⭔ *${prefix}linkgc* ${emote.free}
│⭔ *${prefix}leave* ${emote.free}
│⭔ *${prefix}setdesc* ${emote.free}
│⭔ *${prefix}setgrupname* ${emote.free}
│⭔ *${prefix}reader* ${emote.free}
│⭔ *${prefix}opengrup* ${emote.free}
│⭔ *${prefix}closegrup* ${emote.free}
│⭔ *${prefix}setppgrup* ${emote.free}
│⭔ *${prefix}tagall* ${emote.free}
│⭔ *${prefix}voting* ${emote.free}
│⭔ *${prefix}delvote* ${emote.free}
│⭔ *${prefix}cekvote* ${emote.free}
│⭔ *${prefix}welcome* ${emote.free}
└───────⭓ 

┌──⭓ *OTHER MENU* 
│⭔ *${prefix}tagme* ${emote.free}
│⭔ *${prefix}sc* ${emote.limit}
│⭔ *${prefix}kontak* ${emote.free}
│⭔ *${prefix}hidetag* ${emote.free}
│⭔ *${prefix}tinyurl* ${emote.limit}
│⭔ *${prefix}tourl* ${emote.limit}
│⭔ *${prefix}report* ${emote.free}
│⭔ *${prefix}namaninja* ${emote.limit}
│⭔ *${prefix}ssweb* ${emote.limit}
│⭔ *${prefix}mutual* ${emote.limit}
│⭔ *${prefix}translate* ${emote.limit}
└───────⭓ 

┌──⭓ *OWNER MENU* 
│⭔ *${prefix}setppbot* ${emote.owner}
│⭔ *${prefix}setname* ${emote.owner}
│⭔ *${prefix}setbio* ${emote.owner}
│⭔ *${prefix}self* ${emote.owner}
│⭔ *${prefix}public* ${emote.owner}
│⭔ *${prefix}clearall* ${emote.owner}
│⭔ *${prefix}setprefix* ${emote.owner}
│⭔ *${prefix}setthumb* ${emote.owner}
│⭔ *${prefix}bc* ${emote.owner}
│⭔ *${prefix}reset* ${emote.owner}
│⭔ *${prefix}addprem* ${emote.owner}
│⭔ *${prefix}delprem* ${emote.owner}
│⭔ *${prefix}caripesan* ${emote.owner}
│⭔ *${prefix}speedtest* ${emote.owner}
│⭔ *${prefix}retrieve* ${emote.owner}
│⭔ *> (eval)* ${emote.owner}
│⭔ *>$ (exec)* ${emote.owner}
└───────⭓ `
}
