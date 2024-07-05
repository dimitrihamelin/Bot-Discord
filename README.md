# 🚀 Discord Bot Latest Version : 2.0

Welcome to the frontier of Discord Bot development with version 17.0 — your gateway to crafting an unparalleled and feature-rich bot for Discord communities! Embark on this exhilarating journey by ensuring that you have the following prerequisites in place : 

## 🚦 Bot Features

Unlock the power of emotions with your Discord bot! Here are some key characteristics :

|         Feature          |              Description                | Tested Discord Version | Works |
|:------------------------:|:--------------------------------------:|:-----------------------:|:---------:|
| 🎵 **Multiple Music**    | Host your own music or enjoy 24/7 radio streaming. |         14          |   ✅  |
| 👥 **Members Count**     | Track the growth of your community by counting members. |  14  |   ✅  |
| 📊 **Slash Commands**    | Use slash commands in up to 3 languages for global reach. |   14   |   ✅  |
| 🌐 **Language Support**  | Expand your bot's reach with support for up to 3 languages. |   14   |   ✅  |
| 👋 **Welcome Messages**  | Greet new members in multiple languages upon their arrival. |   14   |   ✅  |
| 🤗 **Farewell Messages** | Bid farewell to departing members with global messages. |   14   |   ✅  |
| 📻 **Multiple Radios**   | Access different radio stations with your bot. |   14   |   ✅  |
| 🗑️ **Clear Command**     | Manage clutter with a command to clear messages. |   14   |   ✅  |
| ❓**Custom Help Command**| Provide assistance in up to 3 languages with a personalized help command. | 14 | ✅  |
| 🎵 **Local Music Support**| Enable users to play music from their local libraries.   | 14   |   ✅  |
| ⚙️ **Custom Commands**    | Create customized commands for your bot in up to 3 languages with /cmd |   14   |   ✅  |
| 🎧**MP3 Music**| Use MP3 directly on your computer or server (VPS, VPN, own device). |   14   |   ✅  |
| 🍓 **Raspberry Pi Support** | Ensure compatibility with Raspberry Pi 3 and 4 for seamless integration. | 14 | ✅  |
| 🌐 **Custom Status**      | Set and customize your bot's status: Online, Idle, Do Not Disturb, or Streaming. | 14 | ✅  |
| 🚫 **Anti-Bad Words Filter** | Implement a custom filter to prevent the use of inappropriate language. | 14 | ✅  |
| 🔋 **Low Energy Mode**    | Activate low energy mode to conserve power and resources. | 14 | ✅  |

Feel free to modify the language or content to better align with the tone and style that best suits your preferences for documenting your Discord Bot.


## 🛠️ Prerequisites

- **Visual Studio Code**: Transform your coding experience into a sanctuary of creativity. If you haven't already, download and set up Visual Studio Code to unlock the full potential of your development environment.

- **CodeJS**: Elevate your Discord bot development to new heights. Seamlessly integrate CodeJS into your Visual Studio Code environment for an unparalleled and streamlined coding experience.

- **brew**: To download the YouTube links and Radio 24h/24 - Or your own radio


## ⚙️ Setup Commands

Prepare to forge your Discord bot environment by executing the following commands in the terminal of Visual Studio Code:

```bash
npm init -y
npm install discord.js@latest
npm install croxydb
brew install ffmpeg (mac os)
sudo apt-get update (ubuntu & debian)
sudo apt-get install ffmpeg (ubuton & debian)
brew install ffmpeg
npm install prism-media
npm i sodium
```
**1. Replace by your files (main.js):**

```bash

require('dotenv').config();
const FFmpeg = require('/Users/dimitrihamelin/github/Bot-Discord/node_modules/prism-media/src/core/FFmpeg.js'); // Adjust the path accordingly

client.login(Token).then(console.log("Support FR qui marche")).catch((err) => {console.log("Problème FR")}) //here

let eventFiles = readdirSync('/Users/dimitrihamelin/github/Bot-Discord/fr/croxydb').filter(file => file.endsWith('.js')); //here

for (let file of eventFiles) {
	let event = require(`/Users/dimitrihamelin/github/Bot-Discord/fr/croxydb/${file}`); //here
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

```

**2. Modify your file config.json** 

```bash

{
"Channel":"",
"roleStaff":"",
"log":"",
"rolebot": "", 
"welcome":"",
"farewell": "",
"SERVER": "", 
"STATUS": "",
"LIVE": "", 
"Token": "",
"prefix": "!" 
}

```

Warning : Replace also the path and "your token" in the main page & config.

Sodium or the others issues on the console can work.

**Download all the dependencies listed in the console. Launch with Ready.js or main.js.**


**I can help you to setup your own Discord bot on discord : @diloctoz if you want.**


Please feel free to modify the language or content to better align with the tone and style that best suits your preferences for documenting your Discord Bot.
Also, the you can host 3 times your bot so you will have the langages. Also, you need to know that you can host your own musics or see radio. Count Members. 
