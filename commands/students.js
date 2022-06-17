//jshint esversion:8
const Levels = require("discord-xp");
const execute = async (client, msg, args) => {
  msg.delete(true);
  //discord-xp
  var cmd_user = await msg.getContact();
  if (!cmd_user.isMe) {
    try {
      const data = await Levels.fetch(cmd_user.id.user, "Global", false);
      var data_level = data.level;
      console.log("discord-xp");
      console.log(data_level);
    } catch (error) {
      console.log(error);
    }
  }

  //feature
  console.log(parseInt(data_level));
  if (parseInt(data_level) >= 2 || cmd_user.isMe) {
    const chat = await msg.getChat();

    let contact1 = await msg.getContact();
    if (contact1.isMyContact || contact1.isMe) {
      let text = `@${contact1.id.user} *MENTIONED EVERYONE*`;
      // await msg.reply(JSON.stringify(contact1));
      let mentions = [];

      for (let participant of chat.participants) {
        if (!participant.isAdmin && !participant.isSuperAdmin) {
          const contact = await client.getContactById(
            participant.id._serialized
          );

          mentions.push(contact);
        }
        // text += `@${participant.id.user} `;
      }
      mentions.push(cmd_user);
      // await chat.sendMessage(text + `\n\n*This Message is Automated by SciBot Because of !everyone command*`, { mentions });
      if (args.length) {
        let message = args.join(" ");
        await chat.sendMessage("```" + message + "```", { mentions });
      } else {
        await chat.sendMessage(
          text +
            `\n\n_This Message is Automated by SciBot Because of !students command_`,
          { mentions }
        );
      }
    } else {
      await msg.reply("*Scimitar Has Revoked Your Access To This Command!*");
    }
  } else {
    await msg.reply(
      "_This Feature Unlocks at Level 2_\n_Type *!lvl* For Your Current Level_"
    );
  }
};

module.exports = {
  name: "students", //name of the module
  description: "tag non-admins in a group", // short description of what this command does
  command: "!students", //command with prefix. Ex command: '!test'
  commandType: "group", //
  isDependent: false, //whether this command is related/dependent to some other command
  help: "Type !students in the chat to tag all group members", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
  execute,
};
