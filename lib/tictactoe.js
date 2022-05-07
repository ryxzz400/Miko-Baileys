const {
	MessageType
} = require("@adiwajshing/baileys");
const aethan = ["1yKUEjW", "parse", "rafi", "cekTicTac", "keys", "424146LlKotx", "name", "MikoBot", "repository", "./package.json", "1YkumLX", "117677dCLKHW", "cekIsi", "KeisiSemua", "2ZmIEaE", "getPosTic", "53hElLhT", "54781WARWcl", "134604JWXwlt", "17998LqPRkJ", "2249leQKWm", "21XGJCJd", "git+https://github.com/ryxzz400/Miko-baileys.git", "author", "4145awjAOp", "forEach"];
function wrigley(damonei, simrandeep) {
  damonei = damonei - 156;
  let ashelyn = aethan[damonei];
  return ashelyn;
}
const everlean = wrigley;
(function (brewer, jabrayah) {
  const myrton = wrigley;
  while (!![]) {
    try {
      const allyanna = parseInt(myrton(161)) * parseInt(myrton(177)) + -parseInt(myrton(179)) * -parseInt(myrton(157)) + -parseInt(myrton(180)) * -parseInt(myrton(173)) + parseInt(myrton(168)) + parseInt(myrton(181)) + parseInt(myrton(163)) * -parseInt(myrton(174)) + -parseInt(myrton(156)) * parseInt(myrton(158));
      if (allyanna === jabrayah) break; else brewer.push(brewer.shift());
    } catch (norah) {
      brewer.push(brewer.shift());
    }
  }
}(aethan, 245383));
const fs = require("fs"), pack = JSON[everlean(164)](fs.readFileSync(everlean(172))), cek = pack[everlean(169)] === everlean(170) && pack[everlean(160)] === everlean(165) && pack[everlean(171)].url == everlean(159);
exports.isTicTacToe = (suelynn, hamid) => {
  const janely = everlean;
  if (!cek) return ![];
  let trvis = ![];
  return Object.keys(hamid)[janely(162)](celton => {
    hamid[celton].id === suelynn && (trvis = !![]);
  }), trvis;
}, exports[everlean(178)] = (cloud, winta) => {
  const debbe = everlean;
  if (!cek) return ![];
  let diamyn = null;
  Object[debbe(167)](winta)[debbe(162)](cerenity => {
    winta[cerenity].id === cloud && (diamyn = cerenity);
  });
  if (diamyn !== null) return diamyn;
}, exports[everlean(176)] = breighlynn => {
  if (!cek) return ![];
  let tannette = !![];
  for (let corddaryl of breighlynn) {
    corddaryl !== "❎" && corddaryl !== "⭕" && (tannette = ![]);
  }
  return tannette;
}, exports[everlean(175)] = (hillary, driscilla) => {
  if (!cek) return ![];
  let lealani = ![];
  return (driscilla[hillary] === "❎" || driscilla[hillary] === "⭕") && (lealani = !![]), lealani;
}, exports[everlean(166)] = nilka => {
  if (!cek) return ![];
  let geatano = ![];
  if (nilka[0] === "❎" && nilka[1] === "❎" && nilka[2] === "❎" || nilka[0] === "⭕" && nilka[1] === "⭕" && nilka[2] === "⭕") geatano = !![]; else {
    if (nilka[3] === "❎" && nilka[4] === "❎" && nilka[5] === "❎" || nilka[3] === "⭕" && nilka[4] === "⭕" && nilka[5] === "⭕") geatano = !![]; else {
      if (nilka[6] === "❎" && nilka[7] === "❎" && nilka[8] === "❎" || nilka[6] === "⭕" && nilka[7] === "⭕" && nilka[8] === "⭕") geatano = !![]; else {
        if (nilka[0] === "❎" && nilka[3] === "❎" && nilka[6] === "❎" || nilka[0] === "⭕" && nilka[3] === "⭕" && nilka[6] === "⭕") geatano = !![]; else {
          if (nilka[1] === "❎" && nilka[4] === "❎" && nilka[7] === "❎" || nilka[1] === "⭕" && nilka[4] === "⭕" && nilka[7] === "⭕") geatano = !![]; else {
            if (nilka[2] === "❎" && nilka[5] === "❎" && nilka[8] === "❎" || nilka[2] === "⭕" && nilka[5] === "⭕" && nilka[8] === "⭕") geatano = !![]; else {
              if (nilka[0] === "❎" && nilka[4] === "❎" && nilka[8] === "❎" || nilka[0] === "⭕" && nilka[4] === "⭕" && nilka[8] === "⭕") geatano = !![]; else (nilka[2] === "❎" && nilka[4] === "❎" && nilka[6] === "❎" || nilka[2] === "⭕" && nilka[4] === "⭕" && nilka[6] === "⭕") && (geatano = !![]);
            }
          }
        }
      }
    }
  }
  return geatano;
}, exports.isPlay = (from, sender, _db) => {
    let found = false
    let status = false
    Object.keys(_db).forEach((i) => {
    if (_db[i].id === from) {
    found = i
    } 
    })
    if (found !== false) {
        if ([_db[found].penantang, _db[found].ditantang].includes(sender)) {
        status = true
        }
    }
    return status
}, exports.cekTimeOut = (miko, _dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].timeOut) {
                position = i
            }
        })
        if (position !== null) {
            if (_dir[position].status == null) {
            miko.sendMessage(_dir[position].id, `*Waktu TicTacToe habis*`, MessageType.text, { quoted: _dir[position].context })
            _dir.splice(position, 1)
            } else if (_dir[position].status !== null && Date.now() >= _dir[position].timeOutPlay) {
            miko.sendMessage(_dir[position].id, `*Bermain terlalu lama, TicTacToe berakhir*`, MessageType.text, { quoted: _dir[position].context })
            _dir.splice(position, 1)
            }
        }
    }, 1000)
};

