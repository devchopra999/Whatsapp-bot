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
if(parseInt(data_level)>=3||cmd_user.isMe){

    const chat = await msg.getChat();

    if(msg.hasQuotedMsg){
        var user=await msg.getContact();
        // var me = await client.getContactById("917042053980@c.us");
        // if(user.id._serialized=="919324708043@c.us" || msg.fromMe){
        var qm=await msg.getQuotedMessage();
        
        var contact= await qm.getContact();
        var arr=[contact.id._serialized];
        
        if(qm.type=="vcard"){
            const quoted_msg=JSON.stringify(qm);
            const index_waid=quoted_msg.indexOf("waid=");
            const number=quoted_msg.substring(index_waid+5,index_waid+5+12);
            contact= await client.getContactById(number+"@c.us");
            arr=[contact.id._serialized]
            // console.log(number);
        }
        // await chat.sendMessage(JSON.stringify(contact));
        // console.log(JSON.stringify(me));


        var me_admin=false;
        var isInGroup=false;
        var user_admin=false;
        for(let participant of chat.participants) {
            const contact2 = await client.getContactById(participant.id._serialized);
            if(contact2.isMe){
                if(user.id._serialized==contact2.id._serialized && participant.isAdmin){
                    user_admin=true;
                }
                if(participant.isAdmin||participant.isSuperAdmin){
                    me_admin=true;
                    break;
                }
                else{
                    await chat.sendMessage("_Scibot isn't the admin of this group_");
                    break;
                }
            }
            else if(user.id._serialized==contact2.id._serialized && participant.isAdmin){
                user_admin=true;
            }
            if(contact.id._serialized==contact2.id._serialized){
                isInGroup=true;
                await chat.sendMessage("_The contact you are trying to add is already added to the group!_");
            }
            

            
        }


        
        // if(me.isAdmin||me.isSuperAdmin){
        //     me_admin=true;
        // }
        console.log(me_admin);
        // console.log(JSON.stringify(contact));
        // console.log(number);
        if(qm.type!="vcard"){
        if(!qm.fromMe && arr.length==1 && !contact.isSuperAdmin && me_admin==true&&isInGroup==false&&user_admin==true){
            if(contact.isWAContact){
                chat.addParticipants(arr);
            }
            else{
                await chat.sendMessage("_The Contact You Are Trying To Add is Not a Whatsapp Contact_");
            }
        }
    }
    else{
        if(!contact.isMe&&arr.length==1 && !contact.isSuperAdmin && me_admin==true&&isInGroup==false&&user_admin==true){
            if(contact.isWAContact){
                chat.addParticipants(arr);
            }
            else{
                await chat.sendMessage("_The Contact You Are Trying To Add is Not a Whatsapp Contact_");
            }
        }

    }
        if(user_admin==false){
            await chat.sendMessage("_You are not the admin of this group_");
        }
        
    }
}else{
    await msg.reply("_This Feature Unlocks at Level 3_\n_Type *!lvl* For Your Current Level_");
  }


};

module.exports = {
    name: 'add', //name of the module
    description: 'add someone to the group (ADMIN ONLY)', // short description of what this command does
    command: '!add', //command with prefix. Ex command: '!test'
    commandType: 'group', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'HELP: !add\n\n```Just use !add while quoting a message of someone you want to add\nOR\nuse !a while quoting a contact card to add that contact```', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};