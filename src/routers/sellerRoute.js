import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import * as firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import Perfil from '../components/sellerComponents/Perfil.js'
import Pagos from '../components/sellerComponents/Pagos.js'
import Residentes from '../components/sellerComponents/Residentes.js'
import Transacciones from '../components/sellerComponents/Transacciones.js'

class SellerRoute extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
            <Switch>
              <Route exact path="/cliente" component={Perfil}/>
              <Route  path="/cliente/Pagos" component={Pagos}/>
              <Route  path="/cliente/Residentes" component={Residentes}/>
              <Route  path="/cliente/Transacciones" component={Transacciones}/>
              <Route  path="/cliente/Transacciones/:id" component={Transacciones}/>

            </Switch>
      </div>
    )
  }
}
export default SellerRoute;
