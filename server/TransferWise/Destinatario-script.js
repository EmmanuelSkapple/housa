const request = require('./request-script.js');


async function CrearDestinatario(){
  let versionPrefix= 'v1';
  let perfilID='16064659';
  let data = {
    profile: '16064659',
    firstName: "Pedro",
    lastName: "Miranto",
    accountHolderName: "Pedro Martion",
    currency: "USD",
    type: "aba",
    details: {
     legalType: "PRIVATE",
     abartn: "111000025",
     accountNumber: "12345678",
     accountType: "CHECKING",
     address : {
        country: "GB",
        city: "London",
        postCode: "10025",
        firstLine: "50 Branson Ave"
       }
     }
  }
  return request({data,method: 'POST',path: `/accounts`,versionPrefix,});
}
async function TomarDestinatarioByID({accountID,versionPrefix= 'v1'}){
  return request({method: 'GET',path: `/accounts/${accountID}`,versionPrefix,});
}
async function TomarListaDestinatario(){
  let versionPrefix= 'v1';
  let perfilID='16064659';
  let currency='USD';
  return request({method: 'GET',path: `/account?profiel=${perfilID}&currency=${currency}`,versionPrefix,});
}
async function CreateQuotes(){
  let versionPrefix= 'v1';
  let data ={
    profile: '16064659',
    source: "EUR",
    target: "USD",
    rateType: "FIXED",
    targetAmount: 600000,
    type: "BALANCE_PAYOUT"
  }
     return request({data,method: 'POST',path: `/quotes`,versionPrefix,});
}
async function EliminarDestinatarioByID({accountID,versionPrefix= 'v1'}){
  return request({method: 'DELETE',path: `/accounts/${accountID}`,versionPrefix,});
}
async function Requier(){
  let versionPrefix= 'v1';
  let Destinatario = await CrearDestinatario();
  //Destinatario.id = 16064659;
  //Qoute.id = 4463712;
  let Quote = await CreateQuotes()
  let data ={
    targetAccount:Destinatario.id,
    quote:Quote.id,
    customerTransactionId:123,
  }
  return request({data,method: 'POST',path: `/transfer-requirements`,versionPrefix,});

}


exports.Requier = Requier;
