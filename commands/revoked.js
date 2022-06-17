const Levels = require("discord-xp");
const pmpermit = require("../helpers/pmpermit");
const execute = async (client, msg/*,args*/) => {
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
    if (chat.isGroup) {

        var contact = await msg.getContact();
        console.log("\n\n");
        console.log(JSON.stringify(contact));
        var contact_admin=false;
        for(let participant of chat.participants) {
            // const contact = await client.getContactById(participant.id._serialized);
            if(participant.id._serialized==contact.id._serialized){
                if(participant.isAdmin||participant.isSuperAdmin){
                    contact_admin=true;
                    console.log(contact_admin);
                    break;
                }
                else{
                    await msg.reply("_Only The Group Admins Of This Group Can Control The Deleted Messages_");
                    break;
                }
            }
            
        }



        if (contact_admin||contact.isMe) {
            
            var user_id = contact.pushname;
            var chat_id = chat.id._serialized;
            const person = await msg.getMentions();
            var value = true;
            if (msg.body.toLowerCase().includes("false")) {
                value = false;
            }
            else if (msg.body.toLowerCase().includes("true")) {
                value = true;
            }

            if (contact.id.user == "917042053980") {
                user_id = "Scimitar";
            }

            let val = await pmpermit.msg_del(chat.id._serialized, person[0].id._serialized, value);
            if (value == true) {
                await chat.sendMessage("_ALL deleted text messages will be shown_");
            }
            else if (value == false) {
                await chat.sendMessage("_NO deleted text messages will be shown_");
            }
        }

    }
}else{
    await msg.reply("_This Feature Unlocks at Level 3_\n_Type *!lvl* For Your Current Level_");
  }


};

module.exports = {
    name: 'revoked', //name of the module
    description: 'Control deleted messages of members of a group', // short description of what this command does
    command: '!revoked', //command with prefix. Ex command: '!test'
    commandType: 'group', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'HELP: !revoked\n\n```Use this to configure if the bot should display the deleted messages of a specific person or not\n\nUsage Example\n"!revoked @Scimitar true"\nOR\n"!revoked @Scimitar false"```', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute
};