const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var serviceAccount = require("./housa-kodika-firebase-adminsdk-jg4tu-aad479ef39.json");
var admin = require("firebase-admin");

var UsuarioScript = require("./Usuarios-scripts/usuarios-scripts.js");
var ResidenteScript = require("./Residentes-scripts/residentes-scripts.js");
var ClienteScript = require("./Cliente-scripts/cliente-scripts.js");
var TransferScript = require("./TransferWise/Destinatario-script.js");
const config = require('dotenv').config();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://housa-kodika.firebaseio.com/"
});
var dataBase = admin.database();
var dataBaseFire = admin.firestore();
var Auth = admin.auth();


app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.set('trust proxy', true);

app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(function(req, res, next) {

  var allowedOrigins = [, 'http://localhost:3000', 'https://exportaciones-e2444.firebaseapp.com/'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', function (req, res) {
  res.send('Que andas buscando aqui? ___ooO_(_o__o_A)_Ooo___');
});

/***********      USUARIOS      **************/


app.get('/pago',async function (req, res) {
    TransferScript.Requier();
});


let borderId= '15721';


app.post('/registro-usuario', function (req, res) {
  UsuarioScript.registroUsuarios(req,res,dataBase,Auth);
});

app.post('/login-usuario', function (req, res) {
  UsuarioScript.loggeoUsuarios(req,res,dataBase);
});

app.post('/actualizar-token-usuario', function (req, res) {
  UsuarioScript.ActualizarTokenNotificacion(req,res,dataBase);
});

app.post('/tomar-Perfil', function (req, res) {
  UsuarioScript.TomarPerfil(req,res,dataBase);
});

/***********      RESIDENTES      **************/


app.post('/nuevo-Residente', function (req, res) {
  ResidenteScript.NuevoResidente(Auth,req,res,dataBase);
});
app.post('/actualizar-Residente', function (req, res) {
  ResidenteScript.ActualizarResidente(req,res,dataBase);
});
app.post('/tomar-Residentes', function (req, res) {
  ResidenteScript.TomarResidentes(res,dataBase,req.body.idUser);
});
app.post('/tomar-Perfil-Residente', function (req, res) {
  ResidenteScript.TomarPerfilResidentes(req,res,dataBase);
});
app.post('/eliminar-Residente', function (req, res) {
  ResidenteScript.EliminarResidente(req,res,dataBase,Auth,dataBaseFire);
});

/***********      CLIENTES      **************/

app.post('/nuevo-cliente', function (req, res) {
  ClienteScript.NuevoCliente(Auth,req,res,dataBase);
});
app.post('/actualizar-cliente', function (req, res) {
  ClienteScript.ActualizarCliente(req,res,dataBase);
});
app.post('/tomar-clientes', function (req, res) {
  ClienteScript.TomarCliente(res,dataBase,req.body.idUser);
});
app.post('/eliminar-cliente', function (req, res) {
  ClienteScript.EliminaCliente(req,res,dataBase);
});


app.listen(process.env.PORT || 4000 ,function(){
    console.log("up and running on port "+process.env.PORT);
});
