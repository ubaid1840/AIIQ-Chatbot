import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

document.addEventListener( 'DOMContentLoaded', function() {
    var element = document.getElementById( 'wpap-admin-app' );
    if( typeof element !== 'undefined' && element !== null ) {
        ReactDOM.render( <App />, document.getElementById( 'wpap-admin-app' ) );
    }
} )