const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
const ytdl = require('ytdl-core');
const path = require("path");
var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const execute = async (client,msg/*,args*/) => {
        msg.delete(true);
        const chat= await msg.getChat();
        



        
//         //Configure YoutubeMp3Downloader with your settings
//         var YD = new YoutubeMp3Downloader({
//         "ffmpegPath": "ffmpeg.exe",        // FFmpeg binary location
//         "outputPath": "./",    // Output file location (default: the home directory)
//         "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
//         "queueParallelism": 2,                  // Download parallelism (default: 1)
//         "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
//         "allowWebm": false                      // Enable download from WebM sources (default: false)
//         });

//         //Download video and save as MP3 file
//         YD.download("1_zgKRBrT0Y");
//         var loc="j";
//         YD.on("finished", function(err, data) {
//         console.log("\n\n\n")
//         console.log(data);
//         console.log(data.file);
//         const ad=MessageMedia.fromFilePath(path.join(__dirname, data.file)); 
//         loc=ad;
//          client.sendMessage(msg.to,ad);
//         // console.log(JSON.stringify(data));
// });
// console.log(JSON.stringify(loc));
// // await client.sendMessage(msg.to,loc);
//         YD.on("error", function(error) {
//         console.log(error);
//         });

//         YD.on("progress", function(progress) {
//         console.log(JSON.stringify(progress));
//         });







        
        var Aud=MessageMedia.fromFilePath(path.join(__dirname, `..//Audio.mp3`)); 
        await client.sendMessage(chat.id._serialized,"Sending The Most Recent Song Downloaded");
        await client.sendMessage(chat.id._serialized, Aud);

};

module.exports = {
    name: 'load', //name of the module
    description: 'load the most recently downloaded song', // short description of what this command does
    command: '!load', //command with prefix. Ex command: '!test'
    commandType: 'plugin', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'HELP: !load\n\n```loads the most recent song someone downloaded using !download command```', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};