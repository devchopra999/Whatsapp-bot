//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const axios = require('axios');
const Levels = require("discord-xp");
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

    let qm= await msg.getQuotedMessage();
    

    //LINK
    let p1="http://api.brainshop.ai/get?bid=162575&key=TNypVw654nQMq6WO&uid=[";
    
    let contact=await msg.getContact();
    let uid=contact.id.user;
    
    let p3="]&msg=["

    let p4=qm.body+"]";

    let LINK=p1+uid+p3+p4;

    
    async function makeGetRequest() {

        let res = await axios.get(LINK);
      
        let data = res.data;
        
        await qm.reply("_"+res.data.cnt+"_");
      }
      
      makeGetRequest();
      
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'ai', //name of the module
    description: 'talk to the bot having an artificial brain', // short description of what this command does
    command: '!ai', //command with prefix. Ex command: '!test'
    commandType: 'info', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'type !ai on any quoted message to use this', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};