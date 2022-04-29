
const axios = require('axios');
const LINK= "https://api.clashofclans.com/v1/clans/%232LVCVVRYU/currentwar"
const headers={
    "Accept": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImIxYmE0OGFhLTg0MDktNDg1Ny05ZTdmLWJkZjVjODgwMTg1NiIsImlhdCI6MTY0NzA3MzM4NSwic3ViIjoiZGV2ZWxvcGVyLzkxMWRiNjJmLTkzNmYtYjUwOS1mNmJmLTBmMTcxYjgxNGNmYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjAuMC4wLjAiXSwidHlwZSI6ImNsaWVudCJ9XX0.rOMJDZlibgUzZBjlpvatGQoCcoXXdmFwBmdlYBRkc0IlQvFHr5Gm6irQhP2MZJFXcet9mgviLzfNBOkLqsPqkw"
}
    async function makeGetRequest() {

    let res = await axios.get(LINK,{headers:headers});
  
    let data = res.data;
    
    console.log(res.data.state);
  }
  makeGetRequest();