import React, { Component } from 'react';
import MenuUsuario from './navBar.js'


class PerfilSeller extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
    }
  }
  render(){

    return(
      <div>
        <MenuUsuario/>
        
        <h3>Perfil</h3>
      </div>

    )
  }
}


export default PerfilSeller;
