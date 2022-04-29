//jshint esversion:8
const { MessageMedia } = require("whatsapp-web.js");
const axios = require("axios");
const formatNum = require("../helpers/formatNum");
const processImage = require("../helpers/processImage");
const { getShortURL } = require("../commands/shorten");
const savefrom_base = "https://sfrom.net/";
const Levels = require("discord-xp");

async function youtube(url) {
  try {
    let data = (
      await axios.get(`https://yoothoob.vercel.app/fromLink?link=${url}`)
    ).data;
    let shortUrl = await getShortURL(savefrom_base + url);
    return {
      title: data.title,
      likes: formatNum(data.stats.likes),
      views: formatNum(data.stats.views),
      comments: formatNum(data.stats.comments),
      image: await processImage(
        data.images[3] ||
          data.images[2] ||
          data.images[1] ||
          data.images[0] ||
          null
      ),
      download_link:
        shortUrl === "error" ? savefrom_base + url : shortUrl.short,
    };
  } catch (error) {
    return "error";
  }
}

const execute = async (client,msg,args) => {
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
if(parseInt(data_level)>=4||cmd_user.isMe){

  const chat= await msg.getChat();

    let data;

    // msg.delete(true);

    if(msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        data = await youtube(quotedMsg.body);
    }
    else {
        data = await youtube(args[0]);
    }

    if (data == "error") {
        await client.sendMessage(chat.id._serialized, `🙇‍♂️ *Error*\n\n` + "```Something Unexpected Happened to fetch the YouTube video```");
    } else {
        await client.sendMessage(chat.id._serialized, new MessageMedia(data.image.mimetype, data.image.data, data.image.filename), { caption: `*${data.title}*\n\nViews: ` + "```" + data.views + "```\nLikes: " + "```" + data.likes + "```\nComments: " + "```" + data.comments + "```\n\n*Download Link* 👇\n" + "```" + data.download_link + "```" });
    }}else{
      await msg.reply("_This Feature Unlocks at Level 4_\n_Type *!lvl* For Your Current Level_");
    }
};


module.exports = {
  name: "YouTube Download",
  description: "Gets download link for youtube video",
  command: "!yt",
  commandType: "plugin",
  isDependent: false,
  help: `*Youtube*\n\nDownload a Youtube video with this command.\n\n*!yt [Youtube-Link]*\nor,\nReply a message with *!yt* to Download`,
  execute,
};
