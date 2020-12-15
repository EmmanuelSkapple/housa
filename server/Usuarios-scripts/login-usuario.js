
function Loggeo(dataBase,idUser) {
  var ref=dataBase.ref("Usuarios/"+idUser);
  let respuesta = ref.once('value');
  return respuesta;
}

exports.Loggeo=Loggeo;
