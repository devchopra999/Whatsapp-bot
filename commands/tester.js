//jshint esversion:8
const execute = async (client,msg/*,args*/) => {

    const chat = await msg.getChat();
    await chat.sendMessage(JSON.stringify(chat.id));
    var qm=await msg.getQuotedMessage();
    var user=await msg.getContact();
    await chat.sendMessage(qm.type);
    await chat.sendMessage(JSON.stringify(qm));
    const quoted_msg=JSON.stringify(qm);
    const index_waid=quoted_msg.indexOf("waid=");
    const number=quoted_msg.substring(index_waid+5,index_waid+5+12);
    await chat.sendMessage(number);
    await chat.sendMessage(JSON.stringify(qm.vcards));
    // await chat.sendMessage(JSON.stringify(user.id));
        // var hamza = await client.getContactById("919264918617@c.us");
        // await client.sendMessage(hamza.id._serialized,"_Ignore\n\nAutomated By SciBot_");
        // // if(user.id._serialized=="919324708043@c.us" || msg.fromMe){
        // var qm=await msg.getQuotedMessage();
        // const contact= await qm.getContact();

     

};

module.exports = {
    name: 'tester', //name of the module
    description: 'sk', // short description of what this command does
    command: '!tester', //command with prefix. Ex command: '!test'
    commandType: 'nothing', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'sfs', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};