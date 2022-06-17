//jshint esversion:8
const Levels = require("discord-xp");
//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const config = require("../config");

const execute = async (client,msg,args) => {
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
if(parseInt(data_level)>=1||cmd_user.isMe){

    const chat = await msg.getChat();
    const idk=await chat.id._serialized;

    // msg.delete(true);
    let contact=await msg.getContact();
    if(contact.isMyContact || contact.isMe){
    let count = Number(args.shift());
    count=parseInt(count);
    console.log(count);
    if(config.spam_lmt=="ON"&&count>10){
        console.log("working");
        count=parseInt(count);
        count=10;
        await client.sendMessage(idk,"*Sorry, you are not allowed to spam a text more than 10 times*");
        return 0;
    }
    if (isNaN(count)) {
        await client.sendMessage(idk, `🙇‍♂️ *Error*\n\n` + "```Invalid count```");
        return 0;
    }
    if (count > 0)
        count = parseInt(count);
    else {
        await client.sendMessage(idk, `🙇‍♂️ *Error*\n\n` + "```Count can't be zero.```");
        return 0;
    }
    
    if (msg.hasQuotedMsg) { 
        let quotedMsg = await msg.getQuotedMessage();
        
        if (quotedMsg.hasMedia) {
            let media = await quotedMsg.downloadMedia();
            let sticker = false;
            if (quotedMsg.type == "sticker")
                sticker = true;
            
            for (let i = 0; i < count; i++)
                await client.sendMessage(idk, new MessageMedia(media.mimetype, media.data, media.filename), { sendMediaAsSticker: sticker });
        } 
        else if(!quotedMsg.body.toLowerCase().startsWith("!all") && !quotedMsg.body.toLowerCase().startsWith("! all") && !quotedMsg.body.toLowerCase().startsWith("! findtags") && !quotedMsg.body.toLowerCase().startsWith("!findtags")) {
            // if(config.spam_lmt=="ON"&&count>10){
            //     count=parseInt(count);
            //     count=10;
            //     await client.sendMessage(idk,"*Sorry, you are not allowed to spam a text more than 10 times*");
            //     return 0;
            // }
            
            for (let i = 0; i < count; i++){
                await client.sendMessage(idk, quotedMsg.body);
            }
        }
    }
    else {
        if (args.length) {
            // count=parseInt(count);
            // if(config.spam_lmt=="ON"&&count>10){
                
            //     count=10;
            //     await client.sendMessage(idk,"*Sorry, you are not allowed to spam a text more than 10 times*");
            //     return 0;
            // }
            let text = args.join(' ');
            if(text.toLowerCase()!="!all" && text.toLowerCase()!="! all" && text.toLowerCase()!="!findtags" && text.toLowerCase()!="! findtags")
            for (let i = 0; i < count; i++)
                await client.sendMessage(idk, text);
        } else {
            await client.sendMessage(idk, "```No text found for spamming!!! Please read !help spam.```");
        }
        
    }
}
else{
    await msg.reply("*Scimitar Has Revoked Your Access To This Command!*");
}}else{
    await msg.reply("_This Feature Unlocks at Level 1_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'Spam',
    description: 'spams a certain message for given number of times',
    command: '!spam',
    commandType: 'plugin',
    isDependent: false,
    help: `*Spam*\n\nSpam Messages. \n\n*!spam [count text]*\nOR\nreply *!spam [count]* to any message`,
    execute};