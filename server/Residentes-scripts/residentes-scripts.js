var Perfil=require('../Usuarios-scripts/perfil-usuario.js');



 function NuevoResidente(Auth,req,res,dataBase) {

      var respuesta=MasResidentes(req.body.idUser,dataBase);
      respuesta.then(function(valor){
        if(valor){
          Auth.createUser({
              email: req.body.Correo,
              emailVerified:false,
              password:req.body.Password,
              displayName:req.body.nombreResidente,
              photoURL:'https://'+req.body.idUser+'.com',
            })
            .then(function(user) {
              var refDaComponentes = dataBase.ref("Residentes/"+req.body.idUser+'/'+user.uid);
              let date = new Date(req.body.fechaCreacion);
              refDaComponentes.set({
                idResidente:user.uid,
                idCliente:req.body.idUser,
                nombreResidente:req.body.nombreResidente,
                Correo:req.body.Correo,
                Password:req.body.Password,
                Telefono:req.body.Telefono,
                Status:1,
                Foto:req.body.imagenes[0]?req.body.imagenes[0]:false,
                ultimaConexion:0,
                fechaCreacion:date.getTime(),
              }).then(function(){
                res.send({status:'OK'});
              })
              .catch(function(error) {
                res.send({status:'error',contentStatus:error});
              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
            });
        }
        else{
          res.send({status:'505'})
        }
      })
}

 function MasResidentes(idUser,dataBase){
   var promesa=new Promise(function(resolve,reject){
     Perfil.Tomar(dataBase,idUser).then(function(cliente){
       dataBase.ref("Residentes/"+idUser).on("value", function(snapshot) {

       if(parseInt(snapshot.numChildren())<parseInt(cliente.val().numeroResidentes)){
         resolve(true);
       }
       else{
         resolve(false);
       }
     })
     })

   })

   return promesa;
}


function ActualizarResidente(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Residentes/"+req.body.idUser+'/'+req.body.idResidente);
  let date = new Date(req.body.fechaModificacion);
  refDaComponentes.update({
    nombreResidente:req.body.nombreResidente,
    Status:req.body.Status,
    Telefono:req.body.Telefono,
  }).then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}

function TomarPerfilResidentes(req,res,dataBase){
  let idUser = req.body.idUser;
  let idCliente = req.body.idCliente;
  let promesaGetPerfil = Perfil.TomarResidente(dataBase,idUser,idCliente)
  promesaGetPerfil.then(function(user){
    let usuario=user.val()
    delete usuario.Tarjetas;
    delete usuario.Direcciones;
    if (user.val()) {
      if (user.val().Status == 0) {
        res.send({status:'401'});
      }
      else{
        FijarultimaConexion(dataBase,idCliente,idUser,req.body.ultimaConexion);
        res.send({status:'OK',userData:usuario});

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

function FijarultimaConexion(dataBase,idCliente,idResidente,ultimaConexion){
  var refDaComponentes = dataBase.ref("Residentes/"+idCliente+'/'+idResidente);
  refDaComponentes.update({
    ultimaConexion:ultimaConexion,
  })
}
function EliminarResidente(req,res,dataBase,Auth) {
  var refDaComponentes = dataBase.ref("Residentes/"+req.body.idUser+'/'+req.body.idResidente);
  refDaComponentes.remove().then(function(){
    Auth.deleteUser(req.body.idResidente)
    .then(function() {
      // adaRankRef.transaction(function(currentRank) {
      //   return currentRank - 1;
      // });
      res.send({status:'OK'});

    })
    .catch(function(error) {
      console.log('Error deleting user:', error);
    });
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}
function TomarResidentes(res,bd,idUser){
  var ref=bd.ref('Residentes/'+idUser);
  let valuesActivos=[];
  let valuesNoActivos=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
            valuesActivos.push(snapBaby.val());
        })
      }else {
        resolve({status:'error',ResidentesActivo:valuesActivos=[],ResidentesNoActivo:valuesNoActivos=[]})
      } //if exists
      resolve({status:'error',ResidentesActivo:valuesActivos,ResidentesNoActivo:valuesNoActivos});
    }) // ref.on
  }) // promesa
  .then(()=>{
    res.send({status:'OK',ResidentesActivo:valuesActivos,ResidentesNoActivo:valuesNoActivos})
  })
}

exports.NuevoResidente=NuevoResidente;
exports.ActualizarResidente=ActualizarResidente;
exports.EliminarResidente=EliminarResidente;
exports.TomarResidentes=TomarResidentes;
exports.TomarPerfilResidentes=TomarPerfilResidentes;
