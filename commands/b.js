const { Buttons } = require("whatsapp-web.js");
const Levels = require("discord-xp");
//jshint esversion:8

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

//feature
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){

    const chat = await msg.getChat();
    var aoaos= [{id:'customId',body:'!findtags'},{body:'!all'},{body:'Amazing Feature'},{body:'button4'}];
    var btn= new Buttons("_Tap On Any Of The Buttons Below To Use Those Commands_",aoaos,"COMMONLY USED COMMANDS","The message will be generated from your whatsapp");
    await chat.sendMessage(btn);
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'b', //name of the module
    description: 'a quick way to use some commands', // short description of what this command does
    command: '!b', //command with prefix. Ex command: '!test'
    commandType: 'info', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'type !b and touch any of the buttons on your screen', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};