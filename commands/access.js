//jshint esversion:8
const Levels = require("discord-xp");
const { MessageMedia } = require("whatsapp-web.js");
const path = require("path");
const execute = async (client,msg/*,args*/) => {
    msg.delete(true);
    const chat= await msg.getChat();

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
// var level=parseInt(data_level);
if(parseInt(data_level)<=4){
var img="lvl"+data_level+".png";
const media=MessageMedia.fromFilePath(path.join(__dirname, `.//${img}`));
await chat.sendMessage(media);
}
else{
    data_level="4";
    var img="lvl"+data_level+".png";
    const media=MessageMedia.fromFilePath(path.join(__dirname, `.//${img}`));
    await chat.sendMessage(media);
}
    
};

module.exports = {
    name: 'access', //name of the module
    description: 'shows all the commands you have access to at your current level', // short description of what this command does
    command: '!access', //command with prefix. Ex command: '!test'
    commandType: 'info', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: '*Access*\n_Type !access_', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};