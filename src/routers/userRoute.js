import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import Perfil from '../components/userComponents/Perfil.js'
import Transacciones from '../components/userComponents/Transacciones.js'

class UserRoutes extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
            <Switch>
              <Route exact path="/usuario" component={Perfil}/>
              <Route  path="/usuario/Transacciones" component={Transacciones}/>
            </Switch>
      </div>
    )
  }
}
export default UserRoutes;
