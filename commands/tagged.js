const pmpermit = require("../helpers/pmpermit");
const execute = async (client,msg/*,args*/) => {
    // await client.sendMessage(msg.to,"lets go save.js");

    const chat = await msg.getChat();
    //   await  chat.sendMessage("Save.js");
      var contact=await msg.getContact();
      var user_id=contact.pushname;
      var chat_id=chat.id._serialized;


      if(contact.id.user=="917042053980"){
          user_id="Scimitar";
      } 
    //   await chat.sendMessage(JSON.stringify(chat_id));
        
    var idx=msg.body.indexOf("@");
        var leftremoved=msg.body.substring(idx);
        var rightspace_idx=leftremoved.indexOf(" ");
        var tagged_num="";
        try{
        tagged_num=leftremoved.substring(1,rightspace_idx);
        }
        catch (error){
            console.log("hemlo");
        }
        if(rightspace_idx==-1){
            tagged_num=leftremoved.substring(1);
        }

    const mentions = await msg.getMentions();

    for(let ct of mentions){
        // await chat.sendMessage(`${ct.pushname}`);
        
        var tagged_one=ct.pushname;
        // await chat.sendMessage(tagged_one);
        // await client.sendMessage(msg.to,tagged_num.substring(1));
        // const mentions = await msg.getMentions();
    try{
        //NEW FEATURE OKKKK

    let val= await pmpermit.Tag_Saver(tagged_num,msg.body,user_id,tagged_one,chat_id);

    // await chat.sendMessage("Tag Saved");
    }
    catch (error){
        await client.sendMessage(msg.to,"_TS Function Not Working, Please Notify Scimitar About This If You See This Message_");
    }

}
    // await client.sendMessage(msg.to,"saved");
};

module.exports = {
    name: 'tagged', //name of the module
    description: 'saves tags ', // short description of what this command does
    command: '!tagged', //command with prefix. Ex command: '!test'
    commandType: 'none', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'yhfj', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};