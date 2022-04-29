
//jshint esversion:8
const {MessageMedia, ChatTypes} = require('whatsapp-web.js');
const path = require("path");
const { exec } =require("child_process");
const fs = require('fs');
const axios = require('axios');
const Levels = require("discord-xp");
// const ffmpegInstaller = require("ffmpeg");
const ffmpeg = require("fluent-ffmpeg")()
  .setFfprobePath("/usr/bin/ffmpeg")
  .setFfmpegPath("/usr/bin/ffmpeg");

const execute = async (client,msg,args) => { 

    //discord-xp
  var cmd_user=await msg.getContact();
  if(!cmd_user.isMe){ 
  try{
  const data =await Levels.fetch(cmd_user.pushname, "Global", false);
  var data_level=data.level
  console.log("discord-xp");
  console.log(data_level);
  }
  catch(error){
      console.log(error);
  }
}

//feature
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){

  const chat=await msg.getChat();

    let qm= await msg.getQuotedMessage();
    

    //LINK
    let p1="https://api.waifu.pics/sfw/";
    
    let contact=await msg.getContact();
    let uid=contact.id.user;
    


    let LINK=p1+args[0];
    console.log(LINK);

    
    async function makeGetRequest() {

        let res = await axios.get(LINK);
      
        let data = res.data.url;



        




// ffmpeg
//   .input(data)
//   .outputOptions([
//     "-pix_fmt yuv420p",
//     "-c:v libx264",
//     "-movflags +faststart",
//     "-filter:v crop='floor(in_w/2)*2:floor(in_h/2)*2'",
//   ])
//   .noAudio()
//   .output(`./vidgif.mp4`)
//   .on("end", (file) => {
//     console.log("DATA: "+JSON.stringify(file));
    
//     const Gif=MessageMedia.fromFilePath(path.join(__dirname, `.//vidgif.mp4`)); 
//     client.sendMessage(Gif,{sendVideoAsGif:true});
//   })
//   .on("error", (e) => console.log(e))
//   .run();













  // exec(`ffmpeg -i ${data} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" vidgif.mp4`, async (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  // }
  // else{
    const Gif=await MessageMedia.fromUrl(data); 
    await client.sendMessage(msg.to,Gif,{sendMediaAsSticker: true ,stickerAuthor:"Scimitar"});
  // }
  // })
        // await qm.reply("_"+res.data.cnt+"_");
      }
      
      makeGetRequest();
      
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'a', //name of the module
    description: 'anime reactions(Under Development)', // short description of what this command does
    command: '!a', //command with prefix. Ex command: '!test'
    commandType: 'none', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'Under Development', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};