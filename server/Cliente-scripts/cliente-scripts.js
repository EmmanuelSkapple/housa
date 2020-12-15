var Registro=require('../Usuarios-scripts/registro-usuario.js');


function NuevoCliente(Auth,req,res,dataBase) {

    Auth.createUser({
        email: req.body.Correo,
        emailVerified:false,
        password:req.body.Password,
        displayName:req.body.nombreCliente,
        lastName:'1',
      })
      .then(function(user) {
        var refDaComponentes = dataBase.ref("Usuarios/"+user.uid);
        let date = new Date(req.body.fechaCreacion);

         refDaComponentes.set({
           idUser:user.uid,
           nombreCliente:req.body.nombreCliente,
           Correo:req.body.Correo,
           Password:req.body.Password,
           Telefono:req.body.Telefono,
           Status:1,
           Type:1,
           fechaVencimiento:req.body.fechaVencimiento,
           ultimaConexion:0,
           numeroResidentes:req.body.numeroResidentes,
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


function ActualizarCliente(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Usuarios/"+req.body.idCliente);
  refDaComponentes.update({
    nombreCliente:req.body.nombreCliente,
    Correo:req.body.Correo,
    Status:req.body.Status,
    Password:req.body.Password,
    Telefono:req.body.Telefono,
    fechaVencimiento:req.body.fechaVencimiento,
    currentLat:req.body.currentLat,
    currentLong:req.body.currentLong,
    numeroResidentes:parseInt(req.body.numeroResidentes),

  }).then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });
}

function EliminarCliente(req,res,dataBase) {
  var refDaComponentes = dataBase.ref("Usuario/"+req.body.idUser);
  refDaComponentes.remove().then(function(){
    res.send({status:'OK'});
  })
  .catch(function(error) {
    res.send({status:'error',contentStatus:error});
  });

}

function TomarCliente(res,bd,idUser){
  var ref=bd.ref('Usuarios/');
  let valuesActivos=[];
  let valuesNoActivos=[];
  var promesa=new Promise(function(resolve,reject){
    ref.on('value',snapShot=>{
      if(snapShot.exists()){
        snapShot.forEach(snapBaby=>{
          if (snapBaby.val().Status ==1) {
            valuesActivos.push(snapBaby.val());
          }else{
            valuesNoActivos.push(snapBaby.val());
          }
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

exports.NuevoCliente=NuevoCliente;
exports.ActualizarCliente=ActualizarCliente;
exports.EliminarCliente=EliminarCliente;
exports.TomarCliente=TomarCliente;
