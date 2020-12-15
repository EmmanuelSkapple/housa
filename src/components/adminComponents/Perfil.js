import React, { Component } from 'react';
import MenuUsuario from './navBar.js'


export default class Perfil extends Component {
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
