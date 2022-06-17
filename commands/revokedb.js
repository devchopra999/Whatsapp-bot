const database = require("../db");
const pmpermit = require("../helpers/pmpermit");
const execute = async (client,msg/*,args*/) => {
  // msg.delete(true);
    var temp_chat=await msg.getChat();
    await temp_chat.sendMessage("w");
    var temp_contact= await msg.getContact();
    var extracted_array="";
     try{
       var { conn, coll } = await database("DeletedMessages");
       
     
     
       var query = {phone_num:temp_contact.id._serialized};
       await temp_chat.sendMessage(temp_contact.id._serialized);
   
       var data = await coll.findOne(query);
     }
       catch(error){
         console.log(error);
       }
       await temp_chat.sendMessage("w");   
       console.log("\n\nhere");
       console.log(data.show);
    await temp_chat.sendMessage(data);
};

module.exports = {
    name: 'revokedb', //name of the module
    description: 'sdk', // short description of what this command does
    command: '!revokedb', //command with prefix. Ex command: '!test'
    commandType: 'dkj', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'olhv', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};