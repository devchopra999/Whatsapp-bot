//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const Levels = require("discord-xp");
const execute = async (client,msg) => {
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
// console.log(parseInt(data_level));
if(cmd_user.isMe||parseInt(data_level)>=2){

    const chat = await msg.getChat();
    const idk=await chat.id._serialized;
    let contact=await msg.getContact();
    if(contact.isMyContact || contact.isMe){
    let quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        await client.sendMessage( idk, new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename), { sendMediaAsSticker: true ,stickerAuthor:"Scimitar"});
    } else { 
        await client.sendMessage(idk, `🙇‍♂️ *Error*\n\n` + "```No image found to make a Sticker```");
    }
}
else{
    await msg.reply("*Scimitar Has Revoked Your Access To This Command!*");
}
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }

};

module.exports = {
    name: 'Sticker Maker',
    description: 'generates sticker from image',
    command: '!sticker',
    commandType: 'plugin',
    isDependent: false,
    help: `*Sticker Maker*\n\nCreate sticker from Image.\n\nReply an image with *!sticker* to get a sticker of that image.`,
    execute};