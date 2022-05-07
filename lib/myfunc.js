"use strict";
const axios = require("axios");
const fetch = require('node-fetch');
const FileType = require('file-type');
const { MessageType, WAMessageProto } = require("@adiwajshing/baileys");
const fs = require("fs");
const PhoneNumber = require("awesome-phonenumber")

let setting = JSON.parse(fs.readFileSync('./config.json'));

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}
exports.getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

exports.getGroupAdmins = function(participants){
    let admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

/**
 * Fetch Text from Url
 *
 * @param {String} url
 * @param {Object} options
 */

exports.fetchTxt = async(url, options) => {
  return new Promise((resolve, reject) => {
      return fetch(url, options)
          .then(response => response.text())
          .then(text => resolve(text))
          .catch(err => {
              console.error(err)
              reject(err)
          })
  })
}

// Anti-spam
const usedCommandRecently = new Set()

/**
 * Check is number filtered.
 * @param {string} from 
 * @returns {boolean}
 */
exports.isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

/**
 * Add filter to number.
 * @param {string} from 
 */
exports.addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 5000) // 5 seconds delay.
}


exports.WAConnection = _WAConnection => {
    class WAConnection extends _WAConnection {
        constructor(...args) {
            super(...args)
            this.sendFileFromUrl = this.sendFile
        }
        async sendFileFromUrl(from, url, caption, msg, men) {
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
            return this.sendMessage(from, await exports.getBuffer(url), type, {caption: caption, quoted: msg, mimetype: mime, contextInfo: {"mentionedJid": men ? men : []}})
        }

        async rejectIncomingCall(jid, id) {
          const tag = this.generateMessageTag();
          const nodePayload = ['action', 'call', ['call', {
                      'from': this.user.jid,
                      'to': `${jid.split('@')[0]}@s.whatsapp.net`,
                      'id': tag
                  }, [['reject', {
                              'call-id': id,
                              'call-creator': `${jid.split('@')[0]}@s.whatsapp.net`,
                              'count': '0'
                          }, null]]]];
          const response = await this.sendJSON(nodePayload, tag);
          return response;
      }
      
        /**
     * Parses string into mentionedJid(s)
     * @param {String} text
     */
    parseMention(text = '') {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }

       /**
     * getBuffer hehe
     * @param {String|Buffer} path
     */
        async getFile(path) {
      let res
      let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (res = await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
      if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = await FileType.fromBuffer(data) || {
        mime: 'application/octet-stream',
        ext: '.bin'
      }

      return {
        res,
        ...type,
        data
      }
    }
        /**
     * Exact Copy Forward
     * @param {String} jid
     * @param {Object} message
     * @param {Boolean} forceForward
     * @param {Object} options
     */
    async copyNForward(jid, message, forceForward = false, options = {}) {
      let vtype
      if (options.readViewOnce) {
        message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
        vtype = Object.keys(message.message.viewOnceMessage.message)[0]
        delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
        delete message.message.viewOnceMessage.message[vtype].viewOnce
        message.message = {
          ...message.message.viewOnceMessage.message
        }
      }
      let mtype = Object.keys(message.message)[0]
      let content = await this.generateForwardMessageContent(message, forceForward)
      let ctype = Object.keys(content)[0]
      let context = {}
      if (mtype != MessageType.text) context = message.message[mtype].contextInfo
      content[ctype].contextInfo = {
        ...context,
        ...content[ctype].contextInfo
      }
      const waMessage = await this.prepareMessageFromContent(jid, content, options ? {
        ...content[ctype],
        ...options,
        ...(options.contextInfo ? {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo
          }
        } : {})
      } : {})
      await this.relayWAMessage(waMessage)
      return waMessage
    }

     /**
     * Get name from jid
     * @param {String} jid
     * @param {Boolean} withoutContact
     */
    getName(jid, withoutContact = false) {
      withoutContact = this.withoutContact || withoutContact
      let chat
      let v = jid.endsWith('@g.us') ? (chat = this.chats.get(jid) || {}) && chat.metadata || {} : jid === '0@s.whatsapp.net' ? {
        jid,
        vname: 'WhatsApp'
      } : jid === this.user.jid ?
        this.user :
        this.contactAddOrGet(jid)
      return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

        /**
         * Send Contact
         * @param {String} jid 
         * @param {String|Number} number 
         * @param {String} name 
         * @param {Object} quoted 
         * @param {Object} options 
         */
        async sendContact(jid, number, name, quoted, options) {
        // TODO: Business Vcard
        number = number.replace(/[^0-9]/g, '')
        let njid = number + '@s.whatsapp.net'
        let { isBusiness } = await this.isOnWhatsApp(njid) || { isBusiness: false }
        let vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + name + '\n' + 'ORG:Kontak\n' + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' + 'END:VCARD'.trim()
        return await this.sendMessage(jid, {
            displayName: name,
            vcard
        }, MessageType.contact, { quoted, ...options })
        }

        async sendGroupInvite(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject',caption = 'Invitation to join my WhatsApp group', options = {}) {
            let msg = WAMessageProto.Message.fromObject({
              groupInviteMessage: WAMessageProto.GroupInviteMessage.fromObject({
                inviteCode,
                inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                groupJid: jid,
                groupName: groupName ? groupName : this.getName(jid),
                caption
              })
            })
            let message = await this.prepareMessageFromContent(participant, msg, options)
            await this.relayWAMessage(message)
            return message
        }

        async sendText(jid, text, quoted = '', options = {}) {
          return await this.sendMessage(jid, text, MessageType.text, { quoted, ...options })
        }
        
        /**
     * Send Buttons
     * @param {String} jid
     * @param {String} content
     * @param {String} footer
     * @param {String} button1
     * @param {String} row1
     * @param {Object} quoted
     * @param {Object} options
     */
        sendButtonText = (from, buttons = [], content, footer, msg = '') => {
            const button = { contentText: content, footerText: footer, buttons: buttons, headerType: 1 } 
            return this.sendMessage(from, button, MessageType.buttonsMessage, { contextInfo: { mentionedJid: this.parseMention(content + footer)}, quoted: msg})
        }

        /**
     * Send Button with Image
     * @param {String} jid
     * @param {String|Buffer} image
     * @param {String} content
     * @param {String} footer
     * @param {String} button1
     * @param {String} row1
     * @param {String} button2
     * @param {String} row2
     * @param {String} button3
     * @param {String} row3
     * @param {Object} quoted
     * @param {Object} options
     */
        async sendButtonImage(from, image, buttons = [], content, footer, msg = '') {
          let type = await this.getFile(image)
      let { data: file } = type
            return this.sendMessage(from, {
              contentText: content,
        footerText: footer,
        buttons: buttons,
        headerType: 4,
        imageMessage: (await this.prepareMessageMedia(file, MessageType.image, {})).imageMessage
      }, MessageType.buttonsMessage, { contextInfo: { mentionedJid: this.parseMention(content + footer)}, quoted: msg})
    }
    
            /**
     * Send Button with Image
     * @param {String} jid
     * @param {String|Buffer} image
     * @param {String} content
     * @param {String} footer
     * @param {String} button1
     * @param {String} row1
     * @param {String} button2
     * @param {String} row2
     * @param {String} button3
     * @param {String} row3
     * @param {Object} quoted
     * @param {Object} options
     */
        async sendButtonVideo(from, image, buttons = [], content, footer, msg = '') {
          let type = await this.getFile(image)
      let { data: file } = type
            return this.sendMessage(from, {
              contentText: content,
        footerText: footer,
        buttons: buttons,
        headerType: 4,
        videoMessage: (await this.prepareMessageMedia(file, MessageType.video, {})).videoMessage
      }, MessageType.buttonsMessage, { contextInfo: { mentionedJid: this.parseMention(content + footer)}, quoted: msg})
    }

    /**
         * Send Buttons with Location
         * @param {String} jid
         * @param {String|Buffer} image
         * @param {String} content
         * @param {String} footer
         * @param {String} button1
         * @param {String} row1
         * @param {String} button2
         * @param {String} row2
         * @param {String} button3
         * @param {String} row3
         * @param {Object} quoted
         * @param {Object} options
         */
     async sendButtonLoc(from, image, buttons = [], content, footer, msg = '') {
        let type = await this.getFile(image)
        let { data: file } = type
        return await this.sendMessage(from, {
          locationMessage: { jpegThumbnail: file },
          contentText: content,
          footerText: footer,
          buttons: buttons,
          headerType: 6
        }, MessageType.buttonsMessage, { contextInfo: { mentionedJid: this.parseMention(content + footer) }, quoted: msg })
      }
            /**
     * Send Media/File with Automatic Type Specifier
     * @param {String} jid
     * @param {String|Buffer} path
     * @param {String} filename
     * @param {String} caption
     * @param {Object} quoted
     * @param {Boolean} ptt
     * @param {Object} options
     */
    async sendFile(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
        let type = await this.getFile(path)
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
          try { throw { json: JSON.parse(file.toString()) } }
          catch (e) { if (e.json) throw e.json }
        }
        let opt = { filename, caption }
        if (quoted) opt.quoted = quoted
        if (!type) if (options.asDocument) options.asDocument = true
        let mtype = ''
        if (options.asSticker) mtype = MessageType.sticker
        else if (!options.asDocument && !options.type) {
          if (options.force) file = file
          else if (/audio/.test(type.mime)) file = await (ptt ? toPTT : toAudio)(file, type.ext)
          // else if (/video/.test(type.mime)) file = await toVideo(file, type.ext)
          if (/webp/.test(type.mime) && file.length <= 1 << 20) mtype = MessageType.sticker
          else if (/image/.test(type.mime)) mtype = MessageType.image
          else if (/video/.test(type.mime)) {
            try { return await this.sendVideo(jid, file, caption, quoted, { ...opt, ...options }) }
            catch (e) {
              console.error('Error send video using sendVideo, retrying using sendMessage... ', e)
              file = await toVideo(file, type.ext)
              mtype = MessageType.video
            }
          }
          else opt.displayName = opt.caption = filename
          if (options.asGIF && mtype === MessageType.video) mtype = MessageType.gif
          if (/audio/.test(type.mime)) {
            mtype = MessageType.audio
            if (!ptt) opt.mimetype = 'audio/mp4'
            opt.ptt = ptt
          } else if (/pdf/.test(type.ext)) mtype = MessageType.pdf
          else if (!mtype) {
            mtype = MessageType.document
            opt.mimetype = type.mime
          }
        } else {
          mtype = options.type ? options.type : MessageType.document
          opt.mimetype = type.mime
        }
        delete options.asDocument
        delete options.asGIF
        delete options.asSticker
        delete options.type
        if (mtype === MessageType.document) opt.title = filename
        if (mtype === MessageType.sticker || !opt.caption) delete opt.caption
        return await this.sendMessage(jid, file, mtype, { ...opt, ...options })
        }

        sendImage (from, buffer, capt = '', msg = '', men = []) {
            return this.sendMessage(from, buffer, MessageType.image, {caption: capt, quoted: msg, contextInfo: {"mentionedJid": men}})
        }

        sendVideo (from, buffer, capt = '', msg = '', men = []) {
            return this.sendMessage(from, buffer, MessageType.video, {caption: capt, quoted: msg, contextInfo: {"mentionedJid": men}})
        }

        textImg (from, teks, msg = '', buffer = fs.readFileSync(setting.pathImg)) {
            return this.sendMessage(from, teks, Message.text, {quoted: msg, thumbnail: buffer})
        }

        fakeThumb (from, buffer, capt = '', msg = '', fakethumb = fs.readFileSync(setting.pathImg), men = []) {
            let ai = {
                thumbnail: fakethumb ,
                quoted: msg,
                caption: capt,
                contextInfo: {
                    "mentionedJid": men
                }
            }
            return this.sendMessage(from, buffer, MessageType.image, {})
        }

        cekInviteCode(code) {
            return this.query({json: ["query", "invite", code]})
        }

        async getQuotedMsg (msg) {
            if (!msg.isQuotedMsg) return false
            let qi = await this.loadMessage(msg.key.remoteJid, msg.quotedMsg.id)
            return await exports.serialize(this, qi)
        }

        /**
		 * cMod
		 * @param {String} jid 
		 * @param {*} message 
		 * @param {String} text 
		 * @param {String} sender 
		 * @param {*} options 
		 * @returns 
		 */
		cMod(jid, message, text = '', sender = this.user.jid, options = {}) {
			let copy = message.toJSON()
			let mtype = Object.keys(copy.message)[0]
			let isEphemeral = mtype === 'ephemeralMessage'
			if (isEphemeral) {
				mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
			}
			let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
			let content = msg[mtype]
			if (typeof content === 'string') msg[mtype] = text || content
			else if (content.caption) content.caption = text || content.caption
			else if (content.text) content.text = text || content.text
			if (typeof content !== 'string') msg[mtype] = {
				...content,
				...options
			}
			if (copy.participant) sender = copy.participant = sender || copy.participant
			else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
			if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
			else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
			copy.key.remoteJid = jid
			copy.key.fromMe = sender === this.user.jid
			return WAMessageProto.WebMessageInfo.fromObject(copy)
		}

    }
    return WAConnection
}

exports.serialize = (miko, msg) => {
    if (msg.message["ephemeralMessage"]){
        msg.message = msg.message.ephemeralMessage.message
        msg.ephemeralMessage = true
        
    }else{
      msg.ephemeralMessage = false
    }
    msg.isGroup = msg.key.remoteJid.endsWith('@g.us')
    try{
        const berak = Object.keys(msg.message)[0]
        msg.type = berak
    } catch {
        msg.type = null
    }
    try{
        const context = msg.message[msg.type].contextInfo.quotedMessage
        if(context["ephemeralMessage"]){
            msg.quotedMsg = context.ephemeralMessage.message
        }else{
            msg.quotedMsg = context
        }
        msg.isQuotedMsg = true
        msg.quotedMsg.sender = msg.message[msg.type].contextInfo.participant
        msg.quotedMsg.fromMe = msg.quotedMsg.sender === miko.user.jid ? true : false
        msg.quotedMsg.type = Object.keys(msg.quotedMsg)[0]
        let ane = msg.quotedMsg
        msg.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : ""
        msg.quotedMsg.id = msg.message[msg.type].contextInfo.stanzaId
        msg.quotedMsg.isBaileys = msg.quotedMsg.id.startsWith('3EB0') && msg.quotedMsg.id.length === 12
        msg.quotedMsg.fakeObj = WAMessageProto.WebMessageInfo.fromObject({
                key: {
                fromMe: msg.quotedMsg.fromMe,
                remoteJid: msg.quotedMsg.chats,
                id: msg.quotedMsg.id
            },
                message: msg.quotedMsg,
            ...(msg.isGroup ? { participant: msg.quotedMsg.sender } : {})
          })
    }catch{
        msg.quotedMsg = null
        msg.isQuotedMsg = false
    }

    try{
        const mention = msg.isQuotedMsg ? [msg.message[msg.type].contextInfo.participant] : msg.message[msg.type].contextInfo.mentionedJid
        msg.mentioned = mention
    }catch{
        msg.mentioned = []
    }
    
    if (msg.isGroup){
        msg.sender = msg.participant
    }else{
        msg.sender = msg.key.remoteJid
    }
    if (msg.key.fromMe){
        msg.sender = miko.user.jid
    }

    msg.id = msg.key.id
    msg.from = msg.key.remoteJid
    msg.fromMe = msg.key.fromMe
    msg.isBaileys = msg.key.id.startsWith('3EB0') && msg.key.id.length === 12

    const conts = msg.key.fromMe ? miko.user.jid : miko.contacts[msg.sender]
	  msg.pushname = msg.key.fromMe ? miko.user.name : !conts ? '-' : conts.notify || conts.vname || conts.name || '-'   

    msg.chats = (msg.type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (msg.type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (msg.type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (msg.type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (msg.type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ""

    return msg
}

const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${file}`))
	delete require.cache[file]
	require(file)
})