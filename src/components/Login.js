import React, {Component} from 'react';
import Alerta from './generalComponents/Alerta.js';
import '../styles/Login.css';
import '../styles/General.css';
import {Icon} from 'semantic-ui-react'
import firebase from 'firebase'
import axios from 'axios';
import {ref,firebaseAuth} from '../strings/const.js'
import {Direccion} from '../strings/peticiones.js';

class ContentLogin extends Component {
  render(){
    return(
      <div>
        <Login/>
      </div>
    )
  }
}

class Login extends Component {
  constructor(){
    super();
    this.state={
      registro:false,
      EmailLogin:'',
      PassLogin:'',
      EmailRegistro:'',
      NombreRegistro:'',
      ApellidoRegistro:'',
      TelefonoRegistro:'',
      PassRegistro:'',
      PassConfirmacionRegistro:'',
      ErrorPassword:false,
      ErrorLengthPassword:true,
      ErrorConfirmarPassword:0,
      showPass:false,
      ventana:1,
      loading:false,
      openAlert:false,
      EmailRecuperar:'',
    }
  }

  handleRegistrar=()=>{
    let self = this;
    self.setState({loading:true})
    if (this.validaRegistro()) {
      axios.post(Direccion+`/registro-usuario`,{Email:this.state.EmailRegistro,Nombre:this.state.NombreRegistro, Apellido:this.state.ApellidoRegistro,Telefono:this.state.TelefonoRegistro,Pass:this.state.PassRegistro})
          .then(res => {
            if(res.data.status == "OK"){
              self.setState({
                EmailRegistro:'',
                NombreRegistro:'',
                ApellidoRegistro:'',
                TelefonoRegistro:'',
                PassRegistro:'',
                PassConfirmacionRegistro:'',
                loading:false,
                openAlert:true,
                AlertType: 'success',
                registro:false,
                titleAlert:"¡Exito!",
                AlertMessage:'Tu cuenta fue creada, ¡ingresa ahora!',
              })
              window.location.reload();
            }
            else if(res.data.status == 'error'){
              self.setState({
                loading:false,
                openAlert:true,
                AlertType: 'error',
                titleAlert:"Algo anda mal!",
                AlertMessage:res.data.contentStatus,
              })
            }
          })
    }
    else{
      self.setState({
        loading:false,
        openAlert:true,
        AlertType: 'error',
        titleAlert:"Algo anda mal!",
        AlertMessage:'Llena todos los campos',
      })
    }

  }
  validaRegistro=()=>{
    console.log(this.state);
    if(!this.state.EmailRegistro){return false}
    else if(!this.state.NombreRegistro){return false}
    else if(!this.state.ApellidoRegistro){return false}
    else if(!this.state.TelefonoRegistro){return false}
    else if(!this.state.PassRegistro){return false}
    else if(this.state.ErrorConfirmarPassword !=1){return false}
    else{return true}
  }
  handleLogin=()=>{
    this.setState({loading:true})
    let self = this;
    firebase.auth().signOut();
    firebaseAuth.signInWithEmailAndPassword(this.state.EmailLogin, this.state.PassLogin)
    .then(function(user){

    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        self.setState({
          loading:false,
          openAlert:true,
          AlertType: 'error',
          titleAlert:"Contraseña incorrecta",
          AlertMessage:"Tu contraseña no es correcta, intentalo de nuevo."
        })
      }
      else if(errorCode==='auth/user-not-found'){
        self.setState({
          loading:false,
          openAlert:true,
          AlertType: 'warning',
          AlertMessage:"Usuario no existe, crea una cuenta para poder ingresar",
          titleAlert:"Usuario inexistente"
        })
      }
      else {
        console.log(errorMessage);
      }
       console.log(error);
    });
  }

  HandleValidarPass=(e)=>{
    let value = e.target.value;
    let regex = /^(?=.*?[0-9])(?=.*?[a-z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
    if (value.length < 8) {
      this.setState({ErrorLengthPassword:true,ErrorPassword:false})
    }else{
      this.setState({ErrorLengthPassword:false})
      if (regex.test(value)) {
        this.setState({ErrorPassword:false,PassRegistro:value})
        } else {
          this.setState({ErrorPassword:true})
        }
    }
  }
  ConfirmarPass=(e)=>{
    if (this.state.PassRegistro == e.target.value) {
      this.setState({ErrorConfirmarPassword:1})
    }else{
      this.setState({ErrorConfirmarPassword:2})
    }
  }

  resetAlert=()=>{this.setState({openAlert:false,AlertType:'',AlertMessage:'',titleAlert:''})}

  handleKeyPress = event => {
    if (event.key == 'Enter') {
      this.handleLogin();
    }
  };

  handleRecuperar=()=>{
    let self = this;
    this.setState({loading:true})
    if (this.state.EmailRecuperar) {
      firebase.auth().sendPasswordResetEmail(this.state.EmailRecuperar).then(function() {
        self.setState({registro:false,olvideContrasena:false,loading:false,openAlert:true,AlertType: 'success',titleAlert:"Exito!",AlertMessage:'se mando un correo para restrablacer tu contraseña'})
      }).catch(function(error) {
        self.setState({loading:false,openAlert:true,AlertType: 'error',titleAlert:"Error!",AlertMessage:error})
      });
    }else{
      self.setState({loading:false,openAlert:true,AlertType: 'error',titleAlert:"Error!",AlertMessage:'ingresa correo'})

    }

  }

  render (){
       return (
         <div className="Login">
           <section className='seccion1'>
             <div className='bgLogin'>
               <div className='filterBlack'></div>
                 {!this.state.registro?
                   <div className='loginContent'>
                     {this.state.olvideContrasena?
                       <div>
                          <div className='loginHeader'>Recuperar</div>
                          <div className='loginForm' onKeyPress={this.handleKeyPress}>
                              <input placeholder='Jose.Perez@ejemplo.com' onChange={(e)=>this.setState({EmailRecuperar : e.target.value})} />
                          </div>
                          <div onClick={()=>this.setState({olvideContrasena:!this.state.olvideContrasena})} className='forgotPassword'>Regresar</div>

                          {this.state.loading?
                            <div  className='btnIngresar'  >
                              <Icon loading name='spinner' color='white' />
                            </div>
                            :
                            <div className='btnIngresar' onClick={this.handleRecuperar}>Recuperar</div>
                          }
                       </div>
                       :
                       <div>
                          <div className='loginHeader'>Ingresar</div>
                          <div className='loginForm' onKeyPress={this.handleKeyPress}>
                              <input placeholder='Jose.Perez@ejemplo.com' onChange={(e)=>this.setState({EmailLogin : e.target.value})} />
                              <input value={this.state.PassLogin} type='password' placeholder='******' onChange={(e)=>this.setState({PassLogin : e.target.value})}/>
                          </div>
                          <div onClick={()=>this.setState({olvideContrasena:!this.state.olvideContrasena})} className='forgotPassword'>Olvidé mi contraseña</div>
                          {this.state.loading?
                            <div  className='btnIngresar'  >
                              <Icon loading name='spinner' color='white' />
                            </div>
                            :
                            <div className='btnIngresar' onClick={this.handleLogin}>Entrar</div>
                          }
                          <div className='btnCrearCuenta' onClick={()=>this.setState({registro:true})}>Crear cuenta</div>
                       </div>

                     }
                   </div>

                   :
                   <div className='registroContent'>
                      <div className='loginHeader'>Registro</div>
                      <div className='loginForm'>
                        <div className='middleInputs'>
                         <div className='item'>
                           <label>Nombre</label>
                           <input placeholder='Jose'  onChange={(e)=>this.setState({NombreRegistro : e.target.value})} />
                         </div>
                         <div className='item'>
                           <label>Apellido</label>
                           <input placeholder='Perez' onChange={(e)=>this.setState({ApellidoRegistro : e.target.value})} />
                         </div>
                        </div>
                        <div className='middleInputs'>
                         <div className='item'>
                           <label>Correo electrónico</label>
                           <input placeholder='Jose.Perez@ejemplo.com' onChange={(e)=>this.setState({EmailRegistro : e.target.value})} />
                         </div>
                         <div className='item'>
                           <label>Teléfono</label>
                           <input placeholder='1234567890' onChange={(e)=>this.setState({TelefonoRegistro : e.target.value})} />
                         </div>
                        </div>
                        <div className='middleInputs'>
                         <div className='item'>
                           <label>Contraseña</label>
                           <input type={this.state.showPass?'text':'password'} placeholder='******' onChange={this.HandleValidarPass} />
                             {this.state.ErrorLengthPassword?
                               <label className='warningPassword'>Minimo 8 caracteres</label> :<div></div>
                             }
                             {this.state.ErrorPassword?
                               <label className='warningPassword' >Incluye un numero y un signo</label> :<div></div>
                             }
                             {!this.state.ErrorLengthPassword && !this.state.ErrorPassword?
                               <label className='successPassword' >Perfecta!</label> :<div></div>

                             }
                             <div className='iconEyeRegistro' onMouseDown={()=>this.setState({showPass:true})} onMouseUp={()=>this.setState({showPass:false})}>
                               {!this.state.showPass?
                                 <Icon name='eye slash outline'></Icon>:<Icon name='eye'></Icon>
                               }
                             </div>
                         </div>
                         <div className='item confirmPass'>
                           <label>Confirmar Contraseña</label>
                           <input type={this.state.showPass?'text':'password'} placeholder='******' onChange={this.ConfirmarPass} />
                           {this.state.ErrorConfirmarPassword == 2?
                             <label className='warningPassword'>No coiciden las contraseñas</label>
                            :this.state.ErrorConfirmarPassword == 1?
                             <label className='successPassword'>Perfecto!</label>
                            :
                             <div></div>
                           }
                         </div>
                        </div>
                      </div>
                      {this.state.loading?
                        <div  className='btnIngresar'  >
                          <Icon loading name='spinner' color='white' />
                        </div>

                        :
                        <div  className='btnIngresar' onClick={this.handleRegistrar} >Registrarse</div>

                      }
                      <div className='btnCrearCuenta' onClick={()=>this.setState({registro:false})}>Regresar</div>
                   </div>
                 }


             </div>
           </section>
           <Alerta titleAlert={this.state.titleAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType} openAlert={ this.state.openAlert} resetAlert={this.resetAlert}/>
         </div>
      )
    }
}
export default ContentLogin;
