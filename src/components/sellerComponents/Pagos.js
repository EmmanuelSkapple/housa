import React, { Component } from 'react';
import MenuUsuario from './navBar.js'


export default class PagosPadre extends Component {
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
        <Pagos/>
      </div>
    )
  }
}

class Pagos extends Component {
  constructor() {
    super()
    this.state = {
      loading:false,
    }
  }
  render(){
    return(
      <div>
        <h3>Estas en admin usuarios</h3>
      </div>
    )
  }
}
