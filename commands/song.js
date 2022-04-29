//jshint esversion:8
const fs = require("fs");
const path = require("path");
const { search } = require("../helpers/song");

const execute = async (client, msg, args) => {
  // msg.delete(true);
  const chat = await msg.getChat();
  const idk=await chat.id._serialized;
  let getdata = await search(args.join(" "));
  let sendmessage = await client.sendMessage(idk, getdata.content); // have to grab the message ID
  if (getdata.status) {
    fs.writeFileSync(
      path.join(__dirname, `../cache/song~${sendmessage.id.id}.json`),
      JSON.stringify(getdata.songarray)
    );
  }
};

module.exports = {
  name: "Search Song",
  description: "Search songs on jiosaavn",
  command: "!song",
  commandType: "deprecated",
  isDependent: false,
  help: `*Song*\n\nSearch a song and download it. \n\n*!song [search-query]*\nEx: !song makhna\n\nThen replay the message with *!dldsong [id]*\nEx. !dldsong 1\n\n⚡ Powered by musicder.net`,
  execute,
};
