const fs = require('fs')
const toMs = require('ms')

/**
 * Add premium user.
 * @param {String} userId 
 * @param {String} expired 
 * @param {Object} _dir 
 */
const addWaktuReport = (userId, _dir) => {
    const obj = { id: userId, expired: Date.now() + toMs('1d') }
    _dir.push(obj)
    fs.writeFileSync('./database/report.json', JSON.stringify(_dir))
}

/**
 * Get premium user expire.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
 const cekWaktuReport = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Constantly checking premium.
 * @param {Object} _dir 
 */
 const reportCheck = (_dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            _dir.splice(position, 1)
            fs.writeFileSync('./database/report.json', JSON.stringify(_dir))
        }
    }, 1000)
}

/**
 * Check user is premium.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkReportUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}
module.exports = {
    addWaktuReport,
    cekWaktuReport,
    reportCheck,
    checkReportUser
}