var moment = require('moment');

function RangoDeTiempo(timeStamp1,timeStamp2){

  const start = moment(new Date(timeStamp1));
  const end   = moment(new Date(timeStamp2));

  var days = start.diff(end,'Days',true);
  var hours = start.diff(end,'Hours',true);
  var minutes = start.diff(end,'Minutes',true);

  if (minutes <=60) {
    return('hace '+ parseInt(minutes)+ ' minutos')
  }
  else if(minutes>60 && hours <=24){
    return('hace '+ parseInt(hours)+ ' horas')
  }
  else if (hours>24) {
    return('hace '+ parseInt(days)+' dias')
  }
}

function getDateFormat (timeStamp){
  let dt = new Date(timeStamp);
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}

function getDateHoraFormat (timeStamp){
  let currentdate = new Date(timeStamp);
  var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"+ currentdate.getFullYear() + " "+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":"+ currentdate.getSeconds();
  return datetime ;
}
exports.RangoDeTiempo=RangoDeTiempo;
exports.getDateFormat=getDateFormat;
exports.getDateHoraFormat=getDateHoraFormat;
