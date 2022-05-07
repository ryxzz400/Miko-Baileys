<p align="center">
<img src="https://raw.githubusercontent.com/ryxzz400/Miko-baileys/main/media/Miko.jpg" alt="MIKO BOT" width="128" height="128"/>
</p>
<p align="center">
<a href="#"><img title="MIKO BOT" src="https://img.shields.io/badge/MIKO BOT-green?colorA=%23ff0000&colorB=%23017e40&style=for-the-badge"></a>
</p>
<p align="center">
<a href="https://github.com/ryxzz400"><img title="Author" src="https://img.shields.io/badge/Author-ryxzz400-red.svg?style=for-the-badge&logo=github"></a>
</p>
<p align="center">
<a href="https://github.com/ryxzz400/followers"><img title="Followers" src="https://img.shields.io/github/followers/zennn08?color=blue&style=flat-square"></a>
<a href="https://github.com/ryxzz400/megumikato2/stargazers/"><img title="Stars" src="https://img.shields.io/github/stars/ryxzz400/Miko-baileys?color=red&style=flat-square"></a>
<a href="https://github.com/ryxzz400/megumikato2/network/members"><img title="Forks" src="https://img.shields.io/github/forks/ryxzz400/Miko-baileys?color=red&style=flat-square"></a>
<a href="https://github.com/ryxzz400/megumikato2/watchers"><img title="Watching" src="https://img.shields.io/github/watchers/ryxzz400/Miko-baileys?label=Watchers&color=blue&style=flat-square"></a>
</p>

<p align="center">
  <a href="https://github.com/ryxzz400/Miko-baileys#requirements">Requirements</a> •
  <a href="https://github.com/ryxzz400/Miko-baileys#instalasi">Installation</a> •
  <a href="https://github.com/ryxzz400/Miko-baileys#features">Features</a> •
  <a href="https://github.com/ryxzz400#thanks-to">Thanks to</a>
</p>
</div>


---



# Requirements
* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)
* [FFmpeg](https://github.com/BtbN/FFmpeg-Builds/releases/download/autobuild-2020-12-08-13-03/ffmpeg-n4.3.1-26-gca55240b8c-win64-gpl-4.3.zip) (for sticker command)
* [Libwebp](https://developers.google.com/speed/webp/download) (for sticker wm)
* [Image Magic](https://imagemagick.org/script/download.php) ( for nulis command, Centang Kolom 1,2,3,5,6)
* Any text editor

# Instalasi
## For Windows
```bash
git clone https://github.com/ryxzz400/Miko-baileys.git
cd Miko-baileys
npm install
node main
```
## For Termux
```bash
termux-setup-storage
apt update && apt upgrade
pkg install nodejs git ffmpeg libwebp imagemagick
git clone https://github.com/ryxzz400/Miko-baileys.git
cd Miko-baileys
npm install
node main
```

## For VPS
```bash
apt install nodejs git ffmpeg libwebp imagemagick
git clone https://github.com/ryxzz400/Miko-baileys.git
cd Miko-baileys
npm install
node main
```

## Edit file
- Change ownerNumber on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/config.json#L2)
- Change ownerName on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/config.json#L3)
- Change botName on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/config.json#L6)
- Change Sewa on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/config.json#L9)
- Change Donasi on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/config.json#L10)
- You can edit list menu on [this section](https://github.com/ryxzz400/Miko-baileys/blob/2ab63213e1b52305945c97a12bdec77fbe19c505/message/help.js#L7)
- You can add fiture on [this section](https://github.com/ryxzz400/Miko-baileys/blob/main/message/miko.js)


## Installing the FFmpeg for Windows
* Unduh salah satu versi FFmpeg yang tersedia dengan mengklik [di sini](https://www.gyan.dev/ffmpeg/builds/).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `ffmpeg`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
> setx /m PATH "C:\ffmpeg\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal FFmpeg, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
> ffmpeg -version
```


## Installing the libwebp for Windows
* Unduh salah satu versi libwebp yang tersedia dengan mengklik [di sini](https://developers.google.com/speed/webp/download).
* Extract file ke `C:\` path.
* Ganti nama folder yang telah di-extract menjadi `libwebp`.
* Run Command Prompt as Administrator.
* Jalankan perintah berikut::
```cmd
setx /m PATH "C:\libwebp\bin;%PATH%"
```
Jika berhasil, akan memberikanmu pesan seperti: `SUCCESS: specified value was saved`.
* Sekarang setelah Anda menginstal libwebp, verifikasi bahwa itu berhasil dengan menjalankan perintah ini untuk melihat versi:
```cmd
webpmux -version
```

# Features
- Cek [disini](https://github.com/ryxzz400/Miko-baileys/blob/main/message/help.js)

# Thanks to
* [`Baileys`](https://github.com/adiwajshing/Baileys)
* [`Xinz-Team`](https://github.com/Xinz-Team)
* [`Nurutomo`](https://github.com/Nurutomo)
* [`MhankBarBar`](https://github.com/MhankBarBar)
* [`MRHRTZ`](https://github.com/MRHRTZ)
* [`Mamet`](https://github.com/mamet8/)
* [`SlavyanDesu`](https://github.com/SlavyanDesu)
* [`VideFrelan`](https://github.com/VideFrelan)
* [`TobyG74`](https://github.com/TobyG74)
* [`ryxzz400`](https://github.com/ryxzz400)