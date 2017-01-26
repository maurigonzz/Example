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
                        <a className="navbar-brand" href="#" style={{color : "#ff0090", float: "left", fontWeight: "bold", fontSize: "26px"}}>Brand <p style={{float : "right", color: "white", fontWeight: "bold", fontSize: "26px"}}></p></a>
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
                              <li><Link to="agency" style={{color : 'white'}}>Nueva</Link></li>
                              <li role="separator" className="divider"></li>
                              <li><Link to="routesList" style={{color : 'white'}}>Costos</Link></li>
                              <li role="separator" className="divider"></li>
                            </ul>
                          </li>
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