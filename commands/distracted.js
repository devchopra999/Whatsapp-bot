const Levels = require("discord-xp");
const canvacord = require("canvacord");
const { MessageMedia } = require("whatsapp-web.js");

const execute = async (client,msg/*,args*/) => {
    msg.delete(true);

//discord-xp
var cmd_user=await msg.getContact();
if(!cmd_user.isMe){
try{
    const data =await Levels.fetch(cmd_user.id.user, "Global", false);
var data_level=data.level
console.log("discord-xp");
console.log(data_level);
}
catch(error){
    console.log(error);
}
}
const mentions=await msg.getMentions();
console.log(JSON.stringify(mentions[0]));
const img1=await mentions[0].getProfilePicUrl();
console.log(JSON.stringify(img1));
const img2= await mentions[1].getProfilePicUrl();
const img3=await mentions[2].getProfilePicUrl();

// const qm=await msg.getQuotedMessage();
// const qm_Contact=await qm.getContact();
// const image=await qm_Contact.getProfilePicUrl();
//feature
const chat= await msg.getChat();
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){
    const card =canvacord.Canvacord
    // .trash(image)
    .distracted(img1,img2,img3)
    .then(buffer => {
        console.log("sending...");
        const RankCard=new MessageMedia("image/png",buffer.toString("base64"),"JokeOverHead.png")
        chat.sendMessage(RankCard);
        // canvacord.write(buffer, "spotify.png");
    });
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }
  console.log("Sent!");
};

module.exports = {
    name: 'distracted', //name of the module
    description: 'Distracted Guy Meme', // short description of what this command does
    command: '!distracted', //command with prefix. Ex command: '!test'
    commandType: 'reactions', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: "*Distracted*\n_Type *!distracted* followed by 3 tags (Girl, Boy, The Other Girl)_", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};