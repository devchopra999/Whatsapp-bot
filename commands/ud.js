//jshint esversion:8
const dictionary = require("urban-dictionary");
const Levels = require("discord-xp");
async function ud(term) {
  try {
    return await dictionary.define(term);
  } catch (error) {
    return "error";
  }
}

const execute = async (client, msg, args) => {
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
    const idk=await chat.id._serialized;
  // msg.delete(true);
  let data = await ud(args.join(" "));
  if (data == "error") {
    await client.sendMessage(
      idk,
      `🙇‍♂️ *Error*\n\n` +
        "```Something Unexpected Happened while Lookup on Urban Dictionary```"
    );
  } else {
    await client.sendMessage(
      idk,
      "*Term:* ```" +
        args.join(" ") +
        "```\n\n" +
        "*Definition:* ```" +
        data[0].definition +
        "```\n\n" +
        "*Example:* ```" +
        data[0].example +
        "```"
    );
  }
}else{
  await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
}

};

module.exports = {
  name: "Urban Dictionary",
  description: "Gets dictionary meanings of words",
  command: "!ud",
  commandType: "plugin",
  isDependent: false,
  help: `*Urban Dictionary*\n\nUrban Dictionary is a crowdsourced online dictionary for slang words and phrases.\n\n*!ud [Word]*\nto search a word using Urban Dictionary`,
  execute,
};