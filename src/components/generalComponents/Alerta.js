import React, { Component } from 'react';
import '../../styles/General.css';


class Alerta extends Component {
  constructor() {
    super()

  }
  render() {
    let mostrar = 'hidden';
    let self = this;
    if (this.props.openAlert) {
      mostrar = 'show ' + this.props.AlertType;
      setTimeout(function () {
        mostrar = 'hidden';
        self.props.resetAlert();

      }, 3000);
    }
    return (
      <div id="snackbar" className ={mostrar}>
        <div className='HeaderAlert'>{this.props.titleAlert}</div>
        <div className='lineDown'></div>
        <div className='contentAlert'>
          {this.props.AlertMessage}
        </div>
      </div>
    );
  }
}

export default Alerta;
