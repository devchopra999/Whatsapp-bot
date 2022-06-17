//jshint esversion:8
const translate = require("@iamtraction/google-translate");
const config = require("../config");
const tr_languages = require("../helpers/tr_languages");
const Levels = require("discord-xp");
async function translator(langReq, text) {
    let lang;
    if (!langReq || langReq == "def") {
        lang = config.default_tr_lang;
    } else {
        lang = langReq;
    }

    return translate(text, { to: lang })
        .then((res) => {
            return {
                original: text,
                ori_lang: res.from.language.iso,
                translated: res.text,
                trans_lang: lang,
            };
        })
        .catch((err) => {
            return "error";
        }); 
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
    let data;
    
    if (msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        let langText = getLanguageandText(args);
        data = await translator(langText.lang, quotedMsg.body);
    } else {
        let langText = getLanguageandText(args);
        data = await translator(langText.lang, langText.text);
    }

    if (data == "error") {
        await client.sendMessage(
            idk,
            `🙇‍♂️ *Error*\n\n` + "```Something Unexpected Happened while translating```"
        );
    } else {
        await client.sendMessage(
            idk,
            `*Original (${data.ori_lang}) :* ` +
            "```" +
            data.original +
            "```\n\n" +
            `*Translation (${data.trans_lang}) :* ` +
            "```" +
            data.translated +
            "```"
        );
    }
}else{
    await msg.reply("_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_");
  }
};

function getLanguageandText(args) {
    let lang;
    let text;

    if (args[0]) {
        let getLangFromFullname = tr_languages().find(fullName => fullName.matchName === args[0].toLowerCase()); // match the full name
        let getLangFromCode = tr_languages().find(shortName => shortName.code === args[0].toLowerCase()); // match the lang code

        if (getLangFromFullname || getLangFromCode) {
            // its mean firt argument is a language
            lang = (getLangFromCode || getLangFromFullname).code;
            text = args.slice(1).join(" ");
        } else {
            noLangArgs();
        }
    } else {
        noLangArgs();
    }

    function noLangArgs() {
        lang = config.default_tr_lang || "en";
        text = args.join(" ");
    }

    return { lang, text };
}

module.exports = {
    name: "Translator",
    description: "Translates given text to requested language",
    command: "!tr",
    commandType: "plugin",
    isDependent: false,
    help: `*Translator*\n\nIt will translate text in different languages.\n\n_Usage:_\n1. *!tr [Text]*\n2. Reply with *!tr*\n3. *!tr [Output-Language] [Text]*\n4.Reply with \n*!tr [Output-Language]*`,
    execute,
};
