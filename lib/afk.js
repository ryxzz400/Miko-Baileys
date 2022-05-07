const fs = require('fs')

const addAfkUser = (userId, time, reason, _db) => {
    const obj = { id: userId, time: time, reason: reason }
    _db.push(obj)
    fs.writeFileSync('./database/afk.json', JSON.stringify(_db))
}

const checkAfkUser = (userId, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            status = true
        }
    })
    return status
}

const getAfkReason = (userId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _db[position].reason
    }
}

const getAfkTime = (userId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _db[position].time
    }
}

const getAfkId = (userId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _db[position].id
    }
}

const getAfkPosition = (userId, _db) => {
    let position = null
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

module.exports = {
    addAfkUser,
    checkAfkUser,
    getAfkReason,
    getAfkTime,
    getAfkId,
    getAfkPosition
}