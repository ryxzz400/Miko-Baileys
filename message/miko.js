"use strict";
const {
    MessageType,
    Mimetype,
    Presence,
    newMessagesDB
} = require("@adiwajshing/baileys");
const fs = require("fs");
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const ms = require("parse-ms");
const axios = require("axios");
const fetch = require('node-fetch');
const toMs = require('ms')
const request = require('request');
const speed = require("performance-now");
const os = require('os');
const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();
const { sizeFormatter } = require('human-readable');
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const cron = require('node-cron');
const google = require('google-it');
const yts = require('yt-search');
const Brainly = require('brainly-scraper-v2');
const util = require('util');
const petPetGif = require("pet-pet-gif");
const { createSticker, StickerTypes } = require("wa-sticker-formatter");
const hx = require('hxz-api');
const genshin = require('genshin');
const similarity = require('similarity');
const pm2 = require('pm2');
const canva = require('canvacord');
const scrape = require('@bochilteam/scraper');
const translate = require('translate-google-api');

// stickwm
const Exif = require('../lib/exif');
const exif = new Exif()

const { color } = require("../lib/color");
const { pinterest, tiktok, mediafire, lirik, igdl, igstalk, search, styletext } = require('../lib/scraper');
const { upload } = require('../lib/uploadImage');
const { isFiltered, addFilter, getBuffer, fetchJson, fetchTxt, getRandom, getGroupAdmins, runtime, sleep } = require("../lib/myfunc");
const { addVote, delVote, isVote, reasonVote, expiredVoting } = require('../lib/vote')
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
// const uploadImage = require('../lib/uploadImage');
const _prem = require("../lib/premium");
const { addBanned, unBanned, BannedExpired, cekBannedUser } = require("../lib/banned");
const { isTicTacToe, getPosTic, isPlay, cekTimeOut } = require("../lib/tictactoe");
const { addWaktuReport, cekWaktuReport, reportCheck, checkReportUser } = require("../lib/report");
const tictac = require("../lib/tictac");
const { youtube } = require("../lib/ytdl");
let { webp2mp4File } = require('../lib/webpToMp4')
const {
    getLevelingId,
    getLevelingLevel,
    getLevelingXp,
    addLevelingLevel,
    getUserRank,
    isGained,
    addCooldown,
    addLevelingXp
} = require('../lib/level')
const afk = require("../lib/afk");
const game = require("../lib/game");
var resram = new Date("2022","05","02").valueOf()
var ramadhan = moment(resram - Date.now()).format("D [Day], H [Hour], m [Min], s [Sec]")
const threshold = 0.72;

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
let setting = JSON.parse(fs.readFileSync('./config.json'));
let mess = JSON.parse(fs.readFileSync('./message/mess.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let ban = JSON.parse(fs.readFileSync('./database/ban.json'));
let mute = JSON.parse(fs.readFileSync('./database/mute.json'));
let voting = JSON.parse(fs.readFileSync('./database/voting.json'));
let slot = JSON.parse(fs.readFileSync('./database/slot.json'));
let report = JSON.parse(fs.readFileSync('./database/report.json'));
let _afk = JSON.parse(fs.readFileSync('./database/afk.json'));
let _level = JSON.parse(fs.readFileSync('./database/level.json'));
let stc = JSON.parse(fs.readFileSync('./database/stc.json'));

// Game
let { tictactoe, tebakgambar, family100, lontong, tebakkata, kuismath, teka, tebaklirik, asahotak, kasino, kuiswibu, teswibu } = require("../lib/database");

// Info
var copyright = '© Miko Chann'
// Prefix
let multi = true
let prefa = '.'

// Mode
let mode = 'public'

// More Func
let isStc = (sha, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].sha === sha) {
            status = true
        }
    })
    return status
}
let isStcCmd = (cmd, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].cmd === cmd) {
            status = true
        }
    })
    return status
}
let getPosiStc = (sha, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].sha === sha) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}
let getCmdStc = (sha, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].sha === sha) {
            position = i
        }
    })
    if (position !== null) {
        return _db[position].cmd
    }
}
let isLocked = (sha, _db) => {
    let position = null
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].sha === sha) {
            position = i
        }
    })
    if (position !== null) {
        if (_db[position].locked) status = true
    }
    return status
}
let lockingStc = function(sha, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].sha === sha){
            found = i
        }
    })
    if (found !== false) {
        _db[found].locked = true;
        fs.writeFileSync('./database/stc.json',JSON.stringify(_db));
    }
}
let unLockingStc = function(sha, _db){
    var found = false;
    Object.keys(_db).forEach((i) => {
        if(_db[i].sha === sha){
            found = i
        }
    })
    if (found !== false) {
        _db[found].locked = false;
        fs.writeFileSync('./database/stc.json',JSON.stringify(_db));
    }
}

// Bot status
const used = process.memoryUsage()
        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total
			last.speed += cpu.speed / length
			last.times.user += cpu.times.user
			last.times.nice += cpu.times.nice
			last.times.sys += cpu.times.sys
			last.times.idle += cpu.times.idle
			last.times.irq += cpu.times.irq
			return last
        }, {
            speed: 0,
			total: 0,
			times: {
			    user: 0,
			    nice: 0,
			    sys: 0,
			    idle: 0,
			    irq: 0
            }
        })
        
let {
    ownerNumber,
    limitCount,
    txtSewa,
    sessionName,
    txtDonasi,
    gamewaktu
} = setting

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(miko, msg, blocked, baterai, welcome, left, message) => {
    try {
        const { menu, newMenu } = require("./help");
        const { type, quotedMsg, isGroup, isQuotedMsg, mentioned, sender, from, fromMe, pushname, chats, isBaileys } = msg
        if (isBaileys) return
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        global.APIs = { // API Prefix
            // name: 'https://website'
            bg: 'http://bochil.ddns.net',
            LeysCoder: 'https://leyscoders-api.herokuapp.com',
            nrtm: 'https://nurutomo.herokuapp.com',
            zenz: 'https://zenzapis.xyz'
        }
        global.APIKeys = { // APIKey Here
          // 'https://website': 'apikey'
          'https://leyscoders-api.herokuapp.com': 'dappakntlll',
          'https://zenzapis.xyz': 'E596498D964A'
        }
        global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
        var body = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ? msg.message.imageMessage.caption : (type == 'videoMessage') ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage.singleSelectReply.selectedRowId || msg.text) : ''
        var prefix = multi ? /^[.#!/$]/gi.test(body) ? body.match(/^[.#!/$]/gi)[0] : "." : prefa ?? global.prefix
        let timestamp = speed();
        let latensi = speed() - timestamp
		const command = body.toLowerCase().split(' ')[0] || ''
        const args = body.split(' ')
        const isCmd = body.startsWith(prefix)
        const q = body.slice(command.length + 1, body.length)
        const botNumber = miko.user.jid
        const groupMetadata = isGroup ? await miko.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.jid : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender) || false

        const isOwner = [ botNumber, ownerNumber].includes(sender)
        const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
	    const isBan = cekBannedUser(sender, ban)
        const isAfkOn = afk.checkAfkUser(sender, _afk)
        const isWelcome = isGroup ? welcome.includes(from) : false
        const isLeft = isGroup ? left.includes(from) : false
        const isUser = pendaftar.includes(sender)
        const isMuted = isGroup ? mute.includes(from) : false
        
        const gcounti = setting.gcount
        const gcount = isPremium ? gcounti.prem : gcounti.user

        const tanggal = moment().format("ll")
        const jam = moment().tz('Asia/Jakarta').format("HH:mm:ss")
        
        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
        }
        function monospace(string) {
            return '```' + string + '```'
        }   
        function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
        function randomNomor(angka){
            return Math.floor(Math.random() * angka) + 1
        }
        const nebal = (angka) => {
            return Math.floor(angka)
        }
        const reply = (teks) => {
            return miko.sendMessage(from, teks, text, {quoted:msg, contextInfo: { mentionedJid: miko.parseMention(teks) }})
        }
        const sendMess = (hehe, teks) => {
            return miko.sendMessage(hehe, teks, text, { contextInfo: { mentionedJid: miko.parseMention(teks) }})
        }
        const mentions = (teks, memberr, id) => {
            let ai = (id == null || id == undefined || id == false) ? miko.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : miko.sendMessage(from, teks.trim(), extendedText, {quoted: msg, contextInfo: {"mentionedJid": memberr}})
            return ai
        }
        const formatp = sizeFormatter({
            std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
            decimalPlaces: 2,
            keepTrailingZeroes: false,
            render: (literal, symbol) => `${literal} ${symbol}B`,
        })
        function pickRandom(list) {
            return list[Math.floor(Math.random() * list.length)]
        }
        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100),
              seconds = Math.floor((duration / 1000) % 60),
              minutes = Math.floor((duration / (1000 * 60)) % 60),
              hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
          }
        async function sendFileFromUrl(from, url, caption, msg, men) {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            let type = mime.split("/")[0]+"Message"
            if(mime === "image/gif"){
                type = MessageType.video
                mime = Mimetype.gif
            }
            if(mime === "application/pdf"){
                type = MessageType.document
                mime = Mimetype.pdf
            }
            if(mime.split("/")[0] === "audio"){
                mime = Mimetype.mp4Audio
            }
            return miko.sendMessage(from, await getBuffer(url), type, {caption: caption, quoted: msg, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }
        var download = function (uri, filename, callback) {
            request.head(uri, function (err, res, body) {
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };
        const sendStickerFromUrl = async(from, url) => {
            download(url, './sticker' + sender.split("@")[0] + '.png', async function () {
                let filess = './sticker' + sender.split("@")[0] + '.png'
                let asw = './sticker' + sender.split("@")[0] + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                    spawn('webpmux', ['-set','exif','./sticker/data.exif', asw, '-o', asw])
                    .on('exit', async function () {
                    await miko.sendMessage(from, fs.readFileSync(asw), sticker, { quoted: msg })
                    console.log('selesai');
                    fs.unlinkSync(filess)
                    fs.unlinkSync(asw)
                    })
                });
            });
        }
        const sendTomp3FromUrl = async(from, url) => {
            download(url, './media' + sender.split("@")[0] + '.mp4', async function () {
                let filess = './media' + sender.split("@")[0] + '.mp4'
                let asw = './media' + sender.split("@")[0] + '.mp3'
                exec(`ffmpeg -i ${filess} ${asw}`, (err) => {
                    fs.unlinkSync(filess)
                    if (err) return reply(`Err: ${err}`)
                    miko.sendMessage(from, fs.readFileSync(asw), audio, { mimetype: 'audio/mp4', quoted: msg })
                    fs.unlinkSync(asw)
                })
            });
        }
        const fakeimage = (teks) => {
               return  miko.sendMessage(from, fs.readFileSync(setting.pathImg), MessageType.image,
                {
                quoted: {
                key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },
                message: { "imageMessage": {
                "mimetype": "image/jpeg", 
                "caption": setting.fake, 
                "jpegThumbnail": fs.readFileSync(setting.pathImg)
                }
           }
     },
     caption: teks,
     thumbnail: fs.readFileSync(setting.pathImg)
     })
}

        const isImage = (type === 'imageMessage')
        const isVideo = (type === 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isButton = (type == 'buttonsResponseMessage' || type == 'listResponseMessage')
        const isQuotedImage = isQuotedMsg ? (quotedMsg.type === 'imageMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? (quotedMsg.type === 'videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? (quotedMsg.type === 'stickerMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? (quotedMsg.type === 'audioMessage') ? true : false : false
        const isQuotedButton = isQuotedMsg ? (quotedMsg.type === 'buttonsMessage' || quotedMsg.type === 'buttonsResponseMessage') ? true : false : false

        cron.schedule('0 0 * * *', () => {
            console.log('Its time to reset user limit!')
            limit.splice(0)
                fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
            glimit.splice(0)
                fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })

        // Mode
        if (mode === 'self'){
            if (!isOwner) return
        }

        // Banned
        if (isBan) return
        BannedExpired(ban)

        // Voting
        if (!isVote(from, voting)) {
            expiredVoting(voting, sendMess)
        }
        
        // MUTE
        if (isMuted){
            if (!isGroupAdmins && !isOwner) return
        } 
        
        //Read ViewOnce
        if (type == 'viewOnceMessage' && !isGroup) {
        await miko.copyNForward(from, await miko.loadMessage(from, msg.key.id), false, { readViewOnce: true})
        }
        
        //Auto Sticker
        if (isImage && !isGroup && !isCmd) {
        let media = await miko.downloadMediaMessage(msg)
                    const stc = await createSticker(media, {
                        type: StickerTypes.FULL,
                        pack: "By Miko Channn",
                        author: botNumber.split("@")[0],
                    });
                    await miko.sendMessage(from, stc, sticker, { quoted: msg, mimetype: "image/webp"});
                    limitAdd(sender, isPremium, isOwner, limit)
        }

        //Anti Virus
        if (msg.messageStubType === 68) {
        await miko.modifyChat(from, 'clear', {
            includeStarred: false
        }).catch(console.log)
        }
    
        //Invite Grup
        if ((type === 'groupInviteMessage' || isUrl(chats) && chats.startsWith('https://chats.whatsapp.com') || chats.startsWith('Buka tautan ini')) && !isBaileys && !isGroup) {
          if (isOwner || isPremium) { 
            reply('Tunggu sebentar sampai owner meng-konfirmasi undangan grup kamu')
            miko.sendButtonText(setting.ownerNumber, [{ buttonId: prefix+`join ${chats}`, buttonText: { displayText: 'Konfirm' }, type: 1 }], `wa.me/${sender.split("@")[0]} send invite link`.trim(), copyright, msg)
          } else {
          miko.sendButtonText(from, [{ buttonId: prefix+'owner', buttonText: { displayText: 'Owner Number' }, type: 1 }], txtSewa.trim(), copyright, msg)
          }
        }

        // TicTacToe
        if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Suit
	    this.suit = this.suit ? this.suit : {}
	    let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(sender))
	    if (roof) {
	    let win = ''
	    let tie = false
	    if (sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(chats) && isGroup && roof.status == 'wait') {
	    if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(chats)) {
	    reply(`@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`)
	    delete this.suit[roof.id]
	    return !0
	    }
	    roof.status = 'play'
	    roof.asal = from
	    clearTimeout(roof.waktu)
	    let buttons = [
            { buttonId: 'batu', buttonText: { displayText: 'Batu ⛰️' }, type: 1 },
            { buttonId: 'kertas', buttonText: { displayText: 'Kertas 📄' }, type: 1 },
            { buttonId: 'gunting', buttonText: { displayText: 'Gunting ✂️' }, type: 1 }
        ]
	    sendMess(from, `Suit telah dikirimkan ke chat

@${roof.p.split`@`[0]} dan 
@${roof.p2.split`@`[0]}

Silahkan pilih suit di chat masing"
klik https://wa.me/${botNumber.split`@`[0]}`, true)
	    if (!roof.pilih) miko.sendButtonText(roof.p, buttons, `Silahkan pilih button dibawah`, copyright, msg)
	    if (!roof.pilih2) miko.sendButtonText(roof.p2, buttons, `Silahkan pilih button dibawah`, copyright, msg)
	    roof.waktu_milih = setTimeout(() => {
	    if (!roof.pilih && !roof.pilih2) reply(`Kedua pemain tidak niat main, suit dibatalkan`)
	    else if (!roof.pilih || !roof.pilih2) {
	    win = !roof.pilih ? roof.p2 : roof.p
	    reply(`@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} tidak memilih suit, game berakhir`)
	    }
	    delete this.suit[roof.id]
	    return !0
	    }, roof.timeout)
	    }
	    let jwb = sender == roof.p
	    let jwb2 = sender == roof.p2
	    let g = /gunting/i
	    let b = /batu/i
	    let k = /kertas/i
	    let reg = /^(gunting|batu|kertas)/i
	    if (jwb && reg.test(body) && !roof.pilih && !isGroup) {
	    roof.pilih = reg.exec(body.toLowerCase())[0]
	    roof.text = body
	    reply(`Kamu telah memilih ${body} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`)
	    if (!roof.pilih2) sendMess(roof.p2, '_Lawan sudah memilih_\nSekarang giliran kamu')
	    }
	    if (jwb2 && reg.test(body) && !roof.pilih2 && !isGroup) {
	    roof.pilih2 = reg.exec(body.toLowerCase())[0]
	    roof.text2 = body
	    reply(`Kamu telah memilih ${body} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`)
	    if (!roof.pilih) sendMess(roof.p, '_Lawan sudah memilih_\nSekarang giliran kamu')
	    }
	    let stage = roof.pilih
	    let stage2 = roof.pilih2
	    if (roof.pilih && roof.pilih2) {
	    clearTimeout(roof.waktu_milih)
	    if (b.test(stage) && g.test(stage2)) win = roof.p
	    else if (b.test(stage) && k.test(stage2)) win = roof.p2
	    else if (g.test(stage) && k.test(stage2)) win = roof.p
	    else if (g.test(stage) && b.test(stage2)) win = roof.p2
	    else if (k.test(stage) && b.test(stage2)) win = roof.p
	    else if (k.test(stage) && g.test(stage2)) win = roof.p2
	    else if (stage == stage2) tie = true
        let hadiah = randomNomor(100)
	    sendMess(roof.asal, `_*Hasil Suit*_${tie ? '\nSERI' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Menang \n` : ` Kalah \n`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Menang \n` : ` Kalah \n`}

${tie ? '' : roof.p == win ? `@${roof.p.split`@`[0]} mendapatkan $${hadiah}` : `@${roof.p2.split`@`[0]} mendapatkan $${hadiah}`}
`.trim())
        if (!tie) roof.p == win ? addBalance(roof.p, hadiah, balance) : addBalance(roof.p2, hadiah, balance)
	    delete this.suit[roof.id]
	    }
	    }

        // GAME 
        game.cekWaktuFam(miko, family100, copyright, prefix+'family100')
        game.cekWaktuTG(miko, tebakgambar, copyright, prefix+'tebakgambar')
        game.cekWaktuTG(miko, lontong, copyright, prefix+'caklontong')
        game.cekWaktuTG(miko, tebakkata, copyright, prefix+'tebakkata')
        game.cekWaktuTG(miko, teka, copyright, prefix+'teka')
        game.cekWaktuTG(miko, tebaklirik, copyright, prefix+'tebaklirik')
        game.cekWaktuTG(miko, kuismath, copyright, prefix+'kuismath')
        game.cekWaktuTG(miko, asahotak, copyright, prefix+'asahotak')
        game.cekWaktuTG(miko, kuiswibu, copyright, prefix+'kuiswibu')

        cekTimeOut(miko, tictactoe)

        // GAME 
        if (!isCmd && game.isTebakGambar(from, tebakgambar) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*TG/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakgambar))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+`tebakgambar`, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakgambar)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
            } else if (similarity(chats.toLowerCase(), game.getJawabanTG(from, tebakgambar)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, lontong) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*CL/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, lontong))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+`caklontong`, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, lontong)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                lontong.splice(game.getTGPosi(from, lontong), 1)
            } else if (similarity(chats.toLowerCase(), game.getJawabanTG(from, lontong)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, tebakkata) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*TK/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebakkata))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+`tebakkata`, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebakkata)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                tebakkata.splice(game.getTGPosi(from, tebakkata), 1)
            } else if (similarity(chats.toLowerCase(), game.getJawabanTG(from, tebakkata)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, teka) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*TT/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, teka))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+`teka`, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, teka)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                teka.splice(game.getTGPosi(from, teka), 1)
            } else if (similarity(chats.toLowerCase(), game.getJawabanTG(from, teka)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, tebaklirik) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*TL/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, tebaklirik))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+'tebaklirik', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, tebaklirik)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                tebaklirik.splice(game.getTGPosi(from, tebaklirik), 1)
            } else if (similarity(chats.toLowerCase(), game.getJawabanTG(from, tebaklirik)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, kuismath) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*KM/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, kuismath))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+'kuismath', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, kuismath)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                kuismath.splice(game.getTGPosi(from, kuismath), 1)
            } else if (similarity(chats, game.getJawabanTG(from, kuismath)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, asahotak) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*AO/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.toLowerCase().includes(game.getJawabanTG(from, asahotak))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+'asahotak', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, asahotak)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                asahotak.splice(game.getTGPosi(from, asahotak), 1)
            } else if (similarity(chats, game.getJawabanTG(from, asahotak)) >= threshold) reply(`Hampir benar`)
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isTebakGambar(from, kuiswibu) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*KW/i.test(quotedMsg.buttonsMessage.contentText)) {
            if (chats.includes(game.getJawabanTG(from, kuiswibu))){
                var htgm = randomNomor(100)
                addBalance(sender, htgm, balance)
                await miko.sendButtonText(from, [{ buttonId: prefix+'kuiswibu', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Selamat jawaban kamu benar*\n*Jawaban :* ${game.getJawabanTG(from, kuiswibu)}\n*Hadiah :* $${htgm}\n\nIngin bermain lagi? klik button dibawah!`, copyright, msg)
                kuiswibu.splice(game.getTGPosi(from, kuiswibu), 1)
            }
            else reply(`Jawaban salah`)
            }
        }
        if (!isCmd && game.isfam(from, family100) && isUser && !isButton){
            if (isQuotedMsg && isQuotedButton && quotedMsg.fromMe && /Waktu.*FM/i.test(quotedMsg.buttonsMessage.contentText)) {
            var anjuy = game.getjawaban100(from, family100)
            for (let i of anjuy){
                if (chats.toLowerCase().includes(i)){
                    var htgmi = Math.floor(Math.random() * 20) + 1
                    addBalance(sender, htgmi, balance)
                    await reply(`*Jawaban benar*\n*Jawaban :* ${i}\n*Hadiah :* $${htgmi}\n*Jawaban yang blum tertebak :* ${anjuy.length - 1}`)
                    var anug = anjuy.indexOf(i)
                    anjuy.splice(anug, 1)
                } 
            }
            if (anjuy.length < 1){
                await miko.sendButtonText(from, [{ buttonId: prefix+'family100', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `Semua jawaban sudah tertebak\nKlik button dibawah untuk bermain lagi`, copyright, msg)
                family100.splice(game.getfamposi(from, family100), 1)
            }
            }
        }
        // Premium
        _prem.expiredCheck(premium, sendMess)

        // Report
        reportCheck(report)

        // Auto Regist
        if (isCmd && !isUser){
			pendaftar.push(sender)
			fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar))
        } 

        // AFK
        if (isGroup) {
            if (mentioned.length !== 0){
                for (let ment of mentioned) {
                    if (afk.checkAfkUser(ment, _afk)) {
                        const getId = afk.getAfkId(ment, _afk)
                        const getReason = afk.getAfkReason(getId, _afk)
                        const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                        const heheh = ms(getTime)
                        await mentions(`Nomor yang anda tag sedang afk\n${getReason == '' ? '' : `\n*Alasan :* ${getReason}`}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`, [ment], true)
                        sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : @${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${chats}`)
                    }
                }
            }
            if (afk.checkAfkUser(sender, _afk) && isAfkOn) {
                const getId = afk.getAfkId(sender, _afk)
                const getReason = afk.getAfkReason(getId, _afk)
                const getTime = Date.now() - afk.getAfkTime(getId, _afk)
                const heheh = ms(getTime)
                miko.sendButtonText(from, [{ buttonId: 'allmenu', buttonText: { displayText: 'All Menu' }, type: 1 }, { buttonId: prefix+`afk ${getReason}`, buttonText: { displayText: 'Afk lagi' }, type: 1 }], `@${sender.split('@')[0]} telah kembali\n${getReason == '' ? '' : `\n*Alasan :* ${getReason}`}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu`, copyright, msg)
                _afk.splice(afk.getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
            }
        }
        
        // Respon
        if (isGroup && !isCmd && !isQuotedMsg) {
            if (mentioned.length !== 0){
                for (let ment of mentioned) {
                    if (ment === botNumber) {
                    reply(`${pickRandom([
                        `Miko disini, ada yang bisa dibantu?`,
                        `Bot status : online`,
                        `Runtime : ${runtime(process.uptime())}\nSpeed : ${latensi.toFixed(4)} Second`,
                        `Miko siap membantu, ketik *${prefix}menu* untuk menampilkan list command`
                    ])}`)
                    }
                }
            }
        }

        // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
        const levelRole = getLevelingLevel(sender, _level)
        var role = 'Copper V'
        if (levelRole >= 5) {
            role = 'Copper IV'
        } else if (levelRole >= 10) {
            role = 'Copper III'
        } else if (levelRole >= 15) {
            role = 'Copper II'
        } else if (levelRole >= 20) {
            role = 'Copper I'
        } else if (levelRole >= 25) {
            role = 'Silver V'
        } else if (levelRole >= 30) {
            role = 'Silver IV'
        } else if (levelRole >= 35) {
            role = 'Silver III'
        } else if (levelRole >= 40) {
            role = 'Silver II'
        } else if (levelRole >= 45) {
            role = 'Silver I'
        } else if (levelRole >= 50) {
            role = 'Gold V'
        } else if (levelRole >= 55) {
            role = 'Gold IV'
        } else if (levelRole >= 60) {
            role = 'Gold III'
        } else if (levelRole >= 65) {
            role = 'Gold II'
        } else if (levelRole >= 70) {
            role = 'Gold I'
        } else if (levelRole >= 75) {
            role = 'Platinum V'
        } else if (levelRole >= 80) {
            role = 'Platinum IV'
        } else if (levelRole >= 85) {
            role = 'Platinum III'
        } else if (levelRole >= 90) {
            role = 'Platinum II'
        } else if (levelRole >= 95) {
            role = 'Platinum I'
        } else if (levelRole >= 100) {
            role = 'Exterminator'
        }

        // Leveling [BETA] by Slavyan
        if (isGroup && !isGained(sender) && isUser && !fromMe) {
            try {
                addCooldown(sender)
                const amountXp = randomNomor(10)
                addLevelingXp(sender, amountXp, _level)
                const currentLevel = getLevelingLevel(sender, _level)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                if (requiredXp <= getLevelingXp(sender, _level)) {
                    addLevelingLevel(sender, 1, _level)
                    await reply(`*「 LEVEL UP 」*\n\n❏ *Name*: ${pushname}\n❏ *XP*: ${getLevelingXp(sender, _level)} / ${requiredXp}\n❏ *Level*: ${currentLevel} -> ${getLevelingLevel(sender, _level)}\n❏ *Role*: *${role}*`)
                }
            } catch (err) {
                reply(`${err}`)
            }
        }
        
        if (isUser && !fromMe) {
            isPremium ? addBalance(sender, randomNomor(20), balance) : addBalance(sender, randomNomor(10), balance)
        }

        // Auto Read
        miko.chatRead(from, "read")

        // CMD
        if (isCmd && !isButton && !isQuotedButton) {
			if (!isGroup) console.log(color(isButton ? '[BUTTON]' : '[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            if (isGroup) console.log(color(isButton ? '[BUTTON]' : '[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        // miko.updatePresence(from, Presence.composing)
        }
        if (isButton) {
			if (!isGroup) console.log(color('[BUTTON]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            if (isGroup) console.log(color('[BUTTON]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        // miko.updatePresence(from, Presence.composing)
        }

        // Command With Media 
        if (isSticker && msg.message.stickerMessage.fileSha256 && isStc(msg.message.stickerMessage.fileSha256.toString('base64'), stc)) {
            let sha = msg.message.stickerMessage.fileSha256.toString('base64')
            let teks = getCmdStc(sha, stc)
            miko.emit('chat-update', {
                ...message,
                messages: newMessagesDB([
                    miko.cMod(from,
                        await miko.prepareMessage(from, teks, MessageType.extendedText, {
                            ...(isQuotedMsg ? { quoted: quotedMsg.fakeObj } : {}),
                            messageId: msg.id,
                        }),
                        teks,
                        sender
                        )
                    ])
                })
            }

        if (isOwner){
            if (chats.startsWith("> ")){
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await reply(`${evaled}`)
                } catch (err) {
                    await reply(`${err}`)
                }
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
                exec(chats.slice(2), (err, 
stdout) => {
					if (err) return reply(`${err}`)
					if (stdout) reply(`${stdout}`)
				})
            }
        }

        function ucapan() {
            let time = moment.tz('Asia/Jakarta').format('HH')
            let res = "Selamat Dini Hari"
            if (time >= 4) {
                res = "Selamat Pagi"
            }
            if (time > 10) {
                res = "Selamat Siang"
            }
            if (time >= 15) {
                res = "Selamat Sore"
            }
            if (time >= 18) {
                res = "Selamat Malam"
            }
            return res
        }
        
        switch(command){
          //Button
            case "allmenu": {
                if (!isButton) return
                let sisalimit = isPremium ? 'Unlimited' : getLimit(sender, limitCount, limit)
                let sisaGlimit = cekGLimit(sender, gcount, glimit)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let expiredPrem = () => {
                    if (cekvip.days != 0){
                        return `${cekvip.days} day(s)`
                    } else if (cekvip.hours != 0){
                        return `${cekvip.hours} hour(s)`
                    } else if (cekvip.minutes != 0){
                        return `${cekvip.minutes} minutes(m)`
                    }
                }
                // const rows = [
                //     {title: 'Donate', description: "Donasi Untuk Owner", rowId:"donate"},
                //     {title: 'Syarat dan Ketentuan', description: "Syarat dan Ketentuan Penggunaan Bot", rowId:"snk"},
                //     {title: prefix+'sewa', description: "Keterangan Harga Sewa Bot", rowId:"sewa"},
                // ]
                // const sections = [{title: "Section 1", rows: rows}]
                // const button = {
                // buttonText: 'Click Me!',
                // description: newMenu(ucapan(), setting.ownerName, setting.botName, prefix, mode, pendaftar, runtime(process.uptime()), ramadhan, pushname, isOwner, isPremium, sisalimit, limitCount, sisaGlimit, gcount, expiredPrem(), tanggal, jam, setting.emote),
                // sections: sections,
                // listType: 1
                // }
                //let expiredPrem = `${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                miko.sendButtonText(from, [{ buttonId: 'snk', buttonText: { displayText: 'Syarat dan Ketentuan' }, type: 1 }], newMenu(ucapan(), setting.ownerName, setting.botName, multi, prefix, mode, pendaftar, runtime(process.uptime()), ramadhan, pushname, isOwner, isPremium, sisalimit, limitCount, sisaGlimit, gcount, expiredPrem(), tanggal, jam, setting.emote) + '\n\nScript https://github.com/ryxzz400/Miko-baileys', copyright, msg)
                // miko.sendMessage(from, button, MessageType.listMessage, { quoted: msg })
                }
                break
            case "donate":
                if (!isButton) return
                reply(txtDonasi)
                break
            case prefix+'sewa':
                reply(`*JADI OWNER BOT*
-Rp. 70.000 (all via) / BULAN
*BELI SCRIPT BOT*
-Rp. 100.000 (all via)
============================
1 GRUP + PREMIUM / 30 HARI

VIA:
*PULSA TELKOMSEL*
-Rp. 20.000
*GOPAY*
-Rp. 15.000

Kegunaan Premium:
- *Limit Tanpa Batas*
- *Akses Fitur Premium*
- *Akses Menambahkan Bot Ke Grup WhatsAppMu*

Info lebih lanjut hub: wa.me/6281392373062`)
                break
            case "snk":
                if (!isButton) return
                miko.sendButtonText(from, [{ buttonId: prefix+'owner', buttonText: { displayText: 'Owner Number' }, type: 1 }], `「 *SYARAT DAN KETENTUAN* 」

1. Semua yang tertulis disini adalah Mutlak
2. Dilarang spam, telepon, vc Jika melanggar akan di blokir
3. Kami tidak bertanggung jawab apa yang telah anda perintahkan kepada bot
4. Kami menyimpan data anda didalam database
5. Kami tidak pernah dan tidak akan membocorkan data anda jika tidak melanggar
6. spaming berlebihan akan di Banned Permanen
7. Rules dapat berubah sewaktu waktu

- Harap dipahami`, copyright, msg)
                break
            case "daftarbhs":
                if (!isButton) return
                reply(`┌──⭓ *LIST BAHASA*
│⭔ *sq       : Albanian*
│⭔ *ar       : Arabic*
│⭔ *hy       : Armenian*
│⭔ *ca       : Catalan*
│⭔ *zh       : Chinese*
│⭔ *zh-cn    : Chinese (China)*
│⭔ *zh-tw    : Chinese (Taiwan)*
│⭔ *zh-yue   : Chinese (Cantonese)*
│⭔ *hr       : Croatian*
│⭔ *cs       : Czech*
│⭔ *da       : Danish*
│⭔ *nl       : Dutch*
│⭔ *en       : English*
│⭔ *en-au    : English (Australia)*
│⭔ *en-uk    : English (United Kingdom)*
│⭔ *en-us    : English (United States)*
│⭔ *eo       : Esperanto*
│⭔ *fi       : Finnish*
│⭔ *fr       : French*
│⭔ *de       : German*
│⭔ *el       : Greek*
│⭔ *ht       : Haitian Creole*
│⭔ *hi       : Hindi*
│⭔ *hu       : Hungarian*
│⭔ *is       : Icelandic*
│⭔ *id       : Indonesian*
│⭔ *it       : Italian*
│⭔ *ja       : Japanese*
│⭔ *ko       : Korean*
│⭔ *la       : Latin*
│⭔ *lv       : Latvian*
│⭔ *mk       : Macedonian*
│⭔ *no       : Norwegian*
│⭔ *pl       : Polish*
│⭔ *pt       : Portuguese*
│⭔ *pt-br    : Portuguese (Brazil)*
│⭔ *ro       : Romanian*
│⭔ *ru       : Russian*
│⭔ *sr       : Serbian*
│⭔ *sk       : Slovak*
│⭔ *es       : Spanish*
│⭔ *es-es    : Spanish (Spain)*
│⭔ *es-us    : Spanish (United States)*
│⭔ *sw       : Swahili*
│⭔ *sv       : Swedish*
│⭔ *ta       : Tamil*
│⭔ *th       : Thai*
│⭔ *tr       : Turkish*
│⭔ *vi       : Vietnamese*
│⭔ *cy       : Welsh*
└───────⭓ `)
                break
            // Command
            case "prefix": case "cekprefix":{
                reply(`${prefix}`)
            }
                break
            // case prefix+'test':{
            //     let test = require('../package.json')
            //     reply(`${test.author}`)
            // }
            // break
            case prefix+'help': case prefix+'menu':{
                // const rows = [
                //     {title: 'Donasi', description: "To Support Owner", rowId:"donate"},
                //     {title: prefix+'sewa', description: "To Rental Bot", rowId:"sewa"},
                //     {title: 'All Menu', rowId:"allmenu"},
                //     {title: 'Sticker Menu', rowId:"smenu"},
                //     {title: 'Ban Menu', rowId:"bmenu"},
                //     {title: 'Download Menu', rowId:"dmenu"},
                //     {title: 'System Menu', rowId:"syMenu"},
                //     {title: 'Game Menu', rowId:"gMenu"},
                //     {title: 'Owner Menu', rowId:"ownMenu"},
                //     {title: 'Info Menu', rowId:"iMenu"},
                //     {title: 'Group Menu', rowId:"grpMenu"},
                //     {title: 'Enable & Disable Menu', rowId:"edMenu"},
                //     {title: 'Other Menu', rowId:"oMenu"},
                // ]
                // const sections = [{title: "Section 1", rows: rows}]
                // const button = {
                // buttonText: 'Click Me!',
                // description: menu(ucapan, pushname),
                // sections: sections,
                // listType: 1
                // }
                miko.sendButtonText(from, [{ buttonId: 'allmenu', buttonText: { displayText: 'All Menu' }, type: 1 }, { buttonId: prefix+'sewa', buttonText: { displayText: prefix+'sewa' }, type: 1 }, { buttonId: prefix+'owner', buttonText: { displayText: 'Owner Number' }, type: 1 }], menu(ucapan(), pushname) + '\n\nScript https://github.com/ryxzz400/Miko-baileys', copyright, msg)
            }
                break
//------------------< Sticker / Tools >-------------------
            case prefix+'exif':{
				if (!isOwner) return
                if (args.length < 2 && !q.includes("|")) return reply(`Penggunaan ${command} nama|author`)
				const namaPack = q.split('|')[0] ? q.split('|')[0] : q
				const authorPack = q.split('|')[1] ? q.split('|')[1] : ''
				exif.create(namaPack, authorPack)
				await reply('Done gan')
            }
				break
            case prefix+'sticker':
            case prefix+'stiker':
            case prefix+'s':
            case prefix+'stickergif':
            case prefix+'sgif':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    reply(mess.wait)
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/data.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)
								})
							})
							.addOutputOptions(["-fs 1M", "-vcodec", "libwebp", "-vf", `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					reply(mess.wait)
                        await ffmpeg(`${media}`)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
							    spawn('webpmux', ['-set','exif','./sticker/data.exif', `./sticker/${sender}.webp`, '-o', `./sticker/${sender}.webp`])
                                .on('exit', async function () {
                                await miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                console.log('selesai');
                                fs.unlinkSync(`./sticker/${sender}.webp`)
                            })
				   			})
							.addOutputOptions(["-fs 1M", "-vcodec", "libwebp", "-vf", `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`])
							.toFormat('webp')
                            .seekInput("00:00")
                            .setDuration("00:10")
							.save(`./sticker/${sender}.webp`)
                    // reply(`Error...`)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix+'swm': 
            case prefix+'take':{
                if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                if (args.length < 2 && !q.includes("|")) return reply(`Penggunaan ${command} nama|author`)
                let packname1 = q.split('|')[0] ? q.split('|')[0] : q
                let author1 = q.split('|')[1] ? q.split('|')[1] : ''
                if (isImage || isQuotedImage) {
					reply(mess.wait)
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
                    await ffmpeg(`${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                                    if (error) return reply(mess.error.api)
									miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                    fs.unlinkSync(media)	
									fs.unlinkSync(`./sticker/${sender}.webp`)	
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions(["-fs 1M", "-vcodec", "libwebp", "-vf", `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                } else if ((isVideo && msg.message.videoMessage.fileLength < 10000000 || isQuotedVideo && msg.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					exif.create(packname1, author1, `stickwm_${sender}`)
					reply(mess.wait)
						await ffmpeg(`${media}`)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.api)
							})
							.on('end', function () {
								console.log('Finish')
								exec(`webpmux -set exif ./sticker/stickwm_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
									if (error) return reply(mess.error.api)
									miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                                    fs.unlinkSync(media)
									fs.unlinkSync(`./sticker/${sender}.webp`)
                                    fs.unlinkSync(`./sticker/stickwm_${sender}.exif`)
								})
							})
							.addOutputOptions(["-fs 1M", "-vcodec", "libwebp", "-vf", `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`])
							.toFormat('webp')
							.save(`./sticker/${sender}.webp`)
                    // reply(`Error...`)
                } else if (isQuotedSticker) {
                    let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
                    exif.create(packname1, author1, `takestick_${sender}`)
					reply(mess.wait)
                    exec(`webpmux -set exif ./sticker/takestick_${sender}.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                        fs.unlinkSync(media)
                        fs.unlinkSync(`./sticker/takestick_${sender}.exif`)
                    })
                }else {
                    reply(`Kirim gambar/video dengan caption ${prefix}stickerwm nama|author atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
            }
                break
            case prefix+'smoji':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}smoji [emoji]*`)
                reply(mess.wait)
                emoji.get(`${q}`).then(emoji => {
                    var teks = `${emoji.images[4].url}`
                    sendStickerFromUrl(from, `${teks}`)
                    limitAdd(sender, isPremium, isOwner, limit)
                })
                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            }
                break
            case prefix+'textmaker': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${command} atau reply gambar yang sudah dikirim`)
                let [top, bottom] = q.split`|`
                if (!top && !bottom) return reply(`Penggunaan ${command} teks atas|teks bawah`)
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    reply(mess.wait)
                    let url = await upload(media)
                    let topp = top.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    let bottomm = bottoreplace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    var create = `https://api.memegen.link/images/custom/${topp}/${bottomm}.png?background=${url}`
                    sendFileFromUrl(from, create, '', msg)
                }
                break
            case prefix+'stcmeme': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (!isImage && !isQuotedImage) return reply(`Kirim gambar dengan caption ${command} atau reply gambar yang sudah dikirim`)
                let [top, bottom] = q.split`|`
                if (!top && !bottom) return reply(`Penggunaan ${command} teks atas|teks bawah`)
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    reply(mess.wait)
                    let url = await upload(media)
                    let topp = top.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    let bottomm = bottom.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    var create = `https://api.memegen.link/images/custom/${topp}/${bottomm}.png?background=${url}`
                    sendStickerFromUrl(from, create)
                }
                break
            case prefix+'toimg':
            case prefix+'tomedia':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (!isQuotedSticker) return reply('Reply stiker nya')
                let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				let media = await miko.downloadAndSaveMediaMessage(encmedia)
				if (quotedMsg.stickerMessage.isAnimated === true) {
                    let webpToMp4 = await webp2mp4File(media)
                    reply(mess.wait)
                    sendFileFromUrl(from, webpToMp4.result, '「 *WEBP TO GIFT* 」', msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                } else {
                    reply(mess.wait)
					let ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Sticker tidak bisa di-convert, tolong coba lagi...')
						miko.sendMessage(from, fs.readFileSync(ran), image, {quoted: msg, caption: 'NIH'})
                        limitAdd(sender, isPremium, isOwner, limit)
						fs.unlinkSync(ran)
					})
                }
					}
				break
            case prefix+'tomp3':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadAndSaveMediaMessage(encmedia, `${sender}`)
                    var ran = getRandom('.mp4')
                    reply(mess.wait)
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        if (err) return reply(`Err: ${err}`)
                        let buffer453 = fs.readFileSync(ran)
                        miko.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: msg })
                        limitAdd(sender, isPremium, isOwner, limit)
                        fs.unlinkSync(ran)
                        fs.unlinkSync(media)
                    })
                } else {
                    reply(`Kirim video dengan caption ${command} atau reply video yang sudah dikirim`)
                }
            }
            break
            case prefix+'pet':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (mentioned.length !== 0 && !isImage && !isQuotedImage){
                reply(mess.wait)
                    let animatedGif = await petPetGif(
                        await miko.getProfilePicture(mentioned[0])
                        .catch((_) => "https://telegra.ph/file/24fa902ead26340f3df2c.png")
                    );
                    const stc = await createSticker(animatedGif, {
                        type: StickerTypes.FULL,
                        pack: "Pet Pet By Miko Channn",
                        author: botNumber.split("@")[0],
                    });
                    await miko.sendMessage(from, stc, sticker, { quoted: msg, mimetype: "image/webp"});
                    limitAdd(sender, isPremium, isOwner, limit)
                } else if (isImage && isQuotedImage){
                reply(mess.wait)
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let animatedGif = await petPetGif(
                        await miko.downloadMediaMessage(encmedia)
                    );
                    const stc = await createSticker(animatedGif, {
                        type: StickerTypes.FULL,
                        pack: "Pet Pet By Miko Channn",
                        author: botNumber.split("@")[0],
                    });
                    await miko.sendMessage(from, stc, sticker, { quoted: msg, mimetype: "image/webp"});
                    limitAdd(sender, isPremium, isOwner, limit)
                } else {
                   reply(`Kirim gambar dengan caption ${command} atau reply gambar yang sudah dikirim`)
                }
            }
            break
            case prefix+'emojimix': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
		        let [emoji1, emoji2] = q.split`+`
		        if (!emoji1 && !emoji2) return reply(`Example : ${command} 😅+🤔`)
		            let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		        for (let res of anu.results) {
                    sendStickerFromUrl(from, res.url)
		        }
                limitAdd(sender, isPremium, isOwner, limit)
	        }
	        break
            // case prefix+'telesticker':{
            //     if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
            //     if (args.length === 1) return reply(`Kirim perintah *${command} [link]*`)
            //     if (!args[1].match(/https:\/\/.*t.me\/addstickers/gi)) return reply(mess.error.Iv)
            //     reply(mess.wait)
            //     xfar.Telesticker(args[1])
            //         .then(async data => {
            //             for (let i = 0; i < data.length; i++) {
            //                 sendStickerFromUrl(from, data.url[i])
            //                 sleep(2000)
            //             }
            //         })
            //         .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            //     }
            // break
//------------------< DOWNLOAD >---------------------
            case prefix+'ytmp4':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} link`)
                let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    // reply('Website sedang error, tunggu beberapa saat lagi...')
                    reply(mess.wait)
                    youtube(args[1])
                    .then((res) => {
                        const { title, size, quality, thumb, link } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${link}`)
                        .then((a) => {
                            if (!size.endsWith('KB') && Number(size.split('.')[0]) >= 15) return sendFileFromUrl(from, thumb, `「 *YOUTUBE MP4* 」

*Data Berhasil Didapatkan!*
\`\`\`⭔ Title : ${title}\`\`\`
\`\`\`⭔ Ext : MP4\`\`\`
\`\`\`⭔ Filesize : ${size}\`\`\`
\`\`\`⭔ Quality : ${quality}\`\`\`
\`\`\`⭔ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
const captionsYtmp4 = `「 *YOUTUBE MP4* 」

*Data Berhasil Didapatkan!*
\`\`\`⭔ Title : ${title}\`\`\`
\`\`\`⭔ Ext : MP4\`\`\`
\`\`\`⭔ Filesize : ${size}\`\`\`
\`\`\`⭔ Quality : ${quality}\`\`\`
_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                            sendFileFromUrl(from, thumb, captionsYtmp4, msg)
                            sendFileFromUrl(from, link, '', msg)
                            .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                            limitAdd(sender, isPremium, isOwner, limit)
                        })
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                } catch (err) {
                    reply(mess.error.api)
                }
            }
                break
                case prefix+'ytmp3':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    let isLinks2 = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                    if (!isLinks2) return reply(mess.error.Iv)
                    try {
                        // reply('Website sedang error, tunggu beberapa saat lagi...')
                        reply(mess.wait)
                        youtube(args[1])
                        .then((res) => {
                            const { title, size_mp3, quality, thumb, mp3 } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${mp3}`)
                            .then((a) => {
                                if (!size_mp3.endsWith('KB') && Number(size_mp3.split('.'[0])) >= 10) return sendFileFromUrl(from, thumb, `「 *YOUTUBE MP3* 」

*Data Berhasil Didapatkan!*
\`\`\`⭔ Title : ${title}\`\`\`
\`\`\`⭔ Ext : MP3\`\`\`
\`\`\`⭔ Filesize : ${size_mp3}\`\`\`
\`\`\`⭔ Quality : ${quality}\`\`\`
\`\`\`⭔ Link : ${a.data}\`\`\`
_Untuk durasi lebih dari batas disajikan dalam bentuk link_`, msg)
const captionsYtmp3 = `「 *YOUTUBE MP3* 」

*Data Berhasil Didapatkan!*
\`\`\`⭔ Title : ${title}\`\`\`
\`\`\`⭔ Ext : MP3\`\`\`
\`\`\`⭔ Filesize : ${size_mp3}\`\`\`
\`\`\`⭔ Quality : ${quality}\`\`\`
_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                sendFileFromUrl(from, thumb, captionsYtmp3, msg)
                                sendFileFromUrl(from, mp3, '', msg)
                                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                                limitAdd(sender, isPremium, isOwner, limit)
                            })
                        })
                        .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                    break
                case prefix+'play':{
                if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                if (args.length === 1) return reply(`Example : ${command} Alan Walker Alone`)
                try {
                    reply(mess.wait)
                    let yut = await yts(q)
                    youtube(yut.videos[0].url)
                    .then((res) => {
                        const { title, size, size_mp3, quality, thumb } = res
                        const caption = `「 *PLAY* 」

*Data Berhasil Didapatkan!*
\`\`\`⭔ Title : ${title}\`\`\`
\`\`\`⭔ Quality : ${quality}\`\`\`
_Silahkan silahkan pilih button dibawah untuk memilih format_`
                            miko.sendButtonImage(from, thumb, [{ buttonId: `${prefix}ytmp4 ${yut.videos[0].url}`, buttonText: { displayText: `Video` }, type: 1 }, { buttonId: `${prefix}ytmp3 ${yut.videos[0].url}`, buttonText: { displayText: `Audio` }, type: 1 }], caption, copyright, msg)
                            .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                } catch (err) {
                    reply(err+'\n\n'+mess.error.api)
                }
            }
                break
                case prefix+'ytsearch': case prefix+'yts':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} Alan Walker Alone`)
                    try {
                        reply(mess.wait)
                        await yts(q)
                        .then((res) => {
                            let rows = [];
                            for (let i of res.all){
                                rows.push({title: `${i.title}`,  description: `Durasi ${i.timestamp}`, rowId: prefix+`play ${i.url}`})
                            }
                        const sections = [{title: "Section 1", rows: rows}]
                        const button = {
                        buttonText: 'Click Me!',
                        description: `Data berhasil didapatkan!\n\nSearcing: ${q}\n*Silahkan klik button dibawah*`,
                        sections: sections,
                        listType: 1
                        }
//                         let teks = res.all.map(v => {
//     switch (v.type) {
//       case 'video': return `
// *${v.title}* 
// Url: ${v.url}
// Durasi: ${v.timestamp}
// Diupload ${v.ago}
// ${v.views} Penonton
//       `.trim()
//       case 'channel': return `
// *${v.name}* 
// Url: ${v.url}
// _${v.subCountLabel} (${v.subCount}) Subscriber_
// ${v.videoCount} video
// `.trim()
//     }
//   }).filter(v => v).join('\n________________________\n')
//                     reply(teks)
                    miko.sendMessage(from, button, MessageType.listMessage, { quoted: msg })
                    limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'tiktok':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!args[1].match(/(?:http(?:s|):\/\/|)(?:www\.|)(?:tiktok.com)\/@([-_0-9A-Za-z\.]{3,20})\/video\/([0-9]{19,25})?.(?:sender_device=pc&sender_web_id=[0-9]{19,25})&.(?:s_from_webapp=v1&is_copy_url=[0-9]{1})|(?:http(?:s|)):\/\/(?:(?:vt.|v)tiktok.com)\/(?:[a-z0-9A-Z]{9,15}\/)|(?:http(?:s|)):\/\/(?:t.tiktok.com)\/(?:i18n\/share\/video)\/([&\?\/a-zA-Z0-9=_-]{333,400})/) && !isUrl(args[1])) return reply(mess.error.Iv)
                    reply(mess.wait)
                    try {
                    await tiktok(args[1])
                    .then((res) => {
                        if (res.wm == null || res.wm == undefined || res.wm == false) return reply(mess.error.api)
                        sendFileFromUrl(from, res.wm, '「 *TIKTOK* 」', msg)
                        .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'tiktoknowm':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!args[1].match(/(?:http(?:s|):\/\/|)(?:www\.|)(?:tiktok.com)\/@([-_0-9A-Za-z\.]{3,20})\/video\/([0-9]{19,25})?.(?:sender_device=pc&sender_web_id=[0-9]{19,25})&.(?:s_from_webapp=v1&is_copy_url=[0-9]{1})|(?:http(?:s|)):\/\/(?:(?:vt.|v)tiktok.com)\/(?:[a-z0-9A-Z]{9,15}\/)|(?:http(?:s|)):\/\/(?:t.tiktok.com)\/(?:i18n\/share\/video)\/([&\?\/a-zA-Z0-9=_-]{333,400})/) && !isUrl(args[1])) return reply(mess.error.Iv)
                    reply(mess.wait)
                    try {
                    await tiktok(args[1])
                    .then((res) => {
                        if (res.nowm == null || res.nowm == undefined || res.nowm == false) return reply(mess.error.api)
                        sendFileFromUrl(from, res.nowm, '「 *TIKTOK NOWM* 」', msg)
                        .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'tiktokaud':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!args[1].match(/(?:http(?:s|):\/\/|)(?:www\.|)(?:tiktok.com)\/@([-_0-9A-Za-z\.]{3,20})\/video\/([0-9]{19,25})?.(?:sender_device=pc&sender_web_id=[0-9]{19,25})&.(?:s_from_webapp=v1&is_copy_url=[0-9]{1})|(?:http(?:s|)):\/\/(?:(?:vt.|v)tiktok.com)\/(?:[a-z0-9A-Z]{9,15}\/)|(?:http(?:s|)):\/\/(?:t.tiktok.com)\/(?:i18n\/share\/video)\/([&\?\/a-zA-Z0-9=_-]{333,400})/) && !isUrl(args[1])) return reply(mess.error.Iv)
                    reply(mess.wait)
                    try {
                    await tiktok(args[1])
                    .then((res) => {
                        if (res.nowm == null || res.nowm == undefined || res.nowm == false) return reply(mess.error.api)
                        sendTomp3FromUrl(from, res.nowm)
                        .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'igdl': case prefix+'ig':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!args[1].match(/https:\/\/www.instagram.com\/.*(p|reel|tv)/gi) && !isUrl(args[1])) return reply(`url salah, perintah ini untuk mengunduh post/reel/tv\n\nContoh:\n${command} https://www.instagram.com/p/CQU21b0JKwq/`)
                    reply(mess.wait)
                    try {
                    await igdl(args[1])
                    .then((res) => {
                    for(let i of res.medias){
                    sendFileFromUrl(from, i.url, '', msg)
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    }
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'fbdl':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!/^https?:\/\/.*(fb.watch|facebook.com)/i.test(args[1]) && !isUrl(args[1])) return reply(mess.error.Iv + `\n\nperintah ini untuk mengunduh postingan video\n\nContoh:\n${command} https://www.facebook.com/alanwalkermusic/videos/277641643524720`)
                    reply(mess.wait + '\n\n*Lama Waktu Pengiriman Media Ditentukan Oleh Ukuran Media Tersebut...*')
                    try {
                    await scrape.facebookdlv2(args[1])
                    .then((res) => {
                        for(let i of res.result){
                            sendFileFromUrl(from, i.url, `Quality: *${i.quality}*`, msg)  
                            .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                        }
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                } catch (err) {
                    reply(mess.error.api)
                }
                }
                break
                case prefix+'igstory':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} username`)
                    if (args[1].match(/https:\/\/www.instagracom\/.*(p|reel|tv)/gi) && isUrl(args[1])) return reply(`Kirim perintah *${prefix}igstory [username]*`)
                    reply(mess.wait)
                    try {
                    await hx.igstory(q).catch(async _ => await scrape.instagramStoryv2(q))
                    .then(async res => {
                    for(let i of res.medias){
                    sendFileFromUrl(from, i.url, '', msg)  
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    }
                    })
                    .catch((err) => reply(`Tidak dapat mengambil data, akun tersebut merupakan akun private/tidak mempunyai story\n\n`+err))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                case prefix+'mediafire':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} link`)
                    if (!args[1].match(/(?:http(?:s|):\/\/|)(?:(?:www\.|))mediafire\.com\/(?:file)\/(?:[-_a-zA-Z0-9]{15,20})\/(?:[0-9a-zA-Z_.-]{1,100})\/(?:file|)|(?:http(?:s|):\/\/|)(?:(?:www\.|))mediafire\.com\/(?:download)\/([a-zA-Z0-9_]{15,20})/)) return reply(mess.error.Iv)
                    reply(mess.wait)
                    try {
                    await mediafire(args[1])
                    .then((res) => {
                        if (res.title === undefined) return reply(mess.error.api)
                        let teks = `
*Title* : ${res.title}
*Size* : ${res.size}
*Upload* : ${res.upload}`
                        sendFileFromUrl(from, res.link, teks, msg)
                        .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    } catch (err) {
                        reply(mess.error.api)
                    }
                }
                break
                // case prefix+'pinvid':{
                //     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                //     if (args.length === 1) return reply(`Kirim perintah *${command} [link]*`)
                //     if (!args[1].match(/https:\/\/.*pinterest.com\/pin|pin.it/gi)) return reply(mess.error.Iv)
                //     reply(mess.wait)
                //     try {
                //     await pinvid(args[1])
                //     .then((res) => {
                //         if (res.status === false) return reply(mess.error.api)
                //         let pin = JSON.stringify(res)
                //         let json = JSON.parse(pin)
                //         sendFileFromUrl(from, json.data.url, '', msg)
                //         limitAdd(sender, isPremium, isOwner, limit)
                //     })
                //     .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                //     } catch (err) {
                //         reply(mess.error.api)
                //     }
                // }
                // break
//------------------< KERANG >---------------------
                case prefix+'bisakah':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} Pertanyaan`)
                    const bisakah = [
                        'Bisa',
                        'Tidak',
                        'Mungkin Bisa',
                        'Mungkin Tidak'
                        ]
                    const ans = bisakah[Math.floor(Math.random() * (bisakah.length))]
                        reply(`Pertanyaan: *${q}*\n\nJawaban: *${ans}*`)
                        limitAdd(sender, isPremium, isOwner, limit)
                    }
                break
                case prefix+'kapan':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} Pertanyaan`)
                    const kapan = [
                        `${randomNomor(60)} menit lagi`,
                        `${randomNomor(24)} jam lagi`,
                        `${randomNomor(30)} hari lagi`,
                        `${randomNomor(4)} minggu lagi`,
                        `${randomNomor(12)} bulan lagi`,
                        `${randomNomor(10)} tahun lagi`
                    ]
                    const ans = kapan[Math.floor(Math.random() * (kapan.length))]
                        reply(`Pertanyaan: *${q}*\n\nJawaban: *${ans}*`)
                        limitAdd(sender, isPremium, isOwner, limit)
                    }
                break
                case prefix+'apakah':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} pertanyaan`)
                    const apakah = [
                        'Iya',
                        'Tidak',
                        ]
                    const ans = apakah[Math.floor(Math.random() * (apakah.length))]
                        reply(`Pertanyaan: *${q}*\n\nJawaban: *${ans}*`)
                        limitAdd(sender, isPremium, isOwner, limit)
                    }
                break
//------------------< WEEABOO >---------------------
                case prefix+'waifu':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson(isPremium ? 'https://api.waifu.pics/nsfw/waifu' : 'https://api.waifu.pics/sfw/waifu')
                    .then((res) => {
                        miko.sendButtonImage(from, res.url, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'loli':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson('https://raw.githubusercontent.com/Xmell91/loli/master/loli.json')
                    .then(async(res) => {
                        let url = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, await (await fetch(url)).buffer(), [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'neko':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson(isPremium? 'https://api.waifu.pics/nsfw/neko' : 'https://api.waifu.pics/sfw/neko')
                    .then((res) => {
                        miko.sendButtonImage(from, res.url, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'megumin':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson(isPremium ? 'https://api.waifu.pics/nsfw/megumin' : 'https://api.waifu.pics/sfw/megumin')
                    .then((res) => {
                        miko.sendButtonImage(from, res.url, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'husbu':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson('https://raw.githubusercontent.com/melcanz/json/main/anime/husbu.json')
                    .then((res) => {
                        let url = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, url.image, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], `${url.teks}`, copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'kanna':{
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    await fetchJson('https://raw.githubusercontent.com/melcanz/json/main/anime/kanna.json')
                    .then((res) => {
                        let url = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, url, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch(() => reply(`${err}\n\n${mess.error.api}`))
                }
                break
                case prefix+'couple': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                    let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
                    let random = anu[Math.floor(Math.random() * anu.length)]
                    sendFileFromUrl(from, random.male, '', msg)
                    sendFileFromUrl(from, random.female, '', msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                }
                break
                case prefix+'anime': {
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    if (args.length === 1) return reply(`Example : ${command} Kimetsu No Yaiba`);
                    reply(mess.wait)
                    const arg = body.substring(body.indexOf(' ') + 1);
                    let num = (parseInt(arg.split("#")[1]) - 1) || 0;
                    let title = args.join(" ").includes("#") ? arg.split("#")[0] : args.join(" ");
                    if (isNaN(num)) num = 0;
                    const searchRes = await search(title, num);
                    await sendFileFromUrl(from, searchRes.image, searchRes.data, msg);
                    limitAdd(sender, isPremium, isOwner, limit)
                }
                break
                case prefix+'wait': {
                    if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    reply(mess.wait)
                    let mime = isQuotedImage ? quotedMsg.imageMessage.mimetype : msg.message.imageMessage.mimetype
                    if (!/image\/(jpe?g|png)/.test(mime)) return reply(`Mime ${mime} tidak support`)
                    let anime = `data:${mime};base64,${media.toString('base64')}`
                    let response = await fetch('https://trace.moe/api/search', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ image: anime }),
                        })
                        if (!response.ok) return reply('Gambar tidak ditemukan!')
                        let result = await response.json()
                        let { is_adult, title, title_chinese, title_romaji, episode, season, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                        let link = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                        let nobuyaki = `${similarity < 0.89 ? 'Saya Memiliki Keyakinan Rendah Tentang Hal Ini' : ''}

❏ Judul Jepang : *${title}*
❏ Judul Cina : *${title_chinese}*
❏ Ejaan Judul : *${title_romaji}*
❏ Similarity : *${(similarity * 100).toFixed(1)}%*
❏ Episode : *${episode.toString()}*
❏ Ecchi : *${is_adult ? 'Yes' : 'No'}*`.trim()
                        await sendFileFromUrl(from, link, nobuyaki, msg);
                        } else {
                            reply(`Kirim gambar dengan caption ${command} atau reply gambar yang sudah dikirim`)
                        }
                    }
                break
//------------------< NSFW >---------------------
                case prefix+'ahegao': {
                if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply(mess.wait)
					fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/ahegao.json')
                    .then((res) => {
                    const randomUrl = res[Math.floor(Math.random() * res.length)]
                    miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(jsonformat(err)))
                }
                break
                case prefix+'ass': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/ass.json')
                        .then((res) => {
                        const randomUrl = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break
                case prefix+'blowjob': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/blowjob.json')
                        .then((res) => {
                        const randomUrl = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break
                case prefix+'hentai': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/hentai.json')
                        .then((res) => {
                        const randomUrl = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break
                case prefix+'pussy': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/pussy.json')
                        .then((res) => {
                        const randomUrl = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break
                case prefix+'yuri': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://raw.githubusercontent.com/melcanz/json/main/nsfw/yuri.json')
                        .then((res) => {
                        const randomUrl = res[Math.floor(Math.random() * res.length)]
                        miko.sendButtonImage(from, randomUrl, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break
                case prefix+'boobs': {
                    if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                    reply(mess.wait)
                        fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
                        .then((res) => {
                        miko.sendButtonImage(from, res.url, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], '*Data Berhasil Didapatkan!*', copyright, msg)
                        limitAdd(sender, isPremium, isOwner, limit)
                        })
                        .catch((err) => reply(jsonformat(err)))
                    }
                    break

//------------------< LEVELING >---------------------
            case prefix+'level': {
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                const userLevel = getLevelingLevel(sender, _level)
                const userXp = getLevelingXp(sender, _level)
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                try {
                var pic = await miko.getProfilePicture(sender)
                } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                const lvl = await new canva.Rank()
                .setAvatar(pic)
                .setLevel(userLevel)
                .setLevelColor('#ffffff', '#ffffff')
                .setRank(Number(getUserRank(sender, _level)))
                .setCurrentXP(userXp)
                .setOverlay('#000000', 100, false)
                .setRequiredXP(requiredXp)
                .setProgressBar('#ffa200', 'COLOR')
                .setBackground('COLOR', '#000000')
                .setUsername(pushname)
                .setDiscriminator(sender.substring(6, 10))
                lvl.build()
                .then(async (buffer) => {
                await miko.sendFile(from, buffer, 'pp.jpg', '', null, false, { quoted: msg })
                })
            }
            break
            case prefix+'leaderboard':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '「 *LEADERBOARD* 」\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Copper V'
                        if (resp[i].level <= 5) {
                            roles = 'Copper IV'
                        } else if (resp[i].level <= 10) {
                            roles = 'Copper III'
                        } else if (resp[i].level <= 15) {
                            roles = 'Copper II'
                        } else if (resp[i].level <= 20) {
                            roles = 'Copper I'
                        } else if (resp[i].level <= 25) {
                            roles = 'Silver V'
                        } else if (resp[i].level <= 30) {
                            roles = 'Silver IV'
                        } else if (resp[i].level <= 35) {
                            roles = 'Silver III'
                        } else if (resp[i].level <= 40) {
                            roles = 'Silver II'
                        } else if (resp[i].level <= 45) {
                            roles = 'Silver I'
                        } else if (resp[i].level <= 50) {
                            roles = 'Gold V'
                        } else if (resp[i].level <= 55) {
                            roles = 'Gold IV'
                        } else if (resp[i].level <= 60) {
                            roles = 'Gold III'
                        } else if (resp[i].level <= 65) {
                            roles = 'Gold II'
                        } else if (resp[i].level <= 70) {
                            roles = 'Gold I'
                        } else if (resp[i].level <= 75) {
                            roles = 'Platinum V'
                        } else if (resp[i].level <= 80) {
                            roles = 'Platinum IV'
                        } else if (resp[i].level <= 85) {
                            roles = 'Platinum III'
                        } else if (resp[i].level <= 90) {
                            roles = 'Platinum II'
                        } else if (resp[i].level <= 95) {
                            roles = 'Platinum I'
                        } else if (resp[i].level <= 100) {
                            roles = 'Exterminator'
                        }
                        leaderboard += `${i + 1}. @${_level[i].id.split("@")[0]}\n⭔  *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n⭔  *Role*: ${roles}\n\n`
                    }
                    await reply(leaderboard)
                } catch (err) {
                    await reply(`Require at least *10* level database users!`)
                }
            }
            break
//------------------< SISTEM >---------------------
            case prefix+'nulis':
                reply(`*Pilihan*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`)
                break
            case prefix+'nuliskiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} Miko`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '22',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+140+153',
                    fixHeight,
                    './media/nulis/images/buku/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    miko.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkiri.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0)})
                    limitAdd(sender, isPremium, isOwner, limit)
                })
            }
                break
            case prefix+'nuliskanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} Miko`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,9}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 31).join('\n')
                spawn('convert', [
                    './media/nulis/images/buku/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '2',
                    '-annotate',
                    '+128+129',
                    fixHeight,
                    './media/nulis/images/buku/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    miko.sendMessage(from, fs.readFileSync('./media/nulis/images/buku/setelahkanan.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0)})
                    limitAdd(sender, isPremium, isOwner, limit)
                })
            }
                break
            case prefix+'foliokiri':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} Miko`)
                reply(mess.wait)
                const tulisan = body.slice(11)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkiri.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '1720x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '4',
                    '-annotate',
                    '+48+185',
                    fixHeight,
                    './media/nulis/images/folio/setelahkiri.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    miko.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkiri.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0)})
                    limitAdd(sender, isPremium, isOwner, limit)
                })
            }
                break
            case prefix+'foliokanan':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} Miko`)
                reply(mess.wait)
                const tulisan = body.slice(12)
                const splitText = tulisan.replace(/(\S+\s*){1,13}/g, '$&\n')
                const fixHeight = splitText.split('\n').slice(0, 38).join('\n')
                spawn('convert', [
                    './media/nulis/images/folio/sebelumkanan.jpg',
                    '-font',
                    './media/nulis/font/Indie-Flower.ttf',
                    '-size',
                    '960x1280',
                    '-pointsize',
                    '23',
                    '-interline-spacing',
                    '3',
                    '-annotate',
                    '+89+190',
                    fixHeight,
                    './media/nulis/images/folio/setelahkanan.jpg'
                ])
                .on('error', () => reply(mess.error.api))
                .on('exit', () => {
                    miko.sendMessage(from, fs.readFileSync('./media/nulis/images/folio/setelahkanan.jpg'), image, {quoted: msg, caption: `Jangan malas pak...`, thumbnail: Buffer.alloc(0)})
                    limitAdd(sender, isPremium, isOwner, limit)
                })
            }
                break
//------------------< OTHER >---------------------
            case prefix+'tagme':
                mentions(`@${sender.split("@")[0]}`, [sender], true)
                break
            case prefix+'kontak':
                if (args.length < 2) return reply(`Example : ${command} ${botNumber.split("@")[0]}|Miko`)
                if (!q.includes("|")) return reply(`Example : ${command} ${botNumber.split("@")[0]}|Miko`)
                if (isNaN(q.split("|")[0])) return reply(`Example : ${command} ${botNumber.split("@")[0]}|Miko`)
                miko.sendContact(from, q.split("|")[0], q.split("|")[1], msg)
                break
            case prefix+'hidetag':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isOwner || !isGroupAdmins) return reply('Command ini hanya bisa diakses oleh admin grup / owner')
                if (isSticker || isQuotedSticker) {
                const encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                const file = await miko.downloadAndSaveMediaMessage(encmedia)
                let mem = [];
                for (let i of groupMembers){
                    mepush(i.jid)
                }
                var options = {
                    contextInfo: { mentionedJid: mem },
                    quoted: msg,
                    caption: q ? q : ''
                }
                miko.sendMessage(from, fs.readFileSync(file), sticker, options)
                fs.unlinkSync(file)
                } else if (isImage || isQuotedImage) {
                const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                const file = await miko.downloadAndSaveMediaMessage(encmedia)
                let mem = [];
                for (let i of groupMembers){
                    mepush(i.jid)
                }
                var options = {
                    contextInfo: { mentionedJid: mem },
                    quoted: msg,
                    caption: q ? q : ''
                }
                miko.sendMessage(from, fs.readFileSync(file), image, options)
                fs.unlinkSync(file)
            } else if (isQuotedAudio) {
                const encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                const file = await miko.downloadAndSaveMediaMessage(encmedia)
                let mem = [];
                for (let i of groupMembers){
                    mepush(i.jid)
                }
                var options = {
                    mimetype : 'audio/mp4',
                    ptt : true,
                    contextInfo: { mentionedJid: mem },
                    quoted: msg
                }
                miko.sendMessage(from, fs.readFileSync(file), audio, options)
                fs.unlinkSync(file)
            }  else if (isVideo || isQuotedVideo) {
                const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                const file = await miko.downloadAndSaveMediaMessage(encmedia)
                let mem = [];
                for (let i of groupMembers){
                    mepush(i.jid)
                }
                var options = {
                    mimetype : 'video/mp4',
                    contextInfo: { mentionedJid: mem },
                    quoted: msg,
                    caption: q ? q : ''
                }
                miko.sendMessage(from, fs.readFileSync(file), video, options)
                fs.unlinkSync(file)
                } else {
                    if (args.length < 2) return reply(`Example : ${command} alasan hidetag`)
                    let arr = [];
                    for (let i of groupMembers){
                        arr.push(i.jid)
                    }
                    mentions(q, arr, false)
                }
            break
            case prefix+'tinyurl':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} https://google.com/`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                axios.get(`https://tinyurl.com/api-create.php?url=${args[1]}`)
                .then((a) => reply(`Nih ${a.data}`))
                .catch(() => reply(`Error, harap masukkan link dengan benar`))
                limitAdd(sender, isPremium, isOwner, limit)
                break
            case prefix+'ssweb':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Example : ${command} https://google.com/`)
                if (!isUrl(args[1])) return reply(`Masukkan link yang benar`)
                reply(mess.wait)
                sendFileFromUrl(from, global.API('nrtm', '/api/ssweb', { url: /https?:\/\//.test(args[1]) ? args[1] : 'https://' + args[1] }), '', msg)
                limitAdd(sender, isPremium, isOwner, limit)
            }
                break
            case prefix+'tourl': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    await upload(media)
                    .then((res) => reply(`${res}`))
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    limitAdd(sender, isPremium, isOwner, limit)
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}tourl atau reply gambar yang sudah dikirim`)
                    }
                }
                break
            case prefix+'report':{
                let cekrep = ms(cekWaktuReport(sender, report) - Date.now())
                if (checkReportUser(sender, report)) return reply(`*Tunggu selama :*\n${cekrep.days} day(s) ${cekrep.hours} hour(s) ${cekrep.minutes} minute(s)`)
                if (args.length === 1 && mentioned) return reply(`Example : ${command} Alasanmu`)
                if (q.length < 10) return reply(`Laporan terlalu pendek, minimal 10 karakter!`)
                if (q.length > 1000) return reply(`Laporan terlalu panjang, maksimal 1000 karakter!`)
                sendMess(setting.ownerNumber, `*REPORT!*\n\nDari : *wa.me/${sender.split`@`[0]}*\n\nPesan : ${q}`)
                reply(`_Pesan terkirim kepemilik bot, jika report hanya main-main tidak akan ditanggapi._`)
                addWaktuReport(sender, report)
                }
                break
            case prefix+'namaninja':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2 && isUrl) return reply(`Example : ${command} Miko`)
                reply(`Nama: *${q}*\n\nNama ninja: *${q.replace(/[a-z]/gi, v => {
                    return {
                        'a': 'ka',
                        'b': 'tu',
                        'c': 'mi',
                        'd': 'te',
                        'e': 'ku',
                        'f': 'lu',
                        'g': 'ji',
                        'h': 'ri',
                        'i': 'ki',
                        'j': 'zu',
                        'k': 'me',
                        'l': 'ta',
                        'm': 'rin',
                        'n': 'to',
                        'o': 'mo',
                        'p': 'no',
                        'q': 'ke',
                        'r': 'shi',
                        's': 'ari',
                        't': 'ci',
                        'u': 'do',
                        'v': 'ru',
                        'w': 'mei',
                        'x': 'na',
                        'y': 'fu',
                        'z': 'zi'
                    }[v.toLowerCase()] || v
                })}*`)
                limitAdd(sender, isPremium, isOwner, limit)
            }
            break
            case prefix+'mutual':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                reply('Looking for a partner...')
                const rndm = pendaftar[Math.floor(Math.random() * (pendaftar.length))]
                miko.sendContact(from, rndsplit("@")[0], miko.getName(rndm, true), msg)
                .then((res) => miko.sendButtonText(from, [{ buttonId: prefix+'mutual', buttonText: { displayText: 'Next' }, type: 1 }], `Partner found\n*Click the button below* — find a new partner`, copyright, res))
                    limitAdd(sender, isPremium, isOwner, limit)
                }
            break
            case prefix+'translate':case prefix+'tr':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                try {
                let teksny
                var tld = 'cn'
                var defaultLang = 'id'
                if (isQuotedMsg && !isQuotedButton) {
                    teksny = await translate(`${quotedMsg.chats}`, {
                        tld,
                        to: args[1] ? args[1] : defaultLang,
                    });
                    await reply(`${teksny}`);
                    limitAdd(sender, isPremium, isOwner, limit)
                } else if (!isQuotedMsg && args.length >= 3) {
                    teksny = await translate(`${args.slice(2).join(" ")}`, {
                        tld,
                        to: args[1],
                    });
                    await reply(`${teksny}`);
                    limitAdd(sender, isPremium, isOwner, limit)
                } else {
                    miko.sendButtonText(from, [{ buttonId: 'daftarbhs', buttonText: { displayText: 'Daftar Bahasa' }, type: 1 }], `Reply sebuah pesan atau ikuti format berikut.\n${command} <bahasa> <teks>\njangan gunakan <> saat menggunakan perintah.\n\nDaftar bahasa bisa klik button dibawah...`, copyright, msg);
                }
            } catch (e) { await miko.sendButtonText(from, [{ buttonId: 'daftarbhs', buttonText: { displayText: 'Daftar Bahasa' }, type: 1 }], `${e}`, copyright, msg); }
                }
            break
//------------------< MISC >-------------------
            case prefix+'artinama':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Miko`)
                await primbon.arti_nama(q)
                    .then((res) => {
                        if (res.status == false) return reply(res.message)
                        reply(`⭔ *Nama :* ${res.message.nama}\n⭔ *Arti :* ${res.message.arti}\n⭔ *Catatan :* ${res.message.catatan}`)
                        limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                }
                break
            case prefix+'pinterest':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Sakura Miko`)
                reply(mess.wait)
                await pinterest(q)
                .then((res) => {
                    var result = res[Math.floor(Math.random() * res.length)]
                    sendFileFromUrl(from, result, '', msg)
                                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    limitAdd(sender, isPremium, isOwner, limit)
                })
                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            }
                break
            case prefix+'gimg':
            case prefix+'gimage':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Sby garuk biji`)
                reply(mess.wait)
                try {
                scrape.googleImage(q)
                .then((res) => {
                    sendFileFromUrl(from, res[0], '', msg)
                                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                    limitAdd(sender, isPremium, isOwner, limit)
                })
                } catch (err) {
                    reply(`${err}`)
                }
            }
                break
            case prefix+'lirik':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Alone`)
                await lirik(q)
                .then((res) => {
                    sendFileFromUrl(from, res.thumb, res.lirik, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                })
                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            }
                break
            case prefix+'google':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Pengertian Programming`)
                await google({ query: q })
                .then((res) => {
                    let url = 'https://google.com/search?q=' + encodeURIComponent(q)
                    let result = res.map(({ title, link, snippet }) => {
                        return `*${title}*\n_${link}_\n_${snippet}_`
                      }).join`\n\n`
                    reply(url + '\n\n' + result)
                    limitAdd(sender, isPremium, isOwner, limit)
                })
                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            }
                break
            case prefix+'igstalk':
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Kirim perintah *${prefix}igstalk [username]*`)
                try {
                reply(mess.wait)
                await igstalk(q)
                .then(res => {
                let json = JSON.parse(JSON.stringify(res))
                let teks = `「 *IG STALKER* 」

• *Username:* ${json.username}
• *Nickname:* ${json.fullName}
• *Followers:* ${json.followersM}
• *Following:* ${json.followingM}
• *Posting:* ${json.postsCountM}
• *Bio:* ${json.bio}
• *Link:* https://instagracom/${json.username}
`.trim()
                sendFileFromUrl(from, json.profilePicHD, teks, msg)
                limitAdd(sender, isPremium, isOwner, limit)
                })      
                .catch((err) => reply(`${err}\n\n${mess.error.api}`))
            } catch (err) {
                sendMess(ownerNumber, 'igstalk Error : ' + err)
                reply(mess.error.api + '\n\n' + err)
            }
                break
            case prefix+'genshin':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Keqing`)
                reply(mess.wait)
                try {
                    const character = await genshin.characters(q)
                    sendFileFromUrl(from, character.image, `*「 GENSHIN IMPACT 」*\n\n*${character.name}*\n${character.description}\n\n"_${character.quote}_" - ${character.name}\n\n❏ *Name*: ${character.name}\n❏ *Seiyuu*: ${character.cv}\n❏ *Region*: ${character.city}\n❏ *Rating*: ${character.rating}\n❏ *Vision*: ${character.element}\n❏ *Weapon*: ${character.weapon}\n\n${character.url}`, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                } catch (err) {
                    await reply('Error or character not found!\n\n*Info character*:\namber, ayaka, baizhu, barbara, beidou, bennett, childe, chongyun, cyno, dainsleif, diluc, diona, fischl, ganyu, jean, kaeya, keqing, klee, lisa, mona, ningguang, noelle, qiqi, razor, sucrose, venti, xiangling, xiao, xingiu, xinyan, zhongli')
                }
            }
                break
            case prefix+'motivasi':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                try {
                    await fetchTxt('https://raw.githubusercontent.com/VideFrelan/motivasi/main/motivasi.txt')
                    .then(async (res) => {
                    const motivasiSplit = res.split('\n')
                    const randomMotivasi = motivasiSplit[Math.floor(Math.random() * motivasiSplit.length)]
                    miko.sendButtonText(from, [{ buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], `${randomMotivasi}`, copyright, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(`${err}\n\n${mess.error.api}`))
                } catch (err) {
                    await reply(`${err}`)
                }
            }
                break
            case prefix+'style': case prefix+'styletext': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length === 1) return reply(`Example : ${command} Miko`)
                    let anu = await styletext(q)
                    let teks = `Style Text From ${text}\n\n`
                    for (let i of anu) {
                        teks += `⭔ *${i.name}* : ${i.result}\n\n`
                    }
                reply(teks)
            }
                break
//------------------< INFO >-------------------
            case prefix+'limit': case prefix+'ceklimit': case prefix+'balance': case prefix+'glimit': case prefix+'cekbalance':
                if (mentioned.length !== 0){
                    reply(`Level : ${getLevelingLevel(mentioned[0], _level)}\nLimit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : `${getLimit(mentioned[0], limitCount, limit)}/${limitCount}`}\nLimit Game : ${[ botNumber, ownerNumber].includes(mentioned[0]) ? 'Unlimited': cekGLimit(mentioned[0], gcount, glimit) + `/${gcount}`}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                } else {
                    reply(`Level : ${getLevelingLevel(sender, _level)}\nLimit : ${isPremium ? 'Unlimited' : `${getLimit(sender, limitCount, limit)}/${limitCount}`}\nLimit Game : ${[ botNumber, ownerNumber].includes(sender) ? 'Unlimited': cekGLimit(sender, gcount, glimit) + `/${gcount}`}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
                }
                break
            case prefix+'owner':
            case prefix+'creator':
                miko.sendContact(from, ownerNumber.split("@")[0], 'Owner Miko', msg)
                .then(async(res) => {
                    let pien = await getBuffer('https://b.top4top.io/m_2223iin241.mp3')
                    miko.sendMessage(from, pien, audio, {quoted: res, mimetype: 'audio/mp4', ptt: true })
                })
                break
            case prefix+'speed':{
                await reply(`${latensi.toFixed(4)} Second`)
            }
                break
            case prefix+'donate': case prefix+'donasi':
                await reply(setting.txtDonasi)
                break
            case prefix+'runtime':
                await reply(`${runtime(process.uptime())}`)
                break
            case prefix+'totalmsg':{
                if (!isGroup) return reply(mess.OnlyGrup)
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                let mCount = {}
                let totalM = 0
                await miko.loadAllMessages(from, m => {
                    let user = key.fromMe ? miko.user.jid : participant ? participant : froincludes('g.us') ? '' : from
                    if (!user) return
                    if (user in mCount) mCount[user]++
                    else mCount[user] = 1
                    totalM++
                }, 1000)
                let sorted = Object.entries(mCount).sort((a, b) => b[1] - a[1])
                let pesan = sorted.map(v => `${v[0].replace(/(\d+)@.+/, '@$1')}: ${v[1]} pesan`).join('\n')
                miko.sendMessage(from, `${totalM} pesan terakhir\n\n${pesan}`, text, { quoted: msg, contextInfo: { mentionedJid: sorted.map(v => v[0]) } })
            }
                break
            case prefix+'ping':{
                let totalchat = await miko.chats.all()
                let timestampi = speed();
				let latensii = speed() - timestampi
                const { wa_version, mcc, mnc, os_version, device_manufacturer, device_model } = miko.user.phone
                let anu = process.uptime()
                let teskny = `*V. Whatsapp :* ${wa_version}
*Baterai :* ${baterai.baterai}% *(${baterai.cas === 'true' ? 'Charging 🔋' : 'Not Charging ❌'})*
*RAM :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*MCC :* ${mcc}
*MNC :* ${mnc}
*Versi OS :* ${os_version}
*Merk HP :* ${device_manufacturer}
*Versi HP :* ${device_model}
*Total Chat :* ${totalchat.length}
*Speed :* ${latensii.toFixed(4)} Second
*Runtime :* ${runtime(anu)}

*INFO SERVER*
*Hostname* : ${os.hostname()}
*Platform* : ${os.platform()}
*Version* : ${os.version()}
*RAM* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
                `.trim()
				reply(teskny)
            }
				break
//------------------< Premium >-------------------
            case prefix+'addprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 3) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                    _prem.addPremiumUser(mentioned[0], args[2], premium)
                    }
                    reply('Sukses')
                } else {
                    _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
                    reply('Sukses')
                }
                break
            case prefix+'delprem':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 3) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        premium.splice(_prem.getPremiumPosition(mentioned[i], premium), 1)
                        fs.writeFileSync('./database/premiujson', JSON.stringify(premium))
                    }
                    reply('Sukses')
                } else {
                    premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
                    fs.writeFileSync('./database/premiujson', JSON.stringify(premium))
                }
                break
            case prefix+'cekprem':
            case prefix+'cekpremium':
                if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
                let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
                reply(premiumnya)
                break
            case prefix+'listprem':
                let txt = `List Prem\nJumlah : ${premium.length}\n\n`
                let men = [];
                for (let i of premium){
                    men.push(i.id)
                    let cekvip = ms(i.expired - Date.now())
                    txt += `*ID :* @${i.id.split("@")[0]}\n*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                }
                mentions(txt, men, true)
                break
//------------------< BAN >-------------------
            case prefix+'ban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        addBanned(mentioned[0], args[2], ban)
                    }
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa ban Owner`)
                    addBanned(quotedMsg.sender, args[1], ban)
                    reply(`Sukses ban target`)
                } else if (!isNaN(args[1])) {
                    addBanned(args[1] + '@s.whatsapp.net', args[2], ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}ban @tag atau nomor atau reply pesan orang yang ingin di ban`)
                }
                break
            case prefix+'unban':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (mentioned.length !== 0){
                    for (let i = 0; i < mentioned.length; i++){
                        unBanned(mentioned[i], ban)
                    }
                    reply('Sukses')
                } else if (isQuotedMsg) {
                    unBanned(quotedMsg.sender, ban)
                    reply(`Sukses unban target`) 
                } else if (!isNaN(args[1])) {
                    unBanned(args[1] + '@s.whatsapp.net', ban)
                    reply('Sukses')
                } else {
                    reply(`Kirim perintah ${prefix}unban @tag atau nomor atau reply pesan orang yang ingin di unban`)
                }
                break
            case prefix+'listban':
                let txtx = `List Banned\nJumlah : ${ban.length}\n\n`
                let menx = [];
                for (let i of ban){
                    menx.push(i.id)
                    txtx += `*ID :* @${i.id.split("@")[0]}\n`
                    if (i.expired === 'PERMANENT'){
                        let cekvip = 'PERMANENT'
                        txtx += `*Expire :* PERMANENT\n\n`
                    } else {
                        let cekvip = ms(i.expired - Date.now())
                        txtx += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
                    }
                }
                mentions(txtx, menx, true)
                break
//------------------< Game >-------------------
            case prefix+'topglobal':{
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOPGLOBAL 」 ──*\n\n'
                let arrTop = []
                for (let i = 0; i < 10; i ++){
                    top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                    arrTop.push(balance[i].id)
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'toplocal':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
                let top = '*── 「 TOPLOCAL 」 ──*\n\n'
                let arrTop = []
                let anggroup = groupMembers.map(a => a.jid)
                for (let i = 0; i < balance.length; i ++){
                    if (arrTop.length >= 10) continue
                    if (anggroup.includes(balance[i].id)) {
                        top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
                        arrTop.push(balance[i].id)
                    }
                }
                mentions(top, arrTop, true)
            }
                break
            case prefix+'buylimit':{
                if (isPremium) return reply(`Member premium tidak bisa menggunakan perintah ini`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 150)
                if (args[1] > limitCount - getLimit(sender, limitCount, limit)) return reply(`Tidak boleh melebihi ${limitCount}`)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                giveLimit(sender, nebal(args[1]), limit)
                reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            }
                break
            case prefix+'buyglimit':{
                if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
                if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
                if (isNaN(args[1])) return reply(`Harus berupa angka`)
                let ane = Number(nebal(args[1]) * 150)
                if (args[1] > gcount - cekGLimit(sender, gcount, glimit)) return reply(`Tidak boleh melebihi ${gcount}`)
                if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
                kurangBalance(sender, ane, balance)
                givegame(sender, nebal(args[1]), glimit)
                reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            }
                break
            case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentioned.length !== 0){
						if (mentioned[0] === sender) return reply(`Tidak bisa bermain dengan diri sendiri!`)
                        if (mentioned[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                        if (blocked.includes(mentioned[0])) return reply(`User tersebut telah diblokir!\nBermainlah dengan yang lain`)
                        let h = randomNomor(100)
                        mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain\n\nHadiah : ${h} balance`), [sender, mentioned[0]], true)
                        tictactoe.push({
                            id: from,
                            timeOut: Date.now() + toMs(`${gamewaktu}s`),
                            timeOutPlay: Date.now() + toMs(`5m`),
                            context: msg,
                            status: null,
                            hadiah: h,
                            penantang: sender,
                            ditantang: mentioned[0],
                            TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                        })
                        gameAdd(sender, glimit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
            case prefix+'delttc':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                if (!isPlay(from, sender, tictactoe))return reply('Kamu tidak memiliki sesi TicTacToe')
                tictactoe.splice(getPosTic(from, tictactoe), 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                break
            case prefix+'tebakgambar':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, tebakgambar)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                const petunjuk = result.jawaban.replace(/[a|i|u|e|o]/gi, '_')
                miko.sendButtonImage(from, result.img, [{ buttonId: 'nyerahtg', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\nPetunjuk : ${petunjuk}\n\nWaktu TG : ${gamewaktu}s`, copyright, msg)
                //.then((res) => miko.deleteMessage(from, { id: res.message.imageMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true }))
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, tebakgambar)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'family100':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isfam(from, family100)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json`)
                let random = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahfm', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `*Jawablah Pertanyaan Berikut :*\n${random.soal}\n\nTerdapat *${random.jawaban.length}* Jawaban ${random.jawaban.find(v => v.includes(' ')) ? `(beberapa Jawaban Terdapat Spasi)` : ''}\n\nWaktu FM : ${gamewaktu}s`, copyright, msg)
                let anoh = random.jawaban
                game.addfam(from, anoh, gamewaktu, msg, family100)
                gameAdd(sender, glimit)
            }
                break
            case prefix+'caklontong':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, lontong)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahcl', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${result.soal}*\nWaktu CL : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, lontong)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'tebakkata': case prefix+'tebakata':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, tebakkata)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahtk', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${result.soal}*\nWaktu TK : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, tebakkata)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'tekateki': case prefix+'teka':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, teka)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tekateki.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahtt', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${result.soal}*\nWaktu TT : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, teka)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'tebaklirik':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, tebaklirik)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahtl', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${result.soal}*\nWaktu TL : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, tebaklirik)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'asahotak':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, asahotak)) return reply(`Masih ada soal yang belum di selesaikan`)
                let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/asahotak.json')
                let result = anu[Math.floor(Math.random() * anu.length)]
                miko.sendButtonText(from, [{ buttonId: 'nyerahao', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${result.soal}*\nWaktu AO : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                let anih = result.jawaban.toLowerCase()
                game.addgambar(from, anih, gamewaktu, msg, asahotak)
                gameAdd(sender, glimit)
                }  
                break
            case prefix+'kuismath':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, kuismath)) return reply(`Masih ada soal yang belum di selesaikan`)
                let { genMath, modes, pickRandom } = require('../lib/math')
                if (args.length < 2) return miko.sendButtonText(from, [{ buttonId: prefix+'kuismath easy', buttonText: { displayText: 'Easy' }, type: 1 }, { buttonId: '.kuismath medium', buttonText: { displayText: 'Medium' }, type: 1 }, { buttonId: prefix+'kuismath hard', buttonText: { displayText: 'Hard' }, type: 1 }], `Penggunaan ${command} ${Object.keys(modes).join(' | ')}\n\nContoh : ${command} easy\n*Atau bisa juga menekan tombol dibawah...*`, copyright, msg)
                let result = await genMath(args[1].toLowerCase())
                miko.sendButtonText(from, [{ buttonId: 'nyerahkm', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nWaktu KM : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                game.addgambar(from, result.jawaban, gamewaktu, msg, kuismath)
                gameAdd(sender, glimit)
                }
                break
            case prefix+'kuiswibu':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (game.isTebakGambar(from, kuiswibu)) return reply(`Masih ada soal yang belum di selesaikan`)
                let res = pickRandom(teswibu)
                miko.sendButtonText(from, [{ buttonId: 'nyerahkw', buttonText: { displayText: 'Nyerah...' }, type: 1 }], `Silahkan jawab soal berikut ini\n\n*${res.q}*\nPilihan\n${res.o.map((v, i) => `${i + 1}. *${v}*`).join('\n')}\nWaktu KW : ${gamewaktu}s\n\nJika ingin menyerah, klik button dibawah`, copyright, msg)
                game.addgambar(from, res.a, gamewaktu, msg, kuiswibu)
                gameAdd(sender, glimit)
                }
                break
            case "nyerahtg":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, tebakgambar)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'tebakgambar', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, tebakgambar)}`, copyright, msg)
                tebakgambar.splice(game.getTGPosi(from, tebakgambar), 1)
                }
                break
            case "nyerahcl":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, lontong)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'caklontong', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, lontong)}`, copyright, msg)
                lontong.splice(game.getTGPosi(from, lontong), 1)
                }
                break
            case "nyerahtk":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, tebakkata)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'tebakkata', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, tebakkata)}`, copyright, msg)
                tebakkata.splice(game.getTGPosi(from, tebakkata), 1)
                }
                break
            case "nyerahtt":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, teka)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'teka', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, teka)}`, copyright, msg)
                teka.splice(game.getTGPosi(from, teka), 1)
                }
                break
            case "nyerahtl":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, tebaklirik)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'tebaklirik', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, tebaklirik)}`, copyright, msg)
                tebaklirik.splice(game.getTGPosi(from, tebaklirik), 1)
                }
                break
            case "nyerahkm":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, kuismath)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'kuismath', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, kuismath)}`, copyright, msg)
                kuismath.splice(game.getTGPosi(from, kuismath), 1)
                }
                break
            case "nyerahkw":{
                  if (!isButton) return
                if (!game.isTebakGambar(from, kuiswibu)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'kuiswibu', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getJawabanTG(from, kuiswibu)}`, copyright, msg)
                kuiswibu.splice(game.getTGPosi(from, kuiswibu), 1)
                }
                break
            case "nyerahfm":{
                  if (!isButton) return
                if (!game.isfam(from, family100)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'family100', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getjawaban100(from, family100)}`, copyright, msg)
                family100.splice(game.getfamposi(from, family100), 1)
                }
                break
            case "nyerahao":{
                if (!isButton) return
                if (!game.isfam(from, asahotak)) return reply(`Soal sudah di selesaikan`)
                miko.sendButtonText(from, [{ buttonId: prefix+'asahotak', buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Jawaban :*\n${game.getjawaban100(from, asahotak)}`, copyright, msg)
                asahotak.splice(game.getTGPosi(from, asahotak), 1)
                }
                break
            case prefix+'suit':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
            this.suit = this.suit ? this.suit : {}
            let poin = 10
            let poin_lose = 10
            let timeout = 60000
            if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.dari].includes(from))) return reply(`Sedang Ada Sesi Suit Di Grup Ini`)
	        if (mentioned.length !== 0 && mentioned[0] === sender) return reply(`Tidak bisa bermain dengan diri sendiri!`)
	        if (mentioned.length !== 0 && mentioned[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
            if (mentioned.length !== 0 && blocked.includes(mentioned[0])) return reply(`User tersebut telah diblokir!\nBermainlah dengan yang lain`)
            if (!mentioned[0]) return reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya...`)
            if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(mentioned[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain`
            await gameAdd(sender, glimit)
            let id = 'suit_' + new Date() * 1
            let caption = `_*SUIT PvP*_
@${sender.split`@`[0]} menantang @${mentioned[0].split`@`[0]} untuk bermain suit
Silahkan @${mentioned[0].split`@`[0]} untuk ketik terima/tolak`
            this.suit[id] = {
            chat: await reply(caption),
            id: id,
            p: sender,
            p2: mentioned[0],
            dari: from,
            status: 'wait',
            waktu: setTimeout(() => {
            if (this.suit[id]) reply(`_Waktu suit habis_`)
            delete this.suit[id]
            }, 60000), poin, poin_lose, timeout
            }
                break
            case prefix+'slot':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (args.length < 2 || isNaN(args[1])) return reply(`Penggunaan: ${command} [angka]\nContoh: ${command} 100 *artinya kamu bertaruh 100 XP.*\n\n*JACKPOT:* taruhan kamu digandakan\n*Kurang beruntung:* +1 XP\n*Kalah:* taruhan kamu diambil`.trim())
                if (nebal(args[1]) == 0) return reply('Nominal min. 1')
                if (getBalance(sender, balance) <= args[1]) return reply(`Balance kamu tidak cukup`)
                let wslot = game.cekWaktuSlot(sender, slot) + 10000
                if (new Date - game.cekWaktuSlot(sender, slot) < 10000) return reply(`Tunggu selama ${msToTime(wslot - new Date())}`)
                let emojis = ["🏆️", "🥇", "💵"]
                let a = Math.floor(Math.random() * emojis.length)
                let b = Math.floor(Math.random() * emojis.length)
                let c = Math.floor(Math.random() * emojis.length)
                let x = [],
                    y = [],
                    z = []
                for (let i = 0; i < 3; i++) {
                    x[i] = emojis[a]
                    a++
                    if (a == emojis.length) a = 0
                }
                for (let i = 0; i < 3; i++) {
                    y[i] = emojis[b]
                    b++
                    if (b == emojis.length) b = 0
                }
                for (let i = 0; i < 3; i++) {
                    z[i] = emojis[c]
                    c++
                    if (c == emojis.length) c = 0
                }
                let res = getBalance(sender, balance) <= nebal(args[1]) ? nebal(args[1]) : nebal(args[1]) + (nebal(args[1])/2)
                let end
                if (a == b && b == c) {
                    let jackpot = res * 5
                    end = `*JACKPOT!*\nBjir coeg gg luwh banj\n\n*+${jackpot} XP*`
                    addBalance(sender, jackpot, balance)
                } else if (a == b || a == c || b == c) {
                    end = `Noob lo deck\n\n*-${res} XP*`
                    kurangBalance(sender, res, balance)
                } else {
                    end = `Noob lo deck\n\n*-${res} XP*`
                    kurangBalance(sender, res, balance)
                }
                game.addSlot(sender, new Date * 1, slot)
                miko.sendButtonText(from, [{ buttonId: prefix+`slot ${args[1]}`, buttonText: { displayText: `Slot ${args[1]}` }, type: 1 }, { buttonId: prefix+`balance`, buttonText: { displayText: `Cek Balance` }, type: 1 }], `*[ 🎰 | SLOTS ]*\n\n${end}\n\n${x[0]} ${y[0]} ${z[0]}\n${x[1]} ${y[1]} ${z[1]}\n${x[2]} ${y[2]} ${z[2]}`, copyright, msg)
                await gameAdd(sender, glimit)
                }
                break
            case prefix+'truth': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
					fetchTxt('https://raw.githubusercontent.com/VideFrelan/words/main/truth.txt')
                    .then((res) => {
                    const tod = res.split('\n')
                    const randomTod = tod[Math.floor(Math.random() * tod.length)]
                    miko.sendButtonText(from, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], 'Truth:\n\n' + `${randomTod}`, copyright, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(jsonformat(err)))
                }
                break
            case prefix+'dare':{
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
					fetchTxt('https://raw.githubusercontent.com/VideFrelan/words/main/dare.txt')
                    .then((res) => {
                    const tod = res.split('\n')
                    const randomTod = tod[Math.floor(Math.random() * tod.length)]
                    miko.sendButtonText(from, [{buttonId: command, buttonText: { displayText: 'Next' }, type: 1 }], 'Dare:\n\n' + `${randomTod}`, copyright, msg)
                    limitAdd(sender, isPremium, isOwner, limit)
                    })
                    .catch((err) => reply(jsonformat(err)))
                }
                break
//------------------< Database >-------------------
                case prefix+'setcmd': {
                    if (!isQuotedSticker) reply(`Reply Sticker`)
                    if (!quotedMsg.stickerMessage.fileSha256) reply(`SHA256 Hash Missing`)
                    if (!args[1]) reply(`Untuk Command Apa?`)
                    if (!args[1].startsWith(prefix)) return reply(`Harus diawali dengan prefix\n\nContoh:\n${command} ${prefix}help`)
                    if (isStcCmd(args[1], stc)) reply(`Command sudah terdaftar`)
                    let sha = quotedMsg.stickerMessage.fileSha256.toString('base64')
                    if (isStc(sha, stc)) return reply('Sticker sudah terdaftar')
                    stc.push({
                        cmd: args[1],
                        sha: sha,
                        creator: sender,
                        at: + new Date,
                        locked: false,
                    })
                    fs.writeFileSync('./database/stc.json', JSON.stringify(stc))
                    reply(`Done!`)
                }
                break
                case prefix+'delcmd': {
                    if (!isQuotedSticker) reply(`Reply Sticker`)
                    if (!quotedMsg.stickerMessage.fileSha256) reply(`SHA256 Hash Missing`)
                    let sha = quotedMsg.stickerMessage.fileSha256.toString('base64')
                    if (!isStc(sha, stc)) return reply('Sticker belum terdaftar')
                    if (isLocked(sha, stc)) return reply('You have no permission to change this sticker command')
                    stc.splice(getPosiStc(sha, stc), 1)
                    fs.writeFileSync('./database/stc.json', JSON.stringify(stc))
                    reply(`Done!`)
                }
                break
                case prefix+'lockcmd': {
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (!isQuotedSticker) reply(`Reply Sticker`)
                    if (!quotedMsg.stickerMessage.fileSha256) reply(`SHA256 Hash Missing`)
                    let sha = quotedMsg.stickerMessage.fileSha256.toString('base64')
                    if (!isStc(sha, stc)) return reply('Sticker belum terdaftar')
                    if (isLocked(sha, stc)) return reply('Stiker sudah dikunci')
                    await lockingStc(sha, stc)
                    reply(`Done!`)
                }
                break
                case prefix+'unlockcmd': {
                    if (!isOwner) return reply(mess.OnlyOwner)
                    if (!isQuotedSticker) reply(`Reply Sticker`)
                    if (!quotedMsg.stickerMessage.fileSha256) reply(`SHA256 Hash Missing`)
                    let sha = quotedMsg.stickerMessage.fileSha256.toString('base64')
                    if (!isStc(sha, stc)) return reply('Sticker belum terdaftar')
                    if (!isLocked(sha, stc)) return reply('Stiker belum dikunci')
                    await unLockingStc(sha, stc)
                    reply(`Done!`)
                }
                break
                case prefix+'listcmd': {
                    let teks = `*LIST CMD*
Info: *bold* hash is Locked

${Object.entries(stc).map(([key, value], index) => `${index + 1}. ${value.locked ? `*${value.cmd}*` : value.cmd}\nFrom : *@${value.creator.split("@")[0]}*\nAt : *${moment(value.at).format("H:m/D-M-Y")}*`).join('\n')}
`.trim()
                    reply(teks)
                }
                break
//------------------< Anonymous >-------------------
            case prefix+'anonymous': {
                if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
				this.anonymous = this.anonymous ? this.anonymous : {}
				let buttons = [
                    { buttonId: prefix+'start', buttonText: { displayText: 'Start' }, type: 1 }
                ]
                miko.sendButtonText(from, buttons, `\`\`\`Hi ${pushname} Welcome To Anonymous Chat\n\nKlik Button Dibawah Ini Untuk Mencari Partner\`\`\``, copyright, msg)
            }
			break
            case prefix+'keluar': case prefix+'leave': {
                if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
                this.anonymous = this.anonymous ? this.anonymous : {}
                let room = Object.values(this.anonymous).find(room => room.check(sender))
                if (!room) {
                    let buttons = [
                        { buttonId: prefix+'start', buttonText: { displayText: 'Start' }, type: 1 }
                    ]
                    await miko.sendButtonText(from, buttons, `\`\`\`Kamu Sedang Tidak Berada Di Sesi Anonymous, Tekan Button Untuk Mencari Partner \`\`\``)
                    throw false
                }
                reply('\`\`\`Kamu Telah Meninggalkan Sesi Anonymous\`\`\`')
                let other = room.other(sender)
                if (other) await miko.sendText(other, `\`\`\`Partner Telah Meninggalkan Sesi Anonymous\`\`\``, msg)
                delete this.anonymous[room.id]
            }
            break
            case prefix+'mulai': case prefix+'start': {
                if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
                this.anonymous = this.anonymous ? this.anonymous : {}
                if (Object.values(this.anonymous).find(room => room.check(sender))) {
                    let buttons = [
                        { buttonId: prefix+'keluar', buttonText: { displayText: 'Stop' }, type: 1 }
                    ]
                    await miko.sendButtonText(from, buttons, `\`\`\`Kamu Masih Berada Di dalam Sesi Anonymous, Tekan Button Dibawah Ini Untuk Menghentikan Sesi Anonymous Anda\`\`\``, copyright, msg)
                    throw false
                }
                let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(sender))
                if (room) {
                    let buttons = [
                        { buttonId: prefix+'next', buttonText: { displayText: 'Skip' }, type: 1 },
                        { buttonId: prefix+'keluar', buttonText: { displayText: 'Stop' }, type: 1 }
                    ]
                    await miko.sendButtonText(rooa, buttons, `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``, copyright, msg)
                    roob = sender
                    room.state = 'CHATTING'
                    await miko.sendButtonText(roob, buttons, `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``, copyright, msg)
                } else {
                    let id = + new Date
                    this.anonymous[id] = {
                        id,
                        a: sender,
                        b: '',
                        state: 'WAITING',
                        check: function (who = '') {
                            return [this.a, this.b].includes(who)
                        },
                        other: function (who = '') {
                            return who === this.a ? this.b : who === this.b ? this.a : ''
                        },
                    }
                    let buttons = [
                        { buttonId: prefix+'keluar', buttonText: { displayText: 'Stop' }, type: 1 }
                    ]
                    await miko.sendButtonText(from, buttons, `\`\`\`Mohon Tunggu Sedang Mencari Partner\`\`\``, copyright, msg)
                }
            }
            break
            case prefix+'next': case prefix+'lanjut': {
                if (isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
                this.anonymous = this.anonymous ? this.anonymous : {}
                let romeo = Object.values(this.anonymous).find(room => room.check(sender))
                if (!romeo) {
                    let buttons = [
                        { buttonId: prefix+'start', buttonText: { displayText: 'Start' }, type: 1 }
                    ]
                    await miko.sendButtonText(from, buttons, `\`\`\`Kamu Sedang Tidak Berada Di Sesi Anonymous, Tekan Button Untuk Mencari Partner\`\`\``)
                    throw false
                }
                let other = romeo.other(sender)
                if (other) await miko.sendText(other, `\`\`\`Partner Telah Meninggalkan Sesi Anonymous\`\`\``, msg)
                delete this.anonymous[romeo.id]
                let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(sender))
                if (room) {
                    let buttons = [
                        { buttonId: prefix+'next', buttonText: { displayText: 'Skip' }, type: 1 },
                        { buttonId: prefix+'keluar', buttonText: { displayText: 'Stop' }, type: 1 }
                    ]
                    await miko.sendButtonText(rooa, buttons, `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``, copyright, msg)
                    roob = sender
                    room.state = 'CHATTING'
                    await miko.sendButtonText(roob, buttons, `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``, copyright, msg)
                } else {
                    let id = + new Date
                    this.anonymous[id] = {
                        id,
                        a: sender,
                        b: '',
                        state: 'WAITING',
                        check: function (who = '') {
                            return [this.a, this.b].includes(who)
                        },
                        other: function (who = '') {
                            return who === this.a ? this.b : who === this.b ? this.a : ''
                        },
                    }
                    let buttons = [
                        { buttonId: prefix+'keluar', buttonText: { displayText: 'Stop' }, type: 1 }
                    ]
                    await miko.sendButtonText(from, buttons, `\`\`\`Mohon Tunggu Sedang Mencari Partner\`\`\``, copyright, msg)
                }
            }
            break
//------------------< Owner >-------------------
            case prefix+'setppbot':{
                if (!isOwner) return reply(mess.OnlyOwner)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    miko.updateProfilePicture(miko.user.jid, media)
                    .then((res) => reply(jsonformat(res)))
					.catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim gambar atau reply gambar dengan caption ${command}`)
                }
            }
                break
            case prefix+'setname':{
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} Miko Bot`)
                miko.updateProfileName(q)
                .then((res) => reply(jsonformat(res)))
				.catch((err) => reply(jsonformat(err)))
            }
                break
            case prefix+'setbio':{
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} nama\n\nContoh : ${command} Miko Bot`)
                miko.setStatus(q)
                .then((res) => reply(jsonformat(res)))
				.catch((err) => reply(jsonformat(err)))
            }
                break
            case prefix+'self':{
                if (!isOwner) return reply(mess.OnlyOwner)
                mode = 'self'
                reply('Berhasil berubah ke mode self')
            }
                break
            case prefix+'public':{
                if (!isOwner) return reply(mess.OnlyOwner)
                mode = 'public'
                reply('Berhasil berubah ke mode public')
            }
                break
          case prefix+'mute':
                if (!isOwner) return reply(mess.OnlyOwner)
                mute.push(from)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot telah dimute di group ini`)
                break
          case prefix+'unmute':
                if (!isOwner) return reply(mess.OnlyOwner)
                let anu = mute.indexOf(from)
                mute.splice(anu, 1)
                fs.writeFileSync('./database/mute.json', JSON.stringify(mute))
                reply(`Bot telah diunmute di group ini`)
                break
            case prefix+'clearall':{
                if (!isOwner) return reply(mess.OnlyOwner)
                let chiit = await miko.chats.all()
                for (let i of chiit){
                    i.jid.endsWith('@g.us') ? miko.modifyChat(i.jid, 'clear', { includeStarred: false }) : miko.modifyChat(i.jid, 'delete')
                  }
                }
                break
            case prefix+'setprefix':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan prefix\nOptions :\n=> multi`)
                if (q === 'multi'){
                    multi = true
                    reply(`Berhasil mengubah prefix ke ${q}`)
                } else {
                    multi = false
                    prefa = `${q}`
                    reply(`Berhasil mengubah prefix ke ${q}`)
                }
                break
            case prefix+'setthumb':
                if (!isOwner) return reply(mess.OnlyOwner)
                    if (!isQuotedImage) return reply('Reply imagenya blokk!')
                    const messimagethumb = JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await miko.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`${setting.pathImg}`)
                    await sleep(2000)
                    fs.writeFileSync(`${setting.pathImg}`, downiamgethumb)
                    reply('Succes')
                    break
                    
            case prefix+'bc':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan text`)
                let chiit = await miko.chats.all()
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        miko.sendMessage(i.jid, media, image, {caption: q})
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    for (let i of chiit){
                        miko.sendMessage(i.jid, media, video, {caption: q})
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiit){
                        sendMess(i.jid, `*Miko Boardcast*\n\n${q}`)
                    }
                    reply(`Sukses`)
                }
                break
            case prefix+'reset':
                if (!isOwner) return reply(mess.OnlyOwner)
                console.log('Resetting user\'s limit...')
                limit.splice(0)
                    fs.writeFileSync('./database/limit.json', JSON.stringify(limit))
                glimit.splice(0)
                    fs.writeFileSync('./database/glimit.json', JSON.stringify(glimit))
                await reply('Succes resetting user\'s limit...')
            break
            case prefix+'restart':
                if (!isOwner) return reply(mess.OnlyOwner)
                pm2.restart('main', (err) => {
                  if (err) return reply(`Err: ${err}`)
                  })
                reply('Succes')
            break
            case prefix+'caripesan':
                if (!isOwner) return reply(mess.OnlyOwner)
                if (args.length < 2) return reply(`Masukkan pesan yang ingin dicari\n\nPenggunaan: ${command} hallo`)
                let v = await miko.searchMessages(q, from, 10, 1)
                let s = v.messages
                let el = s.filter(v => v.message)
                el.shift()
                try {
                if(el[0].message.conversation == undefined) return
                reply(`Ditemukan ${el.length} pesan`)
                await sleep(3000)
                for(let i = 0; i < el.length; i++) {
                await miko.sendMessage(from,'Nih pesannya', text, {quoted:el[i]})
                }
                } catch(e){
                reply('Pesan tidak ditemukan!')
                }           
            break
            case prefix+'speedtest': {
              if (!isOwner) return reply(mess.OnlyOwner)
                reply('Testing Speed...')
                let cp = require('child_process')
                let { promisify } = require('util')
                let exec = promisify(cp.exec).bind(cp)
              let o
              try {
              o = await exec('python speed.py')
              } catch (e) {
              o = e
             } finally {
            let { stdout, stderr } = o
            if (stdout.trim()) reply(`${stdout}`)
            if (stderr.trim()) reply(`${stderr}`)
                }
                }
            break
            case prefix+'colong': {
              if (!isOwner) return reply(mess.OnlyOwner)
              if (isQuotedSticker) {
                let encmedia = JSON.parse(JSON.stringify(msg).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				    let media = await miko.downloadAndSaveMediaMessage(encmedia, `./sticker/${sender}`)
					reply(mess.wait)
                    exec(`webpmux -set exif ./sticker/owner.exif ./sticker/${sender}.webp -o ./sticker/${sender}.webp`, async (error) => {
                        if (error) return reply(mess.error.api)
                        miko.sendMessage(from, fs.readFileSync(`./sticker/${sender}.webp`), sticker, {quoted: msg})
                        fs.unlinkSync(media)
                    })
              } else {
                reply('Reply stiker')
              }
            }
            break
            case prefix+'retrieve': {
              if (!isOwner) return reply(mess.OnlyOwner)
              if (isQuotedMsg && quotedMsg.type === 'viewOnceMessage') {
                    // let encmedia = WAMessageProto.Message.fromObject({
                    //     ...quotedMsg
                    // })
				    // let media = await miko.prepareMessageFromContent(from, encmedia, {
                    //     quoted: msg
                    // });
					// await miko.relayWAMessage(media);
                    await miko.copyNForward(from, await miko.loadMessage(from, quotedMsg.id), false, { readViewOnce: true})
              } else {
                reply('Reply viewOnceMessage')
              }
            }
            break
//------------------< GROUP >-------------------
            case prefix+'delete':
			case prefix+'del':
			case prefix+'d':
                if (!isOwner) {
				if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
				if (!isGroupAdmins)return reply(mess.GrupAdmin)
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
				miko.deleteMessage(from, { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
            } else {
                    if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                    if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
				    miko.deleteMessage(from, { id: msg.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
                }
                break
            case prefix+'afk':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (isAfkOn) return reply('Afk sudah diaktifkan sebelumnya')
                if (q.slice(150)) return reply('Alasan lu kepanjangan')
                let reason = q ? `\n\nAlasan : ${q}` : ''
                mentions(`@${sender.split('@')[0]} sedang AFK ${reason}`, [sender], true)
                await sleep(5000)
                afk.addAfkUser(sender, Date.now(), q ? q : '', _afk)
                break
            case prefix+'groupinfo': case prefix+'grupinfo':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                try {
                    var pic = await miko.getProfilePicture(from)
                } catch {
                    var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                }
                let ingfo = `*G R O U P I N F O*\n\n*Name :* ${groupName}\n*ID Grup :* ${from}\n*Dibuat :* ${moment(`${groupMetadata.creation}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Owner Grup :* @${groupMetadata.owner.split('@')[0]}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Peserta :* ${groupMembers.length}\n*Welcome :* ${isWelcome ? 'Aktif' : 'Mati'}\n*Left :* ${isLeft ? 'Aktif' : 'Mati'}\n*Desc :* \n${groupMetadata.desc}`
                miko.sendMessage(from, await getBuffer(pic), image, {quoted: msg, caption: ingfo, contextInfo: {"mentionedJid": [groupMetadata.owner.replace('@c.us', '@s.whatsapp.net')]}})
                break
            case prefix+'grouplist': case prefix+'gruplist': {
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                let gc = miko.chats.all().filter(v => v.jid.endsWith('g.us'))
                let txt = gc.map(v => `*${miko.getName(v.jid)}*\n${v.jid} [${v.read_only ? 'Keluar' : 'Masuk'}]`).join`\n\n`
                reply(`Total : *${gc.length} Grup*\nDaftar Grup :\n\n${txt}`)
                }
                break
            case prefix+'add':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
				if (isQuotedMsg && args.length < 2) {
                    miko.groupAdd(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (args.length < 3 && !isNaN(args[1])){
					miko.groupAdd(from, [args[1] + '@s.whatsapp.net'])
					.then((res) => reply(jsonformat(res)))
					.catch((err) => reply(jsonformat(err)))
				} else {
					reply()
				}
                break
            case prefix+'kick':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    if (!mentioned.includes(botNumber) && !mentioned.includes(ownerNumber)) {
                    miko.groupRemove(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                  } else {
                    await reply("Not Premited!")
                  }
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    if (quotedMsg.sender === botNumber) return reply(`Tidak bisa kick nomor Bot`)
                    miko.groupRemove(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    miko.groupRemove(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}kick @tag atau nomor atau reply pesan orang yang ingin di kick`)
                }
                break
            case prefix+'promote':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    miko.groupMakeAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    miko.groupMakeAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    miko.groupMakeAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}promote @tag atau nomor atau reply pesan orang yang ingin di promote`)
                }
                break
            case prefix+'demote':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (mentioned.length !== 0){
                    miko.groupDemoteAdmin(from, mentioned)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (isQuotedMsg) {
                    if (quotedMsg.sender === ownerNumber) return reply(`Tidak bisa kick Owner`)
                    miko.groupDemoteAdmin(from, [quotedMsg.sender])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else if (!isNaN(args[1])) {
                    miko.groupDemoteAdmin(from, [args[1] + '@s.whatsapp.net'])
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim perintah ${prefix}demote @tag atau nomor atau reply pesan orang yang ingin di demote`)
                }
                break
            case prefix+'linkgc': case prefix+'linkgrup': case prefix+'linkgroup':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (!isGroupAdmins) return reply(mess.GrupAdmin)
                miko.groupInviteCode(from)
                .then((res) => reply('https://chat.whatsapp.com/' + res))
                break
            case prefix+'leave':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                reply('bye...')
                .then(() => miko.groupLeave(from))
                break
            case prefix+'setdesc':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setdesc desc`)
                miko.groupUpdateDescription(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'setgrupname':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (args.length === 1) return reply(`Penggunaan ${prefix}setgrupname name`)
                miko.groupUpdateSubject(from, q)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'reader':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isQuotedMsg) return reply(`Reply pesan dari bot`)
                if (!quotedMsg.fromMe) return reply(`Reply pesan dari bot`)
                    miko.messageInfo(from, msg.message.extendedTextMessage.contextInfo.stanzaId)
                    .then((res) => {
                        let anu = []
                        let txt = `*Info Chat*\n\n`
                        for (let i = 0; i < res.reads.length; i++){
                            anu.push(res.reads[i].jid)
                            txt += `@${res.reads[i].jid.split("@")[0]}\n`
                            txt += `Waktu membaca : ${moment(`${res.reads[i].t}` * 1000).tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n\n`
                        }
                        mentions(txt, anu, true)
                    })
                    .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'opengrup':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                miko.groupSettingChange(from, "announcement", false)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'closegrup':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                miko.groupSettingChange(from, "announcement", true)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                break
            case prefix+'setppgrup':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                if (!isBotGroupAdmins) return reply(mess.BotAdmin)
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(msg).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : msg
                    let media = await miko.downloadMediaMessage(encmedia)
                    miko.updateProfilePicture(from, media)
                    .then((res) => reply(jsonformat(res)))
                    .catch((err) => reply(jsonformat(err)))
                } else {
                    reply(`Kirim atau tag gambar dengan caption ${prefix}setppgrup`)
                }
                break
            case prefix+'join':
                if (!isPremium) return miko.sendButtonText(from, [{ buttonId: prefix+'sewa', buttonText: { displayText: 'Buy Premium' }, type: 1 }], mess.OnlyPrem, copyright, msg)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[1]) && !args[1].includes('chat.whatsapp.com')) return reply(mess.error.Iv)
                let code = args[1].replace('https://chat.whatsapp.com/', '')
                miko.acceptInvite(code)
                .then((res) => reply(jsonformat(res)))
                .catch((err) => reply(jsonformat(err)))
                sendMess(setting.ownerNumber, `${sender.split("@")[0]} invite to group\n\n${args[1]}`)
                break
            case prefix+'tagall':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner)return reply(mess.GrupAdmin)
                let arr = [];
                let txti = `*[ TAG ALL ]*\n\n${q ? `${q}\n\n` : ''}`
                for (let i of groupMembers){
                    txti += `=> @${i.jid.split("@")[0]}\n`
                    arr.push(i.jid)
                }
                mentions(txti, arr, true)
                break
            case prefix+'voting':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (isVote(from, voting)) return reply('Sesi Voting Sedang Berlangsung Di Grup Ini')
                if (args.length === 1) return reply(`Penggunaan *${command} [teks]*`)
                miko.sendButtonText(from, [{ buttonId: 'vote', buttonText: { displayText: 'Vote' }, type: 1 }, { buttonId: 'devote', buttonText: { displayText: 'Devote' }, type: 1 }], `「 *VOTING DIMULAI* 」

Alasan: ${q}

Tips:
*${prefix}cekvote* - untuk mengecek vote
*${prefix}delvote* - untuk menghapus vote`, copyright, msg)
                addVote(from, q, voting)
                break
            case prefix+'delvote': {
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isVote(from, voting)) return reply('Tidak Ada Sesi Voting Yang Berlangsung Di Grup Ini/Voting Sudah Berakhir')
                let voted = JSON.parse(fs.readFileSync(`./database/vote/${from}.json`))
                let vote = JSON.parse(fs.readFileSync(`./database/vote/vote_${from}.json`))
                let devote = JSON.parse(fs.readFileSync(`./database/vote/devote_${from}.json`))
                let _vote = `Sukses Menghapus sesi Voting Di Grup Ini`
                if (voted.length > 0) {
                  _vote += `\n\nHasil : *Jumlah pengguna yang memilih ${vote.length > devote.length ? 'Vote' : 'Devote'} lebih banyak*`
                } else {
                  _vote += `\n\nHasil : *Belum ada hasil* `
                }
                reply(_vote)
                delVote(from, voting)
            }
            break
            case prefix+'cekvote':{
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (!isVote(from, voting)) return reply('Tidak Ada Sesi Voting Yang Berlangsung Di Grup Ini/Voting Sudah Berakhir')
                let vote = JSON.parse(fs.readFileSync(`./database/vote/vote_${from}.json`))
                let devote = JSON.parse(fs.readFileSync(`./database/vote/devote_${from}.json`))
                let voted = JSON.parse(fs.readFileSync(`./database/vote/${from}.json`))
                let _vote = `「 *VOTING* 」\n\n*Alasan*: ${reasonVote(from, voting)}\n\n*Jumlah Vote* : ${vote.length} Vote\n\n` 
                for(let i = 0; i < vote.length; i++) {
                _vote +=  `- @${vote[i].participant.split('@')[0]}\n- *Vote* : ${vote[i].voting}\n\n`
                } 
                _vote += `*Jumlah Devote* : ${devote.length} Vote\n`
                for(let i = 0; i < devote.length; i++) {
                _vote +=  `- @${devote[i].participant.split('@')[0]}\n- *Vote* : ${devote[i].voting}\n\n`
                }
                if (voted.length > 0) {
                _vote += `\nHasil : *Jumlah pengguna yang memilih ${vote.length > devote.length ? 'Vote' : 'Devote'} lebih banyak*\n`
                } else {
                  _vote += `\nHasil : *Belum ada hasil*\n`
                }
                _vote += `\nTips:\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}delvote* - untuk menghapus vote`
                reply(_vote)
            }
            break
            case prefix+'vote':{
                if (!isButton) return
                if (!isVote(from, voting)) return reply('Tidak Ada Sesi Voting Yang Berlangsung Di Grup Ini/Voting Sudah Berakhir')
                let vote = JSON.parse(fs.readFileSync(`./database/vote/vote_${from}.json`))
                let devote = JSON.parse(fs.readFileSync(`./database/vote/devote_${from}.json`))
                let voted = JSON.parse(fs.readFileSync(`./database/vote/${from}.json`))
                if(voted.includes(sender)) {
                return miko.sendButtonText(from, [{ buttonId: 'vote', buttonText: { displayText: 'Vote' }, type: 1 }, { buttonId: 'devote', buttonText: { displayText: 'Devote' }, type: 1 }], `@${sender.split('@')[0]} kamu sudah vote\n\nTips:\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}delvote* - untuk menghapus vote`, copyright, msg)
                } else {
                vote.push({
                    participant: sender,
                    voting: '✅'
                })
                voted.push(sender)
                fs.writeFileSync(`./database/vote/vote_${from}.json`, JSON.stringify(vote))
                fs.writeFileSync(`./database/vote/${from}.json`, JSON.stringify(voted))
                let _vote = `「 *VOTING* 」\n\n*Alasan*: ${reasonVote(from, voting)}\n\n*Jumlah Vote* : ${vote.length} Vote\n` 
                for(let i = 0; i < vote.length; i++) {
                _vote +=  `- @${vote[i].participant.split('@')[0]}\n- *Vote* : ${vote[i].voting}\n\n`
                } 
                _vote += `*Jumlah Devote* : ${devote.length} Vote\n`
                for(let i = 0; i < devote.length; i++) {
                _vote +=  `- @${devote[i].participant.split('@')[0]}\n- *Vote* : ${devote[i].voting}\n\n`
                }
                _vote += `\nHasil : *Jumlah pengguna yang memilih ${vote.length > devote.length ? 'Vote' : 'Devote'} lebih banyak*\n`
                _vote += `\nTips:\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}delvote* - untuk menghapus vote`
                miko.sendButtonText(from, [{ buttonId: 'vote', buttonText: { displayText: 'Vote' }, type: 1 }, { buttonId: 'devote', buttonText: { displayText: 'Devote' }, type: 1 }], _vote, copyright, msg)
                }
            }
            break
            case prefix+'devote':{
                if (!isButton) return
                if (!isVote(from, voting)) return reply('Tidak Ada Sesi Voting Yang Berlangsung Di Grup Ini/Voting Sudah Berakhir')
                let vote = JSON.parse(fs.readFileSync(`./database/vote/vote_${from}.json`))
                let devote = JSON.parse(fs.readFileSync(`./database/vote/devote_${from}.json`))
                let voted = JSON.parse(fs.readFileSync(`./database/vote/${from}.json`))
                if(voted.includes(sender)) {
                return miko.sendButtonText(from, [{ buttonId: 'vote', buttonText: { displayText: 'Vote' }, type: 1 }, { buttonId: 'devote', buttonText: { displayText: 'Devote' }, type: 1 }], `@${sender.split('@')[0]} kamu sudah vote\n\nTips:\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}delvote* - untuk menghapus vote`, copyright, msg)
                } else {
                devote.push({
                    participant: sender,
                    voting: '❌'
                })
                voted.push(sender)
                fs.writeFileSync(`./database/vote/devote_${from}.json`, JSON.stringify(devote))
                fs.writeFileSync(`./database/vote/${from}.json`, JSON.stringify(voted))
                let _vote = `「 *VOTING* 」\n\n*Alasan*: ${reasonVote(from, voting)}\n\n*Jumlah Vote* : ${vote.length} Vote\n\n` 
                for(let i = 0; i < vote.length; i++) {
                _vote +=  `- @${vote[i].participant.split('@')[0]}\n- *Vote* : ${vote[i].voting}\n\n`
                } 
                _vote += `*Jumlah Devote* : ${devote.length} Devote\n`
                for(let i = 0; i < devote.length; i++) {
                _vote +=  `- @${devote[i].participant.split('@')[0]}\n- *Vote* : ${devote[i].voting}\n\n`
                }
                _vote += `\nHasil : *Jumlah pengguna yang memilih ${vote.length > devote.length ? 'Vote' : 'Devote'} lebih banyak*\n`
                _vote += `\nTips:\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}delvote* - untuk menghapus vote`
                miko.sendButtonText(from, [{ buttonId: 'vote', buttonText: { displayText: 'Vote' }, type: 1 }, { buttonId: 'devote', buttonText: { displayText: 'Devote' }, type: 1 }], _vote, copyright, msg)
                }
            }
            break
//------------------< Enable / Disable >-------------------
            case prefix+'welcome':
                if (!isGroup) return miko.sendMessage(from, `${mess.OnlyGrup}`, MessageType.text, { quoted: msg, contextInfo: { externalAdReply :{ mediaUrl: '', mediaType: 4, title: 'Miko Channn', body: 'Link Group Miko', thumbnailUrl: 'https://telegra.ph/file/7eda3b4a20234e8c07f83.jpg', sourceUrl: 'https://chat.whatsapp.com/FYPmzeIGJp0L4knbA2gmgy'}}})
                if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                if (args.length === 1) return reply(`Pilih enable atau disable\nContoh : ${prefix}welcome enable`)
                if (args[1].toLowerCase() === 'enable'){
                    if (isWelcome && isLeft) return reply(`Sudah aktif`)
                    welcome.push(from)
					fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    left.push(from)
					fs.writeFileSync('./database/left.json', JSON.stringify(left))
					reply('Welcome dan Left aktif')
                } else if (args[1].toLowerCase() === 'disable'){
                    if (!isWelcome && !isLeft) return reply(`Belum aktif`)
                    let anu = welcome.indexOf(from)
                    welcome.splice(anu, 1)
                    fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome))
                    anu = left.indexOf(from)
                    left.splice(anu, 1)
                    fs.writeFileSync('./database/left.json', JSON.stringify(left))
                    reply('Welcome dan Left nonaktif')
                } else {
                    reply(`Pilih enable atau disable\nContoh : ${prefix}welcome enable`)
                }
                break
                default:
                    if (isCmd && multi && !isSticker && chats !== prefix) {
                        reply(`Perintah *${command}* tidak terdaftar di dalam menu bot`)
                    }
                    if (!fromMe && !isUrl(chats) && !isCmd && !isGroup && !chats.startsWith("> ") && !chats.startsWith("$")) {
                        // reply(`${botMentioned}`)
                        let res = await fetch(global.API('zenz', '/api/simisimi', { text: encodeURIComponent(chats) }, 'apikey'))
                        if (!res.ok) return
                        let json = await res.json()
                        if (json.status !== 'OK' || json.result.message === 'Aku tidak mengerti apa yang kamu katakan.Tolong ajari aku.') return
                        reply(`${json.result.message}`)
                    }
                    if (!isCmd) {
                        this.anonymous = this.anonymous ? this.anonymous : {}
                        let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(sender) && room.state === 'CHATTING')
                        if (room) {
                            if ([prefix+'next', prefix+'leave', prefix+'stop', prefix+'start', 'Cari Partner', 'Keluar', 'Lanjut', 'Stop'].includes(chats)) return
                            let other = [room.a, room.b].find(user => user !== sender)
                            miko.copyNForward(other, chats, true, isQuotedMsg && quotedMsg.fromMe ? {
                                contextInfo: {
                                    ...msg.message.extendedTextMessage.contextInfo,
                                    forwardingScore: 0,
                                    isForwarded: true,
                                    participant: other
                                }
                            } : {})
                        }
                        return !0
                    }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        miko.sendMessage(msg.from, util.format(err), MessageType.text, { quoted: msg })
    }
}