
function Tomar(dataBase,idUser) {
return dataBase.ref('/Usuarios/' + idUser).once('value');
}

function TomarRondinero(dataBase,idUser,idCliente) {
return dataBase.ref('/Rondineros/'+idCliente+'/'+idUser).once('value');
}

exports.Tomar=Tomar;
exports.TomarRondinero=TomarRondinero;
