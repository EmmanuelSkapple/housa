import React, { Component } from 'react';
import MenuUsuario from './navBar.js'

export default class ResidentesPadre extends Component {
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
        <Residentes/>
      </div>
    )
  }
}

class Residentes extends Component {
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
