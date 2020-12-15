const request = require('./request-script.js');

async function getProfiles(){
  let versionPrefix = 'v2';
  return request({method: 'GET', path: `/profiles`, versionPrefix});
}
async function getBorderLessAccount({profileId= '16064659',versionPrefix= 'v2'}){
  // let profileId= '16064659';
  // let versionPrefix= 'v2';
  return request({
      method: 'GET',
      path: `/borderless-accounts?profileId=${profileId}`,
      versionPrefix,
    });
}
// async function getCurrent({quoteId,uuid,borderlessAccountId='15721',versionPrefix = 'v1'}){
//       // let borderlessAccountId = '15721';
//       return request({data: {quoteId},
//         headers: {'X-idempotence-uuid': uuid,},
//         method: 'POST',
//         path: `/borderless-accounts/${borderlessAccountId}/conversions`,
//         versionPrefix,
//       });
// }
async function CreateQuotes({data,versionPrefix= 'v1'}){
     return request({data,method: 'POST',path: `/quotes`,versionPrefix,});
}
async function GetQuotes({quoteId,versionPrefix= 'v1'}){
  return request({method: 'GET',path: `/quotes/${quoteId}`,versionPrefix,});
}
