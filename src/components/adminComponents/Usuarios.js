import React, { Component } from 'react';
import firebase from 'firebase';
import MenuUsuario from './navBar.js'
import {Icon,Radio} from 'semantic-ui-react';
import AlertSnack from '../generalComponents/Alerta.js'
import axios from 'axios'
import {Direccion,DireccionFront} from '../../strings/peticiones.js';
import '../../styles/General.css';
import {SubirImgStorage} from '../../Scripts/SubirArchivos.js'


class ContentMisClientes extends Component{
  constructor(){
    super()
    this.state = {
      nuevoProducto:false,
      Currentuser :firebase.auth().currentUser.uid,
      productosActivos:[{nombreResidente:'Jose Antonio',idResidente:'SqaSEAFGYSydien',NumeroResidente:'3313454312',ultimaConexion:'5 min',fechaCreacion:1590833481}],
      ResidentesActivo:[],
      ResidentesNoActivo:[],
      TabActivos:0,
    }
  }

  componentDidMount(){
    this.getClientes();
  }

  getClientes=()=>{
    let self = this;
    axios.post(Direccion+`/tomar-clientes`,{idUser:this.state.Currentuser,})
      .then(res => {
        console.log(res.data);
        if(res.data.status == 'OK'){

          this.setState({
            ResidentesActivo:res.data.ResidentesActivo,
            ResidentesNoActivo:res.data.ResidentesNoActivo,
            loading:false,
          });
        }
        else{
          self.setState({
            loading:false,
            productoEncontrado:{},
            openAlert:true,
            AlertType: 'error',
            titleAlert:"Algo anda mal!",
            AlertMessage:res.data.contentStatus?res.data.contentStatus:'Error desconocido',
          })
        }
      })
  }
  setTabActivo=(e)=>{
    if (e == 1 || e== 0) {
      this.setState({TabActivos:e})
    }
  }
  render(){
    return(
      <div>
        <div >
            <div className='contentSlidePadre'>
              <MenuUsuario/>
              {this.state.TabActivos==0?
                <MisClientes TabActivo={0} getClientes={this.getClientes} handleChangeTabActivo={this.setTabActivo} Residentes={this.state.ResidentesActivo} handleNuevoProducto={()=>this.setState({nuevoProducto:!this.state.nuevoProducto})} />
              :this.state.TabActivos==1?
                <MisClientes TabActivo={1} getClientes={this.getClientes} handleChangeTabActivo={this.setTabActivo} Residentes={this.state.ResidentesNoActivo} handleNuevoProducto={()=>this.setState({nuevoProducto:!this.state.nuevoProducto})} />
              :<div></div>
              }
            </div>

        </div>
      </div>
    )
  }
}

class MisClientes extends Component{
  constructor(){
    super()
    this.state = {
      itemTabActivo:0,
      idUser:firebase.auth().currentUser.uid,
      idCliente:'',
      nuevoResidente:false,
      tomarFoto:false,
      timeStamp :Date.now(),
      imagenes:[],
      nombreCliente:'',
      Status:0,
      Correo:'',
      Password:'',
      Telefono:'',
      numeroResidentes:0,
      fechaCreacion:new Date(),
      fechaVencimiento:new Date(),
      itemModificar:{},
      modificar:false,
    }

  }

  componentDidMount=()=>{
  }

  setTabActivo=()=>{
    this.props.handleChangeTabActivo(0);
  }
  setTabNoActivo=()=>{
    this.props.handleChangeTabActivo(1);
  }
 handleTakePhoto=(dataUri,file)=> {
   // Do stuff with the photo...
   let arrayfoto = [];
   arrayfoto.push(dataUri);
   this.setState({
     imagenes:arrayfoto,
   })
 }

 nuevoResidente=()=>{
   let self = this;
    let ArrayImgUrl = [];
    let ArrayPromesas = [];
    if (this.state.nombreCliente  && this.state.Correo && this.state.Password && this.state.Telefono  && this.state.fechaVencimiento && this.state.numeroResidentes) {
      axios.post(Direccion+`/nuevo-cliente`,this.state)
          .then(res => {
            if(res.data.status == "OK"){
              this.setState({loading:false,openAlert:true,titleAlert:'Éxito',AlertMessage:'Cliente cargado exitosamente',AlertType:'success',nuevoResidente:false,  imagenes:[],nombreCliente:'',Correo:'',Password:'',Telefono:'',fechaVencimiento:new Date()});
              this.props.getClientes();
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
          }).catch((error)=>{
            self.setState({
              loading:false,
              openAlert:true,
              AlertType: 'error',
              titleAlert:"Algo anda mal!",
              AlertMessage:'',
            })
          })
    }else{
      this.setState({
        loading:false,
        openAlert:true,
        AlertType: 'error',
        titleAlert:"Error",
        AlertMessage:'Llena todos los campos',
      })

    }
 }

 ModificarItem=(item)=>{
   this.setState({
     idCliente:item.idUser,
     nombreCliente:item.nombreCliente,
     Correo:item.Correo,
     Telefono:item.Telefono,
     Status:item.Status,
     fechaVencimiento:item.fechaVencimiento,
     numeroResidentes:item.numeroResidentes,
     totalDispositivos:item.totalDispositivos,
     dispositivosActuales:item.dispositivosActuales,

     viewMap:false,
     modificar:true,
   })
 }

 ActualizarResidente=()=>{
   let self =this;
   axios.post(Direccion+`/actualizar-cliente`,this.state)
       .then(res => {
         if(res.data.status == "OK"){
           this.setState({loading:false,openAlert:true,titleAlert:'Éxito',AlertMessage:'Cliente actualizado exitosamente',AlertType:'success',});
           this.props.getClientes();
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
       }).catch((error)=>{
         self.setState({
           loading:false,
           openAlert:true,
           AlertType: 'error',
           titleAlert:"Error",
           AlertMessage:'Algo anda mal!',
         })
       })
 }

 resetAlert = ()=>{this.setState({openAlert:false,titleAlert:'',AlertMessage:'',AlertType:''})}


  render(){
    return(
      <div className='contentMisProductos'>

        <section className='seccion1'>
          <div className='headerMisProductos'>
            <div className='buscadorProductos'>
              <input type='text' placeholder='Buscar nombre, id.'></input>
              <div className='btnBuscar'><Icon  name='search' /></div>
            </div>

            {this.state.nuevoResidente?
              <div>
                <div className={this.state.nuevaRuta?'btnNuevoProducto return':'btnNuevoProducto'} onClick={()=>this.setState({nuevoResidente:!this.state.nuevoResidente})}>
                  <Icon name='angle left'></Icon>
                </div>
                <div className='formNuevaRuta'>

                  <div className='contentMaps'>
                    <div className='mapa'>
                    </div>
                    <div className='contentParada'>
                      <div className='dobleItem'>
                        <div className='input form'>
                          <p className='tituloInput'>Nombre del usuario</p>
                        <input value={this.state.nombreCliente} onChange={(e)=>this.setState({nombreCliente:e.target.value})} type='text'/>
                        </div>

                      </div>
                      <div className='dobleItem'>
                        <div className='input form'>
                          <p className='tituloInput'>Correo</p>
                          <input value={this.state.Correo} onChange={(e)=>this.setState({Correo:e.target.value})} type='email'/>
                        </div>
                        <div className='input form'>
                          <p className='tituloInput'>Contraseña</p>
                          <input value={this.state.Password} onChange={(e)=>this.setState({Password:e.target.value})} type='password'/>
                        </div>
                      </div>
                      <div className='dobleItem'>
                        <div className='input form'>
                          <p className='tituloInput'>Telefono</p>
                          <input value={this.state.Telefono} onChange={(e)=>this.setState({Telefono:e.target.value})} type='text'/>
                        </div>
                        <div className='input form'>
                          <p className='tituloInput'>Total de Residentes</p>
                          <input value={this.state.numeroResidentes} onChange={(e)=>this.setState({numeroResidentes:e.target.value})} type='number'/>
                        </div>
                        <div className='input form'>
                          <p className='tituloInput'>Fecha vencimiento</p>
                          <input value={this.state.fechaVencimiento} onChange={(e)=>this.setState({fechaVencimiento:e.target.value})} type='date'/>
                        </div>
                      </div>

                      <div className='btnNuevoProducto ruta' onClick={this.nuevoResidente}>Guardar cliente</div>

                    </div>
                  </div>
                </div>
              </div>
              :
              <div>
                {this.state.modificar?
                  <div>
                    <div className='contentCardItem'>
                      <div className='return'>
                        <Icon onClick={()=>this.setState({modificar:!this.state.modificar,nombreResidente:'',Correo:'',Telefono:''})}  name='angle left'></Icon>
                      </div>
                      <div className='contentBotones'>
                        <div onClick={this.ActualizarResidente} className='btnNuevoProducto negative'>Eliminar</div>
                        <div onClick={this.ActualizarResidente} className='btnNuevoProducto '>Actualizar</div>
                      </div>
                      <div className='formModificar'>
                        <ul className='col3'>
                          <li>
                            <div className='input form'>
                              <p className='tituloInput'>Nombre</p>
                            <input value={this.state.nombreCliente} onChange={(e)=>this.setState({nombreCliente:e.target.value})} type='text'/>
                            </div>
                          </li>

                          <li>
                            <div className='input form'>
                              <p className='tituloInput'>Correo</p>
                              <input value={this.state.Correo} onChange={(e)=>this.setState({Correo:e.target.value})} type='email'/>
                            </div>
                          </li>

                          <li>
                            <div className='input form'>
                              <p className='tituloInput'>Telefono</p>
                              <input value={this.state.Telefono} onChange={(e)=>this.setState({Telefono:e.target.value})} type='text'/>
                            </div>
                          </li>
                          <li>
                            <div className='input form'>
                              <p className='tituloInput'>Fecha de vencimiento</p>
                            <input value={this.state.fechaVencimiento} onChange={(e)=>this.setState({fechaVencimiento:e.target.value})} type='date'/>
                            </div>
                          </li>
                          <li>
                            <div className='input form'>
                                <div className='Radio label'>
                                  <p>{this.state.Status==1?'Estatus Activo':'Estatus Bloqueado'}</p>
                                  <Radio  toggle checked={this.state.Status} onChange={()=>this.setState({Status:this.state.Status==0?1:0})} />
                                </div>
                            </div>
                          </li>

                          <li>
                            <div className='input form'>
                              <p className='tituloInput'>Total de Residentes</p>
                              <input value={this.state.numeroResidentes} onChange={(e)=>this.setState({numeroResidentes:e.target.value})} type='number'/>
                            </div>
                          </li>
                          <div className='clear'></div>
                        </ul>
                      </div>
                    </div>

                  </div>
                  :
                <div>
                  <div className='btnNuevoProducto' onClick={()=>this.setState({nuevoResidente:!this.state.nuevoResidente})}>Nuevo cliente</div>
                  <div className='contentCardItem'>
                    {
                      this.props.Residentes.map((it,index)=>{
                        return(  <CardItemProducto ModificarItem={this.ModificarItem} getClientes={this.props.getClientes} Residente={it} key={index}/>)
                      })
                    }
                  </div>
                </div>
                }

              </div>
            }


          </div>
        </section>
        <AlertSnack openAlert={this.state.openAlert} titleAlert={this.state.titleAlert} resetAlert={this.resetAlert} AlertMessage={this.state.AlertMessage} AlertType={this.state.AlertType}/>

      </div>
    )
  }
}

class CardItemProducto extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
      modificar:false,
    }
  }

  handleModificar=()=>{
    this.props.ModificarItem(this.props.Residente);
  }


  render(){
    let dt = new Date(this.props.Residente.fechaVencimiento);
    let fechaVencimiento = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

    return(
      <div>

          <div className='CardItem' onClick={this.handleModificar}>
            <div className='imgCardItem'><img src={DireccionFront +"/imgs/elliot.jpg"}></img></div>
            <div className='infoCardItem left'>
              <h3>Nombre</h3>
            <p >{this.props.Residente.nombreCliente}</p>
            </div>

            <div className='infoCardItem left'>
              <h3>ID</h3>
            <p className='idProducto'>{this.props.Residente.idUser}</p>
            </div>
            <div className='infoCardItem center'>
              <h3>Vencimiento</h3>
            <p>{fechaVencimiento}</p>
            </div>
            <div className='infoCardItem center'>
              <h3>Ultima conexión</h3>

            <p>{this.props.Residente.ultimaConexion==0?'Usuario nuevo':this.props.Residente.ultimaConexion}</p>
            </div>
          </div>
      </div>

    )
  }
}


export default ContentMisClientes;
