var Registro=require('./registro-usuario.js');
var Loggeo=require('./login-usuario.js');
var Perfil=require('./perfil-usuario.js');
var moment = require('moment');

function registroUsuarios (req,res,dataBase,Auth) {
  let Email = req.body.Email;
  let Nombre = req.body.Nombre;
  let Apellido = req.body.Apellido;
  let Telefono = req.body.Telefono;
  let Pass = req.body.Pass;

  let promesaRegistro = Registro.Registro(Auth,dataBase,Email,Nombre,Apellido,Telefono,Pass)
  promesaRegistro.then(function(value){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}

function loggeoUsuarios (req,res,dataBase) {
  let idUser = req.body.idUser;

  let promesaRegistro = Loggeo.Loggeo(dataBase,idUser)
  promesaRegistro.then(function(user){
    if (user.val()) {
      if (user.val().Status == 0) {
        res.send({status:'303'});
      }
      else if(user.val().Status == 1){
        let today=moment(new Date());
        let final=moment(user.val().fechaVencimiento);

        let dif=final.diff(today,'days');
        if(parseInt(dif)<=parseInt(0)){
          res.send({status:'OUT',mode:0,days:0});
        }
        else if(parseInt(dif)>=parseInt(10)){
          res.send({status:'NEAR',mode:0,days:dif});
          FijarultimaConexion(dataBase,idUser,req.body.ultimaConexion);
        }
        else {//en orden
          res.send({status:'OK',mode:0});
          FijarultimaConexion(dataBase,idUser,req.body.ultimaConexion);

        }
      }
      else if(user.val().Status == 2){
        if (user.val().idUser =='GZtNzf23HqXBEysztnLPKatovgw1') {
          res.send({status:'OK',mode:1});
        }
        else{
          res.send({status:'OK',mode:0});
          FijarultimaConexion(dataBase,idUser,req.body.ultimaConexion);
        }
      }
      else if(user.val().Status == 3){
        if (user.val().idUser =='GZtNzf23HqXBEysztnLPKatovgw1') {
          res.send({status:'OK',mode:3});
        }
        else{
          res.send({status:'OK',mode:0});
          FijarultimaConexion(dataBase,idUser,req.body.ultimaConexion);
        }
      }
      else{

      }
    }
    else{
      res.send({status:'404'});
    }
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}

function ActualizarTokenNotificacion(req,res,dataBase){
  var refDaComponentes = dataBase.ref("Usuarios/"+req.body.idCliente);
  if (req.body.EsRondinero) {
    refDaComponentes = dataBase.ref("Rondineros/"+req.body.idCliente+'/'+req.body.idRondinero);
  }
  refDaComponentes.update({
    tokenNotificacion:req.body.tokenNotificacion,
  })
}

function FijarultimaConexion(dataBase,idUser,ultimaConexion){
  var refDaComponentes = dataBase.ref("Usuarios/"+req.body.idCliente);
  refDaComponentes.update({
    ultimaConexion:ultimaConexion,
  })
}

function TomarPerfil(req,res,dataBase){
  let idUser = req.body.idUser.uid;
  let promesaGetPerfil = Perfil.Tomar(dataBase,idUser)
  promesaGetPerfil.then(function(user){
    let usuario=user.val()
    delete usuario.Tarjetas;
    delete usuario.Direcciones;

    if (user.val()) {
      if (user.val().Bloqueado) {
        res.send({status:'401'});
      }
      else{
        res.send({status:false,value:usuario});
      }
    }
    else{
      res.send({status:'404'});
    }
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}


exports.registroUsuarios=registroUsuarios;
exports.loggeoUsuarios=loggeoUsuarios;
exports.TomarPerfil=TomarPerfil;
exports.ActualizarTokenNotificacion=ActualizarTokenNotificacion;
