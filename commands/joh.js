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
const image=await qm_Contact.getProfilePicUrl();
//feature
const chat= await msg.getChat();
console.log(parseInt(data_level));
if(parseInt(data_level)>=1||cmd_user.isMe){
    const card =canvacord.Canvacord
    // .trash(image)
    .jokeOverHead(image)
    .then(buffer => {
        const RankCard=new MessageMedia("image/png",buffer.toString("base64"),"JokeOverHead.png")
        chat.sendMessage(RankCard);
        // canvacord.write(buffer, "spotify.png");
    });
}else{
    await msg.reply("_This Feature Unlocks at Level 1_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'jokeoverhead', //name of the module
    description: 'joke over head meme', // short description of what this command does
    command: '!joh', //command with prefix. Ex command: '!test'
    commandType: 'reactions', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: "*Joke Over Head*\n_Reply *!joh* To Someone's Message To Make Joke Over Head Meme On Them", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};
