//jshint esversion:8
const execute = async (client,msg/*,args*/) => {
    msg.delete(true);
    // const chat= msg.getChat();
    var qm= await msg.getQuotedMessage();
    if(msg.hasQuotedMsg){
    try{
    var info=await msg.getInfo();
    }
    catch(error){
        console.log(console.error());
    }
    // if (info){
    //     await qm.reply(JSON.stringify(info));
    //     await qm.reply(JSON.stringify(info.read));
    // }
    
    const dev=await qm.deviceType;
    
    var score=await qm.forwardingScore;
    score=score.toString();
    await qm.reply("*MESSAGE SENT FROM:* "+dev+"\n\n"+"*FORWARDED*: "+ score +" _times_");
    }
};

module.exports = {
    name: 'info', //name of the module
    description: 'get the os and forward count of the message', // short description of what this command does
    command: '!info', //command with prefix. Ex command: '!test'
    commandType: 'info', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'HELP: !info\n\n```type !info while quoting a message to get the device type they are using and the number of times that particular message was forwarded```', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};