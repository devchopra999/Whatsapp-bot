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
// const qm_Contact=await qm.getContact();
// const image=await qm_Contact.getProfilePicUrl();
const mentions= await msg.getMentions();
const img1=await mentions[0].getProfilePicUrl();
const img2=await mentions[1].getProfilePicUrl();

//feature
const chat= await msg.getChat();
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){
    try{
    const card =canvacord.Canvacord
    // .trash(image)
    .kiss(img1,img2)
    .then(buffer => {
        const RankCard=new MessageMedia("image/png",buffer.toString("base64"),"beautiful.png")
        chat.sendMessage(RankCard);
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
    name: 'kiss', //name of the module
    description: 'Make 2 People Kiss Each Other', // short description of what this command does
    command: '!kiss', //command with prefix. Ex command: '!test'
    commandType: 'reactions', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: "*Kiss*\n_Type *!kiss* followed By Two Tags_", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};