import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Icon,Label} from 'semantic-ui-react';
import '../../styles/navBar.css';
import '../../styles/General.css';
import firebase from 'firebase'



class slideBar extends Component{
  constructor(){
    super()
    this.state ={
      mostrarSubVentas:false,
      mostrarSubCompras:false,
    }
  }
  render(){
    return(
      <div className="contenedorSlideBar">
        <div className='headerSlide'>
          <Icon name='bars'></Icon>
          <h1>Mi cuenta</h1>
        </div>
        <p className='bienvenido' >¡Bienvenido {firebase.auth().currentUser.displayName}!</p>
        <div className='listaContent'>
          {/* <div className='IconColumn'>
          <Link to="/user">
            <Icon name='pie graph'></Icon>
            <p className='slideTitle'>Resumen</p>
          </Link>
          </div> */}
          <div className='IconColumn'>
          <Link to="/cliente">

            <Icon name='user outline'></Icon>
            <p className='slideTitle'>Mis Perfil</p>
          </Link>

          </div>

          <div className='IconColumn'>
            <Link to="/cliente/Residentes">
              <Icon name='road'></Icon>
            <p className='slideTitle'>Mis Residentes</p>
            </Link>
          </div>

          <div className='IconColumn' onClick={()=>firebase.auth().signOut()}>
              <Icon name='log out'></Icon>
              <p className='slideTitle'>Salir</p>
          </div>
          <div className='clear'></div>
        </div>
      </div>
    )
  }
}

export default slideBar;
