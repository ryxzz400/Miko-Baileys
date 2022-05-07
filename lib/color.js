const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const mikoLog = (text, color) => {
	return !color ? chalk.yellow('[MIKO] ') + chalk.green(text) : chalk.yellow('[MIKO] ') + chalk.keyword(color)(text)
}

module.exports = {
	color,
	bgcolor,
	mikoLog
}
