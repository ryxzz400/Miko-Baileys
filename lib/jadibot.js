
let { WAConnection: _WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

let listjadibot = JSON.parse(fs.readFileSync('./database/jadibot.json'));
const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const left = JSON.parse(fs.readFileSync('./database/left.json'));
let myfunc = require('./lib/myfunc')

const jadibot = async(reply,client,id) => {
	let conn = myfunc.WAConnection(_WAConnection)
    conn.logger.level = 'warn'
    conn.version = [2, 2123, 8]
    conn.browserDescription = [ 'jadibot (By Miko Bot)', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Note:*\nQR akan diganti setiap 30 detik'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    conn.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`Sukses Jadi BOT\n\n*Device*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await conn.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    fs.writeFileSync('./database/jadibot.json', JSON.stringify(listjadibot))
    conn.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
          blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })
    conn.on('CB:action,,battery', json => {
        const a = json[2][0][1].value
        const b = json[2][0][1].live
        baterai.baterai = a
        baterai.cas = b
    })
    conn.on('chat-update', async (message) => {
        if (!message.hasNewMessage) return
        if (!message.messages && !message.count) return
        let msg = message.messages.all()[0]
        if (!msg.message) return
        msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
        myfunc.serialize(conn, msg)
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return
        require('../message/miko')(conn, msg, blocked, baterai, welcome, left, message)
    })
}

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close()
	reply('Sukses stop jadibot')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}