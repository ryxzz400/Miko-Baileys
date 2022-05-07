const {
	MessageType,
	Mimetype
} = require("@adiwajshing/baileys");
const toMs = require('ms');

// TEBAK GAMBAR
const addgambar = (chatId, jawaban, expired, msg, _db) => {
    let obi = { id: chatId, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`), msg: msg }
    _db.push(obi)
}
const getJawabanTG = (chatId, _db) => {
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            found = i
        }
    })
    if (found !== false) {
        return _db[found].jawaban
    }
}
const isTebakGambar = (chatId, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            status = true
        }
    })
    return status
}
const cekWaktuTG = (xinz, _dir, copyright, butId) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            xinz.sendButtonText(_dir[position].id, [{ buttonId: butId, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], `*Waktu habis*\n\n*Jawaban :* ${_dir[position].jawaban}`, copyright, _dir[position].msg)
            _dir.splice(position, 1)
        }
    }, 1000)
}
const getTGPosi = (chatId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}
// Family 100
const addfam = (chatId, jawaban, expired, msg, _db) => {
    let obi = { id: chatId, jawaban: jawaban, expired: Date.now() + toMs(`${expired}s`), msg: msg }
    _db.push(obi)
}
const getjawaban100 = (chatId, _db) => {
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            found = i
        }
    })
    if (found !== false) {
        return _db[found].jawaban
    }
}
const isfam = (chatId, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            status = true
        }
    })
    return status
}
const cekWaktuFam = (xinz, _dir, copyright, butId) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            var juwu = `*Waktu habis*\n\n*Jawaban yang belum terjawab :*\n\n`
            aae = _dir[position].jawaban
            for (let i of aae){
                juwu += `${i}\n`
            }
            xinz.sendButtonText(_dir[position].id, [{ buttonId: butId, buttonText: { displayText: 'Bermain Lagi...' }, type: 1 }], juwu, copyright, _dir[position].msg)
            _dir.splice(position, 1)
        }
    }, 1000)
}
const getfamposi = (chatId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === chatId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}
//Slot
const addSlot = (sender, date, _dir) => {
    let obi = { id: sender, waktu: date }
    _dir.push(obi)
}
const cekWaktuSlot = (sender, _db) => {
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === sender) {
            found = i
        }
    })
    if (found !== false) {
        return _db[found].waktu
    }
}
module.exports = {
    addgambar,
    getJawabanTG,
    isTebakGambar,
    cekWaktuTG,
    getTGPosi,
    addfam,
    getjawaban100,
    isfam,
    cekWaktuFam,
    getfamposi,
    addSlot,
    cekWaktuSlot
}
