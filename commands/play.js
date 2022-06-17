const { Buttons, List } = require("whatsapp-web.js");
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

    var aoaos= [{id:'customId',body:'!NumbersGame'},{body:'!RiddlesGame'},{body:'I have an idea for the 3rd Game'},{body:'button4'}];
    // await client.sendMessage(msg.to,"chlra h");
    var list_section=[{title:'List Of Games',rows:[{id:'customId', title:'!NumbersGame', description: 'SciBot will pick a number between 1 to 100 and you have to guess it!'},{title:'!RiddlesGame', description: 'SciBot will send a riddle and you have to solve it!'},{title:'Next Game', description: 'If you have an idea for the next game that can be created in Whatsapp\nLet me know'}]}];
    var list=new List("```Don't Start 2 Games At Once\nUse !stop To Stop The Game```","Games",list_section,"*WHICH GAME TO PLAY?*","footer");
    var btn= new Buttons("Tap on Any Of The Buttons Below To Play That Game",aoaos,"WHICH GAME TO START?","don't start 2 games at once");
    
    // await chat.sendMessage(btn);
    await chat.sendMessage(list);
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }
};

module.exports = {
    name: 'play', //name of the module
    description: 'a quick way to play some games', // short description of what this command does
    command: '!play', //command with prefix. Ex command: '!test'
    commandType: 'info', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'type !play and touch any of the buttons on your screen', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};