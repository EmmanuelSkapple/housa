

function Registro(Auth,dataBase,Email,Nombre,Apellido,Telefono,Pass) {

let promesa = new Promise(function(resolve, reject) {

  Auth.createUser({
      email: Email,
      emailVerified:false,
      password:Pass,
      displayName:Nombre,
    })
    .then(function(user) {
      var refDaComponentes = dataBase.ref("Usuarios/"+user.uid);
     resolve (refDaComponentes.set({Email: Email,Nombre: Nombre,Apellido: Apellido,Telefono: Telefono,Pass: Pass,idUser:user.uid,Status:0,}));

    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      reject(errorMessage);
    });

});

return promesa;

}


exports.Registro=Registro;
