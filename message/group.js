"use strict";
const {
	MessageType,
	Presence
} = require("@adiwajshing/baileys");
const fs = require("fs");
const knights = require('knights-canvas')
const { sleep } = require("../lib/myfunc");
const { upload } = require('../lib/uploadImage')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let { botName } = setting

module.exports = async(miko, anj, welcome, left) => {
    const isWelcome = welcome.includes(anj.jid)
    const isLeft = left.includes(anj.jid)
    const mdata = await miko.groupMetadata(anj.jid)
    const groupName = mdata.subject

    if (anj.action === 'add'){
        if (anj.participants[0] === miko.user.jid){
            await sleep(5000)
            miko.updatePresence(anj.jid, Presence.composing)
            miko.sendButtonText(anj.jid, [{ buttonId: 'allmenu', buttonText: { displayText: 'All Menu' }, type: 1 }, { buttonId: 'snk', buttonText: { displayText: 'Syarat dan Ketentuan' }, type: 1 }], `Hai aku ${botName}, klik button dibawah untuk menampilkan menu!`, '© Miko Chann')
        } else if (isWelcome){
            try {
                var pic = await miko.getProfilePicture(anj.participants[0])
                var ppgc = await miko.getProfilePicture(anj.jid)
            } catch {
                var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
                var ppgc = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            }
            try {
            pic = await upload(await (await fetch(pic)).buffer())
            ppgc = await upload(await (await fetch(ppgc)).buffer())
            } catch (e) {
            }
            const groupMetadata = await miko.groupMetadata(anj.jid)
            let wel = await new knights.Welcome()
                .setUsername(miko.getName(anj.participants[0]))
                .setGuildName(groupName)
                .setGuildIcon(ppgc)
                .setMemberCount(mdata.participants.length)
                .setAvatar(pic)
                .setBackground("https://i.ibb.co/4YBNyvP/images-76.jpg")
                .toAttachment()
                var teks = `Selamat Datang @${anj.participants[0].split("@")[0]} di group\n *${groupMetadata.subject}*\n\n${groupMetadata.desc || ""}`.trim()
                miko.sendFile(anj.jid, wel.toBuffer(), 'pp.jpg', teks, null, false, {
                contextInfo: {
                  mentionedJid: miko.parseMention(teks)
                }
              })
        }
    } else if (anj.action === 'remove' && isLeft){
        if (anj.participants[0] === miko.user.jid) return
        try {
            var pic = await miko.getProfilePicture(anj.participants[0])
            var ppgc = await miko.getProfilePicture(anj.jid)
        } catch {
            var pic = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
            var ppgc = 'https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png'
        }
        try {
        pic = await upload(await (await fetch(pic)).buffer())
        ppgc = await upload(await (await fetch(ppgc)).buffer())
        } catch (e) {
        }
        let lef = await new knights.Goodbye()
            .setUsername(miko.getName(anj.participants[0]))
            .setGuildName(groupName)
            .setGuildIcon(ppgc)
            .setMemberCount(mdata.participants.length)
            .setAvatar(pic)
            .setBackground("https://i.ibb.co/4YBNyvP/images-76.jpg")
            .toAttachment()
            var teks = `Selamat Tinggal @${anj.participants[0].split("@")[0]}`
            miko.sendFile(anj.jid, lef.toBuffer(), 'pp.jpg', teks, null, false, {
            contextInfo: {
              mentionedJid: miko.parseMention(teks)
            }
          })
    } if (anj.action === 'promote'){
        if (anj.participants[0] === miko.user.jid) return
        miko.sendMessage(anj.jid, `@${anj.participants[0].split('@')[0]} kamu sekarang menjadi admin`.trim(), MessageType.extendedText, { contextInfo: { "mentionedJid": [anj.participants[0]]}})
    } else if (anj.action === 'demote'){
        if (anj.participants[0] === miko.user.jid) return
        miko.sendMessage(anj.jid, `@${anj.participants[0].split('@')[0]} kamu sekarang bukan admin lagi`.trim(), MessageType.extendedText, { contextInfo: {  "mentionedJid": [anj.participants[0]]}})
    }
}