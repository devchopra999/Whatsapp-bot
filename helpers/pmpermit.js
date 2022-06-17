//jshint esversion:8
//jshint -W033
const fs = require("fs");
const path = require("path");
const { Client } = require("whatsapp-web.js");
const database = require("../db");

async function insert(id) {
  try {
    var { conn, coll } = await database("pmpermit");
    await coll.updateOne({ number: id, times: 1, permit: false },{upsert: true});
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function updateviolant(id, timesvio) {
  try {
    var { conn, coll } = await database("pmpermit");
    await coll.updateOne({ number: id }, { $set: { times: timesvio } },{upsert: true});
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function read(id) {
  try {
    var { conn, coll } = await database("pmpermit");
    var data = await coll.findOne({ number: id });
    if (data && data.permit) {
      // save the cache for later usage
      fs.writeFileSync(
        path.join(__dirname, `../cache/${id}.json`),
        JSON.stringify({ ...data, found: true })
      );
    }
    return data ? { ...data, found: true } : { found: false };
  } catch (error) {
    return { found: false };
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function permit(id) {
  try {
    var { conn, coll } = await database("pmpermit");
    await coll.updateOne({ number: id }, { $set: { times: 1, permit: true } },{upsert: true});
    fs.writeFileSync(
      path.join(__dirname, `../cache/${id}.json`),
      JSON.stringify({ found: true, number: id, times: 1, permit: true })
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

async function nopermit(id) {
  try {
    var { conn, coll } = await database("pmpermit");
    await coll.updateOne({ number: id }, { $set: { times: 1, permit: false } }),{upsert: true};

    try {
      fs.unlinkSync(`${__dirname}/../cache/${id}.json`);
      console.log(`Deleting cache file for: ${id}`);
    } catch (nofile) {}

    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}
//MESSAGE DELETE SHOW OR NO?
async function msg_del(group,phone,bool) {

  try {
    var { conn, coll } = await database("DeletedMessages");
    await coll.updateOne({ group_id: group, phone_num: phone},{ $set: { show: bool }},{upsert: true});
    return true;
  } catch (error) {
    return false;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}



//-----------------TAG FINDER STARTS-----------------------
async function Tag_Saver(id,msg,tagger,tagged_one,Chat_id) {

    try {
      var { conn, coll } = await database("TaggedMessages");
      await coll.insertOne({ number: id, message: msg, Tagged_By: tagger, TaggedOne: tagged_one, Chat: Chat_id});
      return true;
    } catch (error) {
      return false;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function FT(id) {
    try {
      var { conn, coll } = await database("Tagged Messages");
      var data = await coll.find({ number: "917042053980" })
      
      // await chat.sendMessage("HI");
      // await chat.sendMessage(data);
      // await chat.sendMessage(JSON.stringify(data));
      await chat.sendMessage(JSON.stringify({ ...data, found: true }));
      if (data && data.permit) {
          // await chat.sendMessage("_Almost there_")
        // await chat.sendMessage(JSON.stringify({ ...data, found: true }));
        
        // save the cache for later usage
        fs.writeFileSync(
          path.join(__dirname, `../cache/tags.json`),
          JSON.stringify({ ...data, found: true })
        );
      }
      return data ? { ...data, found: true } : { found: false };
    } catch (error) {
      return { found: false };
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

  async function Tag_Msg_Reader(id) {
    try {
      try {
        var checkPermit = JSON.parse(
          fs.readFileSync(path.join(__dirname, `../cache/tags.json`), "utf8")
        );
        // await chat.sendMessage(msg.to,"Tag_Msg_Reader Func is working");
        // await chat.sendMessage(msg.to,checkPermit.message);
      } catch (error) {
          console.log("Error");
      }
      return checkPermit.message;
    } catch (e) {
      return true;
    }
  }

  //----------------TAG FINDER ENDS------------------
  

async function handler(id) {
  // first check for cache

  try {
    var checkPermit = JSON.parse(
      fs.readFileSync(path.join(__dirname, `../cache/${id}.json`), "utf8")
    );
  } catch (error) {
    var checkPermit = await read(id);
  }

  if (!checkPermit.found) {
    await insert(id);
    return {
      permit: false,
      block: false,
      msg: `*✋ Wait*\n\nPlease wait he'll get back to you.\n\n_Powered by SciBot_`,
    };
  } else if (checkPermit.found && !checkPermit.permit) {
    if (checkPermit.times > 3) {
      return {
        permit: false,
        block: false,
        msg: `*✋ Wait*\n\nPlease wait he'll get back to you.\n\n_Powered by SciBot_`,
        // msg: `*❌ Blocked*\n\n You have been blocked for spamming.\n\n _Powered by SciBot_`,
      };
    } else {
      var updateIt = await updateviolant(id, checkPermit.times + 1);
      if (!updateIt) {
        console.log(
          `That's an error, Possible reason is your MongoDB url is not working ❌`
        );
      }
      return {
        permit: false,
        block: false,
        msg: `*✋ Wait*\n\nPlease wait he'll get back to you.\n\n_Powered by SciBot_`,
      };
    }
  } else {
    return { permit: true, block: false, msg: null };
  }
}

async function isPermitted(id) {
  try {
    try {
      var checkPermit = JSON.parse(
        fs.readFileSync(path.join(__dirname, `../cache/${id}.json`), "utf8")
      );
    } catch (error) {
      var checkPermit = await read(id);
    }
    return checkPermit.permit;
  } catch (e) {
    return true;
  }
}

module.exports = {
  handler,
  permit,
  nopermit,
  isPermitted,
  Tag_Saver,
  FT,
  Tag_Msg_Reader,
  msg_del,
};
