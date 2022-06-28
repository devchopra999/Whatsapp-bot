const execute = async (client,msg/*,args*/) => {
    try{
        var qm=await msg.getQuotedMessage();
        var reaction=msg.body.substring(7);
        msg.delete(true);
        qm.react(reaction);
    }
    catch(e){
        console.log(error);
    }
};

module.exports = {
    name: 'react', //name of the module
    description: 'React with any emoji on the quoted message', // short description of what this command does
    command: '!react', //short description of what this command doeswith prefix. Ex command: '!test'
    commandType: 'plugin', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: '*HELP !react*\n\nJust type !react followed by any emoji on a quoted message(slide left to right on any message) NOTE: MAKE SURE THAT THERE IS A SPACE AFTER !react & NOTHING AFTER REACTION\ne.g. !react 😀', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};