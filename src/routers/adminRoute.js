import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import Perfil from '../components/adminComponents/Perfil.js';
import UsuariosAdmin from '../components/adminComponents/Usuarios.js';

class AdminRoutes extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path="/root" component={Perfil}/>
        <Route exact path="/root/Clientes" component={UsuariosAdmin}/>
        </Switch>
      </div>
    )
  }
}
export default AdminRoutes;
