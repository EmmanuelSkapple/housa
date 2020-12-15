import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';
import LoadPage from '../components/generalComponents/Loaderpage.js';
import UserRoutes from './userRoute.js'
import AdminRoutes from './adminRoute.js'
import SellerRoutes from './sellerRoute.js'
import Login from '../components/Login.js';
import Landing from '../components/publicComponents/Landing.js';
import Alerta from '../components/generalComponents/Alerta.js';


function PrivateAdministracion({component: Component,mode, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&   mode==1
        ? <Component {...props} />
        : <Redirect to={{pathname: '/cliente' , state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteSeller ({component: Component,mode, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&  mode == 0
        ? <Component {...props} />
        : <Redirect to={{pathname: '/usuario' , state: {from: props.location}}} />}
    />
  )
}

function PrivateRouteUser ({component: Component,mode, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&  mode == 2
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login' , state: {from: props.location}}} />}
    />
  )
}
function PublicRoute ({component: Component,mode, authed, ...rest}) {
  return (
    <Route
      {...rest}

      render={(props) => authed === false
        ? <Component {...props} />
      : <Redirect to='/root' />}
    />
  )
}

class RouterPrincipal extends Component {
  constructor(){
    super()
    this.state={
        autenticado:false,
        loading:true,
        user:'',
        mode:"",
        title:"",
        message:"",
        openAlert:false,
      }
  }
  componentDidMount(){
    var self =this;
    this.removeListener=firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        self.setState({loading:true,})
        axios.post(Direccion+`/login-usuario`,{idUser:user.uid,ultimaConexion:Date.now()})
        .then(res => {
          console.log(res.data);
          if(res.data.status == '404'){
            this.setState({
              autenticado:false,
              loading:false,
              openAlert:true,
              AlertType: 'error',
              titleAlert:"Error",
              AlertMessage:"Usuario no encontrado"
            })
            firebase.auth().signOut();

          }
          else if(res.data.status == '401'){
            this.setState({
              autenticado:false,
              loading:false,
              openAlert:true,
              AlertType: 'error',
              AlertMessage:"Contactanos para aclarar tu estado",
              titleAlert:"Usuario bloqueado"
            })
            firebase.auth().signOut();

          }
          else if (res.data.status == 'OK') {
            this.setState({
              user:user.uid,
              autenticado:true,
              loading:false,
              mode:res.data.mode,
            })
          }
          else if (res.data.status == 'OUT') {
            this.setState({
              autenticado:false,
              loading:false,
              openAlert:true,
              AlertType: 'error',
              AlertMessage:"Contactanos para aclarar tu estado",
              titleAlert:"Suscripcion vencida!"
            })
          }
          else if (res.data.status == 'NEAR') {
            this.setState({
              user:user.uid,
              autenticado:true,
              loading:false,
              mode:res.data.mode,
              openAlert:true,
              AlertType: 'warning',
              titleAlert:"Suscripcion proxima a vencer",
              AlertMessage:"renueva tu suscripcion para seguir disfrutando de nuestra plataforma sin interrunciones"
            })
          }
        })
        .catch(error=>{
          self.setState({loading:false,})
          console.log(error);
        })

      }
      else{
        this.setState({
          autenticado:false,
          loading:false
        })
      }
    })
  }
  resetAlert=()=>{this.setState({openAlert:false,AlertType:'',AlertMessage:'',titleAlert:''})}

    componentWillUnmount(){
      this.removeListener()
    }
  render() {

    return this.state.loading === true ? <LoadPage/> :(
      <BrowserRouter >
        <Switch>
          <Route exact path="/"  component={()=><Landing mode={this.state.mode} />}/>
          <PublicRoute mode={this.state.mode} authed={this.state.autenticado} path="/login" component={Login}/>
          <PrivateRouteUser mode={this.state.mode} user={this.state.user } authed={this.state.autenticado} path="/usuario" component={UserRoutes}/>
          <PrivateRouteSeller mode={this.state.mode} user={this.state.user } authed={this.state.autenticado} path="/cliente" component={SellerRoutes}/>
          <PrivateAdministracion mode={this.state.mode} user={this.state.user } authed={this.state.autenticado} path="/root" component={AdminRoutes}/>
        </Switch>
        <Alerta titleAlert={this.state.titleAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType} openAlert={ this.state.openAlert} resetAlert={this.resetAlert}/>
      </BrowserRouter>

    );
  }
}

export default RouterPrincipal;
