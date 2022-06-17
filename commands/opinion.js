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
const qm=await msg.getQuotedMessage();
const qm_Contact=await qm.getContact();
// const img1=await cmd_user.getProfilePicUrl();
const img2=await qm_Contact.getProfilePicUrl();
//feature
const chat= await msg.getChat();
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){
    try{
    const card =canvacord.Canvacord
    // .trash(image)
    .opinion(img2,qm.body)
    .then(buffer => {
        const RankCard=new MessageMedia("image/png",buffer.toString("base64"),"JokeOverHead.png")
        qm.reply(RankCard);
        // canvacord.write(buffer, "spotify.png");
    });
}catch(error){
    console.log(error);
}
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'opinion', //name of the module
    description: 'opinion meme', // short description of what this command does
    command: '!opinion', //command with prefix. Ex command: '!test'
    commandType: 'reactions', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: "*Opinion*\n_Reply *!opinion* To Someone's Message", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};