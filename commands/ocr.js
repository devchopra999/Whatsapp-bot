//jshint esversion:8
const ocrSpace = require('ocr-space-api-wrapper');
const Levels = require("discord-xp");
const config = require('../config');

async function readImage (attachmentData) {
  try {    
    const res = await ocrSpace(`data:image/png;base64,${attachmentData.data}`, { apiKey: `${config.ocr_space_api_key}` });
    let parsedText = res.ParsedResults[0].ParsedText;
    let out = ({
        parsedText: parsedText
    });
    return out;
  } 
  catch (error) {
    return "error";
  }
}

const execute = async (client,msg) => {
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
    msg.delete(true);
    if(msg.hasQuotedMsg){
        let quotedMsg = await msg.getQuotedMessage();
        let attachmentData = await quotedMsg.downloadMedia();
        let data = await readImage(attachmentData);
        if (data == "error") {
            quotedMsg.reply(`Error occured while reading the image. Please make sure the image is clear.`);
        } else {
            quotedMsg.reply(`*Extracted Text from the Image*  👇\n\n${data.parsedText}`);
        }
    }
    
    else{
        await chat.sendMessage(msg.to,'```Please reply to an image with text in it```');
    }
}else{
    await msg.reply("_This Feature Unlocks at Level 1_\n_Type *!lvl* For Your Current Level_");
  }
};

module.exports = {
    name: 'OCR',
    description: 'Extracts text content from given image',
    command: '!ocr',
    commandType: 'plugin',
    isDependent: false,
    help: `*OCR*\n\nReads text from any readable image. \n\n*Reply a photo with !ocr to read text from that image.*\n`,
    execute};