import React, { Component, Fragment } from 'react';
import Clientes from './Clientes';

class Panel extends Component {
    state = {  }
    render() { 
        return ( 
            <Fragment>
                <h1>Panel</h1>
                <Clientes/>
            </Fragment>
         );
    }
}
 
export default Panel;