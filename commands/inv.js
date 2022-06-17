//jshint esversion:8
const execute = async (client,msg/*,args*/) => {
    msg.delete(true);
    const chat= await msg.getChat();
    if(chat.isGroup){
        const inv = await chat.getInviteCode();
        await chat.sendMessage("*Here's The Group Invite Link*\n\n"+"https://chat.whatsapp.com/"+inv+"\n\n"+"_This Message is Automated by SciBot_");

    }
};

module.exports = {
    name: 'inv', //name of the module
    description: 'get the group invite link', // short description of what this command does
    command: '!inv', //command with prefix. Ex command: '!test'
    commandType: 'group', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'HELP: !inv\n\n```Type !inv to get the group invite link\nOR\nJust ask for it in any way you can form the sentence```', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};