//jshint esversion:8
// Coded by Sumanjay (https://github.com/cyberboysumanjay)
const Levels = require("discord-xp");
const axios = require('axios');

async function getShortURL(input) {
    let mainconfig = {
        method: 'get',
        url: `https://da.gd/s?url=${input}` 
    };
    return axios(mainconfig)
        .then(async function (response) {
            let shortened = response.data;
            let out = ({
                input: input,
                short: shortened.replace(/\n/g, '')
            });
            return out;
        })
        .catch(function (error) {
            return "error";
        });
}
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
    let data;
    if(msg.hasQuotedMsg){
        let quotedMsg = await msg.getQuotedMessage();
        data = await getShortURL(quotedMsg.body);
    }
    else{
        data = await getShortURL(args[0]);
    }

    if (data == "error") {
        await client.sendMessage(msg.to, `🙇‍♂️ *Error*\n\n` + "```Please make sure the entered URL is in correct format.```");
    }
    else {
        await client.sendMessage(msg.to, `Short URL for ${data.input} is 👇\n${data.short}`);
    }
}else{
    await msg.reply("_This Feature Unlocks at Level 1_\n_Type *!lvl* For Your Current Level_");
  }
};


module.exports = {
    name: 'Shorten Link',
    description: 'get shortend link for the given url',
    command: '!shorten',
    commandType: 'plugin',
    isDependent: false,
    help: `*Shorten Link*\n\nCreates short URL for any valid URL. \n\n*!shorten [valid-url]*\n`,
    getShortURL,
    execute};