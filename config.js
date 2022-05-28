const fs = require("fs");
require("dotenv").config();

module.exports = {
  // session: JSON.parse(
  //   process.env.SESSION ||
  //     fs.readFileSync(__dirname + "/session.json", { encoding: "utf8" })
  // ),
  session_key: process.env.SESSION_KEY,
  pmpermit_enabled: process.env.PMPERMIT_ENABLED || "true",
  mongodb_url: process.env.MONGODB_URL || process.env.MONGO_URL || "",
  default_tr_lang: process.env.DEFAULT_TR_LANG || "en",
  group_delete_alert: process.env.GROUP_DELETE_ALERT || "ON",
  ocr_space_api_key: process.env.OCR_SPACE_API_KEY || "",
  userbot:process.env.USER_BOT||false,
  ppt_path:process.env.Puppeteer_Path||"",
  dm_del:process.env.DM_DELETE_ALERT || "ON",
  spam_lmt:process.env.SPAM_LIMIT || "ON",
  RG:process.env.REMOVE_BG_API_KEY||"",
};
