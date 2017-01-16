import React from 'react';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import * as firebase from 'firebase';
import * as config from './config.jsx'


export default class ClientTracking extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			trackingNumber : '',
			name : '',
            date : '',
            agency : ''
		};


	};

	 componentWillMount(){
        this.loadTracking();
    }



	loadTracking(){
        var urlId = this.props.location.query.id;
        var url = config.apiClientQuery + '%22' + urlId + '%22';
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                var result = Object.keys(data).map(function(k) { return data[k] });
                //this.setState({ trackings : arr}, function(){console.log(this.state.trackings);});
                this.setState({
                        trackingNumber : result[0].trackingNumber,
                        name : result[0].name,
                        date : result[0].date,
                        agency : result[0].agency
                });
              	
                console.log(result);
                //console.log(this.state.name);


            }).catch((error) => {
                console.error(error);
        });
    }



	render(){
        return(
                <div className="col-md-12">
                    <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Envío</h3>
                                
                            </div>
                            <div className="panel-body">
                                <h5>Nombre: {this.state.name}</h5>
                                <h5>Agencia: {this.state.agency}</h5>
                                <h5>Fecha: {this.state.date}</h5>
                                <h5>Número de envío: {this.state.trackingNumber}</h5>
                                <div style={{display : "inline-block"}}>
                                    <h5 style={{float : "left"}}>Estado:</h5>
                                    <span className="btn btn-success">Enviado</span>
                                </div>
                                {
                                    (this.state.agency === "DAC") ? (
                                        <div>
                                        <a target='_blank' href ={config.agencyUrl + this.state.trackingNumber}> <span className="btn btn-success btn-block" ><h5>Ver Estado</h5></span></a>
                                        <object data="http://www.agenciacentral.com.uy" width="100%"></object>
                                        </div>
                                        ) : ('')
                                }
                           </div>
                        </div>
                </div>
            );
    }
}