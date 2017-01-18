import React from 'react';
import { Link } from 'react-router';


class Menu4 extends React.Component {
    render() {


        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">

                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                      </div>

          
                      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="messagesList">Mensajes</Link></li>
                            <li><Link to="trackingList">Envíos</Link></li>
                            <li><Link to="newTracking">Envío Nuevo</Link></li>
                            <li><Link to="clientTracking">Cliente</Link></li>
                          <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Agencias <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                              <li><Link to="agency">Nueva</Link></li>
                              <li role="separator" className="divider"></li>
                              <li><a href="#">Separated link</a></li>
                              <li role="separator" className="divider"></li>
                              <li><a href="#">One more separated link</a></li>
                            </ul>
                          </li>
                              <li role="separator" className="divider"></li>
                              <li onClick={this.props.logout}><Link>Salir</Link></li>

                        </ul>
                        
                      </div>
                    </div>
                  </nav>
            </div>

        );
    }
}


export default Menu4;