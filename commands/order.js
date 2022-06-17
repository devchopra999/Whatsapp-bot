//jshint esversion:8
const { Order } = require("whatsapp-web.js");
const execute = async (client,msg/*,args*/) => {
    msg.delete(true);
    const chat = await msg.getChat();
    var O=new Order();
    O.currency="rupees";
    await chat.sendMessage(O); 
};

module.exports = {
    name: 'play', //name of the module
    description: 'a quick way to play some games', // short description of what this command does
    command: '!play', //command with prefix. Ex command: '!test'
    commandType: 'ukvuyj', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'type !play and touch any of the buttons on your screen', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};