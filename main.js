//jshint esversion:8
const Levels = require("discord-xp");

const canvacord = require("canvacord");

const express = require("express");
const app = express();
const { Client, LegacySessionAuth, MessageMedia,NoAuth,LocalAuth,RemoteAuth } = require("whatsapp-web.js");
const pmpermit = require("./helpers/pmpermit");
const config = require("./config");
const fs = require("fs");
const logger = require("./logger");
const { checkServerIdentity } = require("tls"); 
const axios = require('axios'); 
const database = require("./db");
const qrcode = require('qrcode-terminal');
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const path = require("path");
const yts = require( 'yt-search' )
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
// chrome_bin = ENV.fetch('GOOGLE_CHROME_SHIM', nil)

//MINIGAME
Levels.setURL(config.mongodb_url).then(() => {
  const store = new MongoStore({ mongoose: mongoose });
  const client = new Client({
      authStrategy: RemoteAuth,
	  puppeteer: { headless: true,args: ["--no-sandbox"]},
  });

  client.initialize();
const { MiniGames, MiniGame } = require('./index.js');
class MyGame extends MiniGame {
  constructor(message, client) {
    super();
    this.client = client;
    this.chatId = message._getChatId();
    this.answer = Math.floor(Math.random() * 100).toString();
    this.client.sendMessage(this.chatId, "Game Started! Guess the number!");
  }
  async procMessage(message) {
    if (message.body.includes(this.answer)) {
      await message.reply('You are right!');
      this.gameOver();
    } else if (!message.fromMe) {
      await message.reply('You are wrong.');
    }
    if (message.body == "!stop") {
      await message.reply("_Game Stopped!_");
      this.gameOver();
    }
  }
  gameOver() {
    super.gameOver();
  }
}
//END MINIGAME

//MAFIA GAME
class MAFIA extends MiniGame {
  constructor(message, client, contact_id, mentions_array) {
    super();
    this.client = client;
    this.chatId = message._getChatId();
    this.player1 = contact_id;
    this.player2 = mentions_array[0];
    this.player3 = mentions_array[0];
    this.player4 = mentions_array[0];
    this.player5 = mentions_array[0];
    this.answer = Math.floor(Math.random() * 100).toString();
    this.client.sendMessage(this.chatId, "Game Started! Guess the number!");
  }
  async procMessage(message) {

    await this.client.sendMessage(this.player1._serialized, 'Hello, Successful Run');
    // this.gameOver();


    if (message.body == "!stop") {
      await message.reply("_Game Stopped!_");
      this.gameOver();
    }
  }
  gameOver() {
    super.gameOver();
  }
}
// MAFIA GAME ENDS
// var arr=["","","","","","","","","",""];
//TICTACTOE GAME
class TTT extends MiniGame {
  constructor(message, client, P1, P2) {
    super();
    this.client = client;
    this.chatId = message._getChatId();
    this.answer = Math.floor(Math.random() * 100).toString();
    this.P1 = P1;
    this.P2 = P2;
    this.client.sendMessage(this.chatId, "Game Started! Make Your Move! " + this.P1.pushname);
    this.turn = 1;
    this.arr = ["", "", "", "", "", "", "", "", "", ""];

  }

  async procMessage(message) {
    if (isNaN(parseInt(message.body)) == false && !message.fromMe) {
      console.log("Turn: " + JSON.stringify(this.turn))
      var cont = await message.getContact();
      if (this.turn % 2 != 0) {
        if (cont.id.user == this.P1.id.user) {
          console.log("PLAYER 1 !!!");
          if (this.arr[parseInt(message.body)] == "") {
            this.arr[parseInt(message.body)] = "O";
          }
          this.turn += 1;
        }
      }
      else if (this.turn % 2 == 0) {
        if (cont.id.user == this.P2.id.user) {
          console.log("PLAYER 2 !!!");
          if (this.arr[parseInt(message.body)] == "") {
            this.arr[parseInt(message.body)] = "X";
          }
          this.turn += 1;
        }
      }

      this.fill = {
        "a1": this.arr[1],
        "a2": this.arr[2],
        "a3": this.arr[3],
        "b1": this.arr[4],
        "b2": this.arr[5],
        "b3": this.arr[6],
        "c1": this.arr[7],
        "c2": this.arr[8],
        "c3": this.arr[9]
      }

      const card = canvacord.Canvacord
        .tictactoe(this.fill);
      console.log(this.arr);
      const RankCard = new MessageMedia("image/png", card.toString("base64"), "TicTacToe.png")
      await message.reply(RankCard);
      if (this.Winner(this.arr) == "Player1Wins") {
        const chat = await message.getChat();
        await chat.sendMessage(P1.pushname + " Won!🎉🎉🎉");
        this.arr = ["", "", "", "", "", "", "", "", "", ""];
        this.gameOver();
      }
      else if (this.Winner(arr) == "Player2Wins") {
        const chat = await message.getChat();
        await chat.sendMessage(P2.pushname + " Won!🎉🎉🎉");
        this.arr = ["", "", "", "", "", "", "", "", "", ""];
        this.gameOver();

      } else if (this.Winner(arr) == "Draw") {
        const chat = await message.getChat();
        await chat.sendMessage("It's a Draw!☹");
        this.arr = ["", "", "", "", "", "", "", "", "", ""];
        this.gameOver();

      }


    }
    else if (!message.fromMe) {
      await message.reply('Please Give a Number For The Position You Want To Mark\n--------------\n| 1 | 4 | 7 |\n| 2 | 5 | 8 |\n| 3 | 6 | 9 |');
    }
    if (message.body == "!stop") {
      await message.reply("_Game Stopped!_");
      this.arr = ["", "", "", "", "", "", "", "", "", ""];
      this.gameOver();
    }
  }
  Winner(value_array) {
    if ((value_array[1] == "O" && value_array[4] == "O" && value_array[7] == "O") || (value_array[2] == "O" && value_array[5] == "O" && value_array[8] == "O") || (value_array[3] == "O" && value_array[6] == "O" && value_array[9] == "O") ||
      (value_array[1] == "O" && value_array[2] == "O" && value_array[3] == "O") || (value_array[4] == "O" && value_array[5] == "O" && value_array[6] == "O") || (value_array[7] == "O" && value_array[8] == "O" && value_array[9] == "O") ||
      (value_array[1] == "O" && value_array[5] == "O" && value_array[9] == "O") || (value_array[7] == "O" && value_array[5] == "O" && value_array[3] == "O")) {
      return "Player1Wins";
    }
    else if ((value_array[1] == "X" && value_array[4] == "X" && value_array[7] == "X") || (value_array[2] == "X" && value_array[5] == "X" && value_array[8] == "X") || (value_array[3] == "X" && value_array[6] == "X" && value_array[9] == "X") ||
      (value_array[1] == "X" && value_array[2] == "X" && value_array[3] == "X") || (value_array[4] == "X" && value_array[5] == "X" && value_array[6] == "X") || (value_array[7] == "X" && value_array[8] == "X" && value_array[9] == "X") ||
      (value_array[1] == "X" && value_array[5] == "X" && value_array[9] == "X") || (value_array[7] == "X" && value_array[5] == "X" && value_array[3] == "X")) {
      return "Player2Wins";
    }
    else if (value_array[1] != "" && value_array[2] != "" && value_array[3] != "" && value_array[4] != "" && value_array[5] != "" && value_array[6] != "" && value_array[7] != "" && value_array[8] != "" && value_array[9] != "") {
      return "Draw";
    }
  }
  gameOver() {
    super.gameOver();
  }
}
// TICTACTOE GAME ENDS


class MyGame2 extends MiniGame {
  constructor(message, client, question, answer) {
    super();
    this.client = client;
    this.chatId = message._getChatId();
    // this.arr=makeGetRequest("https://ibk-riddles-api.herokuapp.com/?ref=https://githubhelp.com");
    this.answer = answer;
    this.question = question;
    this.client.sendMessage(this.chatId, "*Game Started! Solve The Riddle!*\n\n" + "_" + this.question + "_");
  }

  async procMessage(message) {
    if (message.body.toLowerCase().includes(this.answer.toLowerCase())) {
      await message.reply('*_You Are Right & The Winner Of This Game_* 🥳🥳🥳');
      this.gameOver();
    } else if (!message.fromMe) {
      await message.reply('You are wrong!');
    }
    if (message.body == "!stop") {
      await this.client.sendMessage(this.chatId, "_Game Stopped!_");
      this.gameOver();
    }
  }

  gameOver() {
    super.gameOver(); 
  }
}

//END MYGAME
// const sessionData=JSON.parse('{"WABrowserId":"\"tEqD7iE7LJ60G8OZ3VY4KA==\"","WASecretBundle":"{\"key\":\"6x0tAJpBdH9WyECjAeW7vgnRgsctS4+LAbbq2dhKF50=\",\"encKey\":\"l6MvYB/L233L5euccB0foJhmTO1ori3zuO1qfD30vR0=\",\"macKey\":\"6x0tAJpBdH9WyECjAeW7vgnRgsctS4+LAbbq2dhKF50=\"}","WAToken1":"\"L9WhzmITqQTyvol4+XH44SKSgEvteSmaVvE/0wIWrdk=\"","WAToken2":"\"1@bCv6iG3A12Lekpo3y5AUn8vkLKDKMG59ujDmpbMN05MlVhaR39a82YpPcM87jEbNfm/lP9XS7MKzVg==\""}');
const sessionData={"WABrowserId":"\"tEqD7iE7LJ60G8OZ3VY4KA==\"","WASecretBundle":"{\"key\":\"6x0tAJpBdH9WyECjAeW7vgnRgsctS4+LAbbq2dhKF50=\",\"encKey\":\"l6MvYB/L233L5euccB0foJhmTO1ori3zuO1qfD30vR0=\",\"macKey\":\"6x0tAJpBdH9WyECjAeW7vgnRgsctS4+LAbbq2dhKF50=\"}","WAToken1":"\"L9WhzmITqQTyvol4+XH44SKSgEvteSmaVvE/0wIWrdk=\"","WAToken2":"\"1@bCv6iG3A12Lekpo3y5AUn8vkLKDKMG59ujDmpbMN05MlVhaR39a82YpPcM87jEbNfm/lP9XS7MKzVg==\""};

// const client = new Client({
//   // authStrategy: new NoAuth(),
// //   takeoverOnConflict: true,
// //   takeoverTimeoutMs: 0,
//   // puppeteer: {executablePath: config.ppt_path, headless: true, ignoreDefaultArgs: ['--disable-extensions'],args: ["--no-sandbox"]},
//   puppeteer: { headless: true,args: ["--no-sandbox"]},
//   // authStrategy: new NoAuth()
//   authStrategy: new LocalAuth({ clientId: "whatsbot" })
//   // session: config.session,
// }); 

client.commands = new Map();

fs.readdir("./commands", (err, files) => {
  if (err) return console.error(e);
  files.forEach((commandFile) => { 
    if (commandFile.endsWith(".js")) {
      let commandName = commandFile.replace(".js", "");
      const command = require(`./commands/${commandName}`);
      client.commands.set(commandName, command);
    }
  });
});

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {small: true});
});
// client.on('qr', qr => {
//   qrcode.generate(qr, {small: true});
// });


//FOR PC
// client.on('qr', (qr) => {
//   console.log('QR RECEIVED', qr);
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
// });

//END FOR PC


// client.initialize();

client.on("auth_failure", () => {
  console.error(
    "There is a problem in authentication, Kindly set the env var again and restart the app"
  );
});

client.on("ready", () => {
  console.log("Bot has been started");
  // console.log(os.environ.get("GOOGLE_CHROME_BIN"));
});

client.on("message", async (msg) => {
  if (!msg.author && config.pmpermit_enabled == "true") {
    // Pm check for pmpermit module
    var checkIfAllowed = await pmpermit.handler(msg.from.split("@")[0]); // get status
    if (!checkIfAllowed.permit) {
      // if not permitted
      if (checkIfAllowed.block) {
        await msg.reply(checkIfAllowed.msg);
        setTimeout(async () => {
          await (await msg.getContact()).block();
        }, 3000);
      } else if (!checkIfAllowed.block) {
        msg.reply(checkIfAllowed.msg);
      }
    }
  }
});

//MINIGAME
const minigames = new MiniGames();
client.on('message_create', async (msg) => {
  // var UBCheck=false;
  
  if (msg.body.startsWith("!download")&&msg.fromMe) {

    //discord-xp
    var cmd_user = await msg.getContact();
    if (!cmd_user.isMe) {
      try {
        const data = await Levels.fetch(cmd_user.id.user, "Global", false);
        var data_level = data.level
        console.log("discord-xp");
        console.log(data_level);
      }
      catch (error) {
        console.log(error);
      }
    }

    //feature
    console.log(parseInt(data_level));
    if (parseInt(data_level) >= 5 || cmd_user.isMe) {
      
      let name= msg.body.substring(10);
      const r = await yts( name )
      const videos = r.videos.slice( 0,1 )
videos.forEach( async function ( v ) {
	const views = String( v.views ).padStart( 10, ' ' )
	console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.type }` )
  if(v.timestamp.replace(/[^:]/g, "").length==1 && parseInt(v.timestamp.substring(0,v.timestamp.indexOf(":")))<10){
    // return v.videoId;

      // let url = msg.body.substring(10);
      // let id = ""
      // if (url.includes("?v=")) {
      //   let idx = url.indexOf("?v=");
      //   id = url.substring(idx + 3);
      // }
      // else if (url.includes("youtu.be/")) {
      //   let idx = url.indexOf("youtu.be/");
      //   id = url.substring(idx + 9);
      // }

      //Configure YoutubeMp3Downloader with your settings
      const chat = await msg.getChat();
      const idk = chat.id._serialized;
      var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "/app/vendor/ffmpeg/ffmpeg",        // FFmpeg binary location
        "outputPath": "./",    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false                      // Enable download from WebM sources (default: false)
      });

      //Download video and save as MP3 file
      YD.download(v.videoId, "Audio.mp3");

      YD.on("finished", async function (err, data) {

        const aud = MessageMedia.fromFilePath(path.join(__dirname, data.file));
        console.log("location: " + data.file);
        const TN = await MessageMedia.fromUrl(v.image);

        msg.delete(true);
        client.sendMessage(idk, TN, { caption: "*DOWNLOADED:* " + data.title });
        client.sendMessage(idk, aud, { sendAudioAsVoice: true });

      });

      YD.on("error", function (error) {
        console.log(error);
      });

      YD.on("progress", function (progress) {
        console.log(JSON.stringify(progress));
      });
   
     } } )

    } else {
      await msg.reply("_This Feature Unlocks at Level 10_\n_Type *!lvl* For Your Current Level_");
    }
  }else if(!msg.fromMe&& config.userbot=="false"){
    if (msg.body.startsWith("!download")) {

      //discord-xp
      var cmd_user = await msg.getContact();
      if (!cmd_user.isMe) {
        try {
          const data = await Levels.fetch(cmd_user.id.user, "Global", false);
          var data_level = data.level
          console.log("discord-xp");
          console.log(data_level);
        }
        catch (error) {
          console.log(error);
        }
      }
  
      //feature
      console.log(parseInt(data_level));
      if (parseInt(data_level) >= 5 || cmd_user.isMe) {
        
        let name= msg.body.substring(10);
        const r = await yts( name )
        const videos = r.videos.slice( 0,1 )
  videos.forEach( async function ( v ) {
    const views = String( v.views ).padStart( 10, ' ' )
    console.log( `${ views } | ${ v.title } (${ v.timestamp }) | ${ v.type }` )
    if(v.timestamp.replace(/[^:]/g, "").length==1 && parseInt(v.timestamp.substring(0,v.timestamp.indexOf(":")))<10){
      // return v.videoId;
  
        // let url = msg.body.substring(10);
        // let id = ""
        // if (url.includes("?v=")) {
        //   let idx = url.indexOf("?v=");
        //   id = url.substring(idx + 3);
        // }
        // else if (url.includes("youtu.be/")) {
        //   let idx = url.indexOf("youtu.be/");
        //   id = url.substring(idx + 9);
        // }
  
        //Configure YoutubeMp3Downloader with your settings
        const chat = await msg.getChat();
        const idk = chat.id._serialized;
        var YD = new YoutubeMp3Downloader({
          "ffmpegPath": "/usr/bin/ffmpeg",        // FFmpeg binary location
          "outputPath": "./",    // Output file location (default: the home directory)
          "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
          "queueParallelism": 2,                  // Download parallelism (default: 1)
          "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
          "allowWebm": false                      // Enable download from WebM sources (default: false)
        });
  
        //Download video and save as MP3 file
        YD.download(v.videoId, "Audio.mp3");
  
        YD.on("finished", async function (err, data) {
  
          const aud = MessageMedia.fromFilePath(path.join(__dirname, data.file));
          console.log("location: " + data.file);
          const TN = await MessageMedia.fromUrl(v.image);
  
          client.sendMessage(idk, TN, { caption: "*DOWNLOADED:* " + data.title });
          client.sendMessage(idk, aud, { sendAudioAsVoice: true });
  
        });
  
        YD.on("error", function (error) {
          console.log(error);
        });
  
        YD.on("progress", function (progress) {
          console.log(JSON.stringify(progress));
        });
     
       } } )
  
      } else {
        await msg.reply("_This Feature Unlocks at Level 10_\n_Type *!lvl* For Your Current Level_");
      }
    }
  }

  if (msg.body.startsWith("#")&&msg.fromMe) {
    let args = msg.body.slice(1).trim().split(/ +/g);
    let command = args.shift().toLowerCase();
    let chat = await msg.getChat();
    async function makeGetRequest(Link) {

      let res = await axios.get(Link);

      let arr = res.data.results;

      let random = Math.floor(Math.random() * arr.length)
      console.log(random);
      const qm = await msg.getQuotedMessage();
      let url = arr[random].media[0].webm.url;
      // return question;
      let sticker = await MessageMedia.fromUrl(url, { unsafeMime: true });
      if (msg.hasQuotedMsg) {
        await qm.reply(sticker, chat.id._serialized, { sendMediaAsSticker: true });
      } else {
        await msg.reply(sticker, chat.id._serialized, { sendMediaAsSticker: true });
      }
      // return [question,answer];
    }
    makeGetRequest("https://g.tenor.com/v1/search?q=" + command + "&key=9Q40NJG3T240&limit=100");
  }else if (!msg.fromMe&& config.userbot=="false"){
    if (msg.body.startsWith("#")) {
      let args = msg.body.slice(1).trim().split(/ +/g);
      let command = args.shift().toLowerCase();
      let chat = await msg.getChat();
      async function makeGetRequest(Link) {
  
        let res = await axios.get(Link);
  
        let arr = res.data.results;
  
        let random = Math.floor(Math.random() * arr.length)
        console.log(random);
        const qm = await msg.getQuotedMessage();
        let url = arr[random].media[0].webm.url;
        // return question;
        let sticker = await MessageMedia.fromUrl(url, { unsafeMime: true });
        if (msg.hasQuotedMsg) {
          await qm.reply(sticker, chat.id._serialized, { sendMediaAsSticker: true });
        } else {
          await msg.reply(sticker, chat.id._serialized, { sendMediaAsSticker: true });
        }
        // return [question,answer];
      }
      makeGetRequest("https://g.tenor.com/v1/search?q=" + command + "&key=9Q40NJG3T240&limit=100");
    }
  }
  if (msg.body.startsWith('!NumbersGame')&&msg.fromMe) {
    await minigames.addGameChat(msg._getChatId(), new MyGame(msg, client));
  }else if(msg.body.startsWith('!NumbersGame')&&!msg.fromMe&& config.userbot=="false"){
    await minigames.addGameChat(msg._getChatId(), new MyGame(msg, client));
  }
   if (msg.body.startsWith('!RiddlesGame')&&msg.fromMe) {

    async function makeGetRequest(Link) {

      let res = await axios.get(Link);

      let data = res.data;
      question = data.question;
      answer = data.answer
      console.log(answer);
      // return question;

      await minigames.addGameChat(msg._getChatId(), new MyGame2(msg, client, question, answer));
      // return [question,answer];
    }
    makeGetRequest("https://ibk-riddles-api.herokuapp.com/?ref=https://githubhelp.com")
  }else if(msg.body.startsWith('!RiddlesGame')&&!msg.fromMe&& config.userbot=="false"){
    async function makeGetRequest(Link) {

      let res = await axios.get(Link);

      let data = res.data;
      question = data.question;
      answer = data.answer
      console.log(answer);
      // return question;

      await minigames.addGameChat(msg._getChatId(), new MyGame2(msg, client, question, answer));
      // return [question,answer];
    }
    makeGetRequest("https://ibk-riddles-api.herokuapp.com/?ref=https://githubhelp.com")
  
  }
  
  // else if (msg.body.startsWith('!MafiaGame')) {
  //   var contact = await msg.getContact();
  //   var mentions = msg.getMentions();
  //   await minigames.addGameChat(msg._getChatId(), new MAFIA(msg, client, contact.id, mentions));
  // }
    if (msg.body.startsWith('!ttt')&&!msg.fromMe&&config.userbot=="false") {
    var contact = await msg.getContact();
    var mentions = await msg.getMentions();
    console.log("Mentions[0]: " + JSON.stringify(mentions[0]));
    await minigames.addGameChat(msg._getChatId(), new TTT(msg, client, contact, mentions[0]));
  }

  minigames.forwardMsg(msg);
});

//END MINIGAME

client.on("message_create", async (msg) => {
  // auto pmpermit 
  // try {
  //   if (config.pmpermit_enabled == "true") {
  //     var otherChat = await (await msg.getChat()).getContact();
  //     if (
  //       msg.fromMe &&
  //       msg.type !== "notification_template" &&
  //       otherChat.isUser &&
  //       !(await pmpermit.isPermitted(otherChat.number)) &&
  //       !otherChat.isMe &&
  //       !msg.body.startsWith("!") &&
  //       !msg.body.endsWith("_Powered by SciBot_")
  //     ) {
  //       await pmpermit.permit(otherChat.number);
  //       await logger(
  //         client,
  //         `User ${otherChat.name || otherChat.number
  //         } is automatically permitted for message !`
  //       );
  //     }
  //   }
  // } catch (ignore) { }

  if (msg.body.startsWith("!")) {
    let args = msg.body.slice(1).trim().split(/ +/g);
    let command = args.shift().toLowerCase();

    console.log({ command, args });

    if (client.commands.has(command)&&msg.fromMe) {
      try {
        const chat=await msg.getChat();
        var user = await msg.getContact();
        var user_name = user.pushname;

        if (!msg.fromMe) {
          let temp = await Levels.fetch(user.id.user, "Global", false);
          let today = new Date().toISOString();
          try {
            temp = JSON.stringify(temp.lastUpdated);
            console.log("1:  " + temp.substring(1, temp.length - 8));
            console.log("2:  " + today.substring(0, today.length - 7));
            if (today.substring(0, today.length - 7) != temp.substring(1, temp.length - 8)) {

              
                await Levels.appendXp(user.id.user, "Global", 25);
              
            }
          } catch (error) {
            console.log("levelled up");
            await Levels.appendXp(user.id.user,"Global", 25);
          }
        }// await client.sendMessage(msg.to,command)

        await client.commands.get(command).execute(client, msg, args);
      } catch (error) {
        console.log(error);
      }
    }else if(!msg.fromMe&& config.userbot=="false"){
      try {
        const chat=await msg.getChat();
        var user = await msg.getContact();
        var user_name = user.pushname;

        if (!msg.fromMe) {
          let temp = await Levels.fetch(user.id.user, "Global", false);
          let today = new Date().toISOString();
          try {
            temp = JSON.stringify(temp.lastUpdated);
            console.log("1:  " + temp.substring(1, temp.length - 8));
            console.log("2:  " + today.substring(0, today.length - 7));
            if (today.substring(0, today.length - 7) != temp.substring(1, temp.length - 8)) {

              
                await Levels.appendXp(user.id.user, "Global", 25);
              
            }
          } catch (error) {
            console.log("levelled up");
            await Levels.appendXp(user.id.user,"Global", 25);
          }
        }// await client.sendMessage(msg.to,command)

        await client.commands.get(command).execute(client, msg, args);
      } catch (error) {
        console.log(error);
      }
    } else if (msg.body != "!NumbersGame" && msg.body != "!stop" && msg.body != "!RiddlesGame" && !msg.body.startsWith("!download")) {
      await client.sendMessage(
        msg.to,
        "No such command found. Type !help to get the list of available commands"
      );
    }
  }


  // if(!msg.body.startsWith("!")){
  if (msg.body.includes("@") && !msg.body.startsWith("*MESSAGES") && !msg.body.includes("_This Message is Automated by SciBot Because of !all command_")) {
    // await client.sendMessage(msg.to,"script started");
    let command = "!tagged";
    let args = command.slice(1).trim().split(/ +/g);
    command = args.shift().toLowerCase();
    if (client.commands.has(command)) {
      try {
        await client.commands.get(command).execute(client, msg, args);
      } catch (error) {
        await client.sendMessage(msg.to, error);
      }
    }

  }
  if (!msg.body.includes("_This Message is Automated by SciBot_") && !msg.body.startsWith("*MESSAGES") && !msg.body.includes("To get more info use ```!help [command]```")) {
    if (msg.body.toLowerCase().includes("group link") || msg.body.toLowerCase().includes("group inv link") || msg.body.toLowerCase().includes("group invite link") || msg.body.toLowerCase().includes("grp link") || msg.body.toLowerCase().includes("grp inv link") || msg.body.toLowerCase().includes("grp invite link") || msg.body.toLowerCase().includes("invite link") || msg.body.toLowerCase().includes("group link") || msg.body.toLowerCase().includes("inv link")) {
      // await client.sendMessage(msg.to,"script started");
      let command = "!inv";
      let args = command.slice(1).trim().split(/ +/g);
      command = args.shift().toLowerCase();
      if (client.commands.has(command)) {
        try {
          await client.commands.get(command).execute(client, msg, args);
        } catch (error) {
          await client.sendMessage(msg.to, error);
        }
      }
    }
  }

});

client.on("group_join", async (msg) => {
  const chat = await msg.getChat();
  const contact = await client.getContactById(msg.recipientIds[0]);
  var contact_name;
  if (contact.isMe) {
    contact_name = "Scimitar";
  } else {
    contact_name = contact.pushname;
  }
  const dp_link = await contact.getProfilePicUrl();
  const dp = await MessageMedia.fromUrl(dp_link);
  const owner = await client.getContactById(chat.owner._serialized);
  // await chat.sendMessage(JSON.stringify(owner));
  var owner_name;
  if (owner.isMe == true) {
    owner_name = "Scimitar";
  }
  else {
    owner_name = owner.pushname;
  }
  await chat.sendMessage(dp, { caption: "```Welcome To " + chat.name + "! " + contact_name + "```\n\n*Group Owner :* " + owner_name + "\n\n" + chat.description + "\n\n" + "_This Message is Automated by SciBot_" });
  // await chat.sendMessage(" _Welcome!_ "+contact.pushname+dp);
  // await chat.sendMessage(JSON.stringify(msg));

});

client.on("message_revoke_everyone", async (after, before) => {

  //CHECK IF THIS REVOKED MSG SHOULD BE SHOWN .......DATABASE
  // let args = ["hi","how"];
  // let command = "!revokedb"
  // if (client.commands.has(command)) {
  //   try {
  //     await client.commands.get(command).execute(client, before,args);
  //   }catch (error){
  //     await client.sendMessage(msg.to,error);
  //   }
  // }

  
 try{
  if (before) {
    const chat = await before.getChat();
    const contact = await before.getContact();
  if (
    before.fromMe !== true &&
    before.hasMedia !== true &&
    before.author == undefined &&
    // config.enable_delete_alert == "true"&& 
    config.dm_del=="ON"
  ) {
    console.log("REVOKED WORKING2");
    chat.sendMessage(
      "_" + contact.pushname + " deleted this message_ 👇\n\n" + before.body
    );
  }
  }
    }catch (error){
      console.log(error);
    }
  

  
  temp_chat = await before.getChat();
  temp_contact = await before.getContact();
  if(!before.fromMe){
  try {
    var { conn, coll } = await database("DeletedMessages");



    var query = { phone_num: temp_contact.id._serialized, group_id: temp_chat.id._serialized };
    // await temp_chat.sendMessage(temp_contact.id._serialized);

    var data = await coll.findOne(query);
  }
  catch (error) {
    console.log(error);
  }

  // await temp_chat.sendMessage("w");   
  // console.log("\n\nhere");
  // console.log(data.show);

  //SENDING REVOKED MSG
  try{
  if(typeof data!='undefined'&& typeof data!=null){
  if (data.show) {
    if (before) {
      const chat = await before.getChat();
      const contact = await before.getContact();
      if (
        before.fromMe !== true &&
        before.hasMedia !== true &&
        // before.author == undefined &&
        config.group_delete_alert == "true"
      ) {
        console.log("REVOKED WORKING3");
        chat.sendMessage(
          "_" + contact.pushname + " deleted this message_ 👇\n\n" + before.body
        );
      }
    }
  }

}
if (before) {
  const chat = await before.getChat();
  const contact = await before.getContact();
if (
  before.fromMe !== true &&
  before.hasMedia !== true &&
  before.author == undefined &&
  // config.enable_delete_alert == "true"&& 
  config.dm_del=="ON"
) {
  chat.sendMessage(
    "_" + contact.pushname + " deleted this message_ 👇\n\n" + before.body
  );
}
}
  }catch (error){
    console.log(error);
  }

}
});

client.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});

app.get("/", (req, res) => {
  res.send(
    '<h1>This server is powered by Scibot<br></h1>'
  );
});

app.use(
  "/public",
  express.static("public"),
  require("serve-index")("public", { icons: true })
); // public directory will be publicly available

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening at Port: ${process.env.PORT || 8080}`);
});
});
