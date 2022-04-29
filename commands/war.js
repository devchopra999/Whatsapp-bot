const axios = require('axios');
const execute = async (client,msg/*,args*/) => {
    const LINK= "https://api.clashofclans.com/v1/clans/%232LVCVVRYU/currentwar"
    const chat=await msg.getChat();
    const headers={
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQwMjcwYTdhLTA4MzQtNDE3Ni1hZjQ1LTkyOGZmMGJhZDUxNyIsImlhdCI6MTY0NzA2ODc4Miwic3ViIjoiZGV2ZWxvcGVyLzkxMWRiNjJmLTkzNmYtYjUwOS1mNmJmLTBmMTcxYjgxNGNmYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjEyMi4xNzcuOTYuMjM1Il0sInR5cGUiOiJjbGllbnQifV19.x0eyZoAJ4ljuWohfMHv29T2IlDUbQit_trcXGS94PzMXBglEIxuRivtp_j7mLvWcFC7FPTS72Iih86lrcA_wKg"
    }
        async function makeGetRequest() {
    
        let res = await axios.get(LINK);
      
        let data = res.data;
        
        console.log(res.data.state);
        await chat.sendMessage(res.data.state);
      }
      makeGetRequest();
};

module.exports = {
    name: 'war', //name of the module
    description: 'Get Details About Current War', // short description of what this command does
    command: '!war', //command with prefix. Ex command: '!test'
    commandType: 'COC', // admin|info|plugin
    isDependent: false, //whether this command is related/dependent to some other command
    help: 'kbkjdnc', // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
    execute};