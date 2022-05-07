const fs = require('fs');

const delVote = (_id, _db) => {
    fs.unlinkSync(`./database/vote/vote_${_id}.json`)
    fs.unlinkSync(`./database/vote/devote_${_id}.json`)
    fs.unlinkSync(`./database/vote/${_id}.json`)
    _db.splice(_id, 1)
    fs.writeFileSync('./database/voting.json', JSON.stringify(_db))
}

const addVote = async(_id, _value, _db) => {
    fs.writeFileSync(`./database/vote/vote_${_id}.json`,'[]')
    fs.writeFileSync(`./database/vote/devote_${_id}.json`,'[]')
    fs.writeFileSync(`./database/vote/${_id}.json`,'[]')
    _db.push({
    reason: _value,
    id: _id
    })  
    fs.writeFileSync(`./database/voting.json`, JSON.stringify(_db))
}

const isVote = (chatId, _db) => {
    let status = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            status = true
        }
    })
    return status
}

const reasonVote = (chatId, _db) => {
    let found = false
    Object.keys(_db).forEach((i) => {
        if (_db[i].id === chatId) {
            found = i
        }
    })
    if (found !== false) {
        return _db[found].reason
    }
}

module.exports = {
	delVote,
	addVote,
	isVote,
	reasonVote
}