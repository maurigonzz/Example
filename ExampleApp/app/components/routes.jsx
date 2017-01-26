import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import FilterRoute from './FilterTrack.jsx'
import * as firebase from 'firebase';


export default class Routes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            agencies : [],
            routes : [],
            searchResult : [],
            query : false,
            
            showModal : false,
            selectedAgency : '',
            newCity : '',
            newCost : ''
        }
    
        this.clearSearch = this.clearSearch.bind(this);
        this.loadRoutes = this.loadRoutes.bind(this);
        this.searchRoutes = this.searchRoutes.bind(this);
        this.handleNewCity = this.handleNewCity.bind(this);
        this.handleNewCost = this.handleNewCost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}


    componentDidMount(){
        this.loadRoutes();
    }


    componentWillUnmount(){
            this.removeDatabaseReference();
            console.log("unmounted")
    }  


    //Open the modal and save the selected message.
    openModal(item, e) {
        this.setState({ 
            showModal: true, 
            selectedAgency : item
        });
        //console.log(this.state.selectedMessage);
    }
    
    closeModal() {
        this.setState({ showModal: false, newCity : '', newCost : ''});
    }

    handleNewCity(event){
        this.setState({newCity : event.target.value});
    }

    handleNewCost(event){
        this.setState({newCost : event.target.value});
    }
    

    loadRoutes(){
        this.setState({routes : []});

        var rootRef = firebase.database().ref().child('agencies').orderByKey();
        rootRef.on('value', snap => {
            var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            var routes = [];
            //>For every agency make the json object of routes to display.
            result.map(function(obj){
                var list = {
                    name : '',
                    routes : []
                }
                list.name = obj.name;
                
                //console.log(obj.routes);
                var resultRoutes = obj.routes;
                if(resultRoutes != null){
                    var cities = Object.keys(resultRoutes).map(function(k) { return resultRoutes[k] });
                    cities.map(function(c){
                        //console.log(obj.name);
                        //console.log(c);
                        list.routes.push(c);                        
                    })
                }                
                routes.push(list);
            },this);
            this.setState({agencies : result, routes : routes});
            //console.log(this.state.routes);
            //console.log(this.state.agencies);
        });
    }



    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('agencies').orderByKey();
        rootRef.off();
    }


    searchRoutes(query){
        var searchResult = [];
        var queryFilter = query.toLowerCase();

        if(queryFilter != ''){
            this.state.routes.map(function (agency){
                    agency.routes.map(function (route){
                        if(route != []){
                            var  city = route.city.toLowerCase();
                            if ( ((city).indexOf(queryFilter) > -1) ) {
                                var result = {
                                    city : route.city,
                                    agency : agency.name,
                                    cost : route.cost
                                }
                                searchResult.push(result);
                            }
                        }   
                    }, this)              
            },this)
        }
        //console.log(searchResult);
        this.setState({searchResult : searchResult, query : true});
    }


    clearSearch(){
        this.loadRoutes();
        this.setState({searchResult : [], query : false});
    }


    handleSubmit(event){
        event.preventDefault();
        if (this.verifyInputs()){
            //Post to Firebase
            var trackingsRef = firebase.database().ref('agencies');
            var query = trackingsRef.orderByChild('name').equalTo(this.state.selectedAgency);
            query.on('child_added', function(snapshot) {
                   var routeRef = firebase.database().ref('agencies/'+ snapshot.key + '/routes');
                   var newRoute = {
                           city : this.state.newCity,
                           cost : this.state.newCost
                         };

                   routeRef.push(newRoute);
            },this);
            this.closeModal();
        }else{
            alert('Debes completar la ciudad y costo.');
        }
    }

    verifyInputs(){
      if((this.state.newCity !== '') && (this.state.newCost !== '')){
        return true;
      }else{
        return false;
      }
    }

    render(){
        return(
            <div>
                <FilterRoute searchTrackings={this.searchRoutes} clearSearch={this.clearSearch}/>
                { (this.state.query) ? <RoutesQueryResult routes={this.state.searchResult}/> : ''}
                <div className="col-md-12">
                {   
                    this.state.routes.map(function(agency){
                        return(
    	    			<div key={agency.name} className="panel panel-primary" >
    	    				<div className="panel-heading">
                                <p className="panel-title" style={{fontWeight : "bold"}}>{agency.name}
                                 <span className="glyphicon glyphicon-plus" aria-hidden="false"  onClick={this.openModal.bind(this, agency.name)} style={ {float: "right"}}></span>
                                 </p>
    	    				</div>
                            <table  className="table">
                                <thead>
                                <tr>
                                    <th>Ciudad</th>
                                    <th>Costo</th>
                                </tr>
                                </thead>
                                
                                <tbody> 
                                {
                                    agency.routes.map(function (route)
                                    {
                                        return(
                                             <tr key={Math.random()}>
                                                <td >{route.city}</td>
                                                <td> $ {route.cost}</td>
                                            </tr>
                                        )
                                    })                                  
                                }
                                </tbody>
                            </table>
    	    			</div>
                        )
                    },this)
        		}
        		</div>
               
                <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.selectedAgency}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                 <form id="routeForm" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="inputName">Ciudad</label>
                                        <input type="text" className="form-control" id="inputName" value={this.state.newCity} onChange={this.handleNewCity} placeholder="ciudad" required/>
                                        <label htmlFor="inputCost">Costo</label>
                                        <input type="number" className="form-control" id="inputCost" value={this.state.newCost} onChange={this.handleNewCost} placeholder="costo" required/>
                                    </div>
                                 <Modal.Footer>
                                    <input type="submit" value="Agregar" className="btn btn-primary"/>
                                    <Button type='button' onClick={this.closeModal.bind(this)}>Cancelar</Button>
                                </Modal.Footer>
                                 
                                 </form>
                            </Modal.Body>            
                </Modal>  

            </div>
        );
    }
}

class RoutesQueryResult extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="col-md-12">
                <div className="panel panel-primary" >
                    <div className="panel-heading" style={{backgroundColor : '#4a4b4c'}}>
    	    			<p className="panel-title" style={{fontWeight : "bold"}}>Costos por Agencia</p>          
    	    		</div>
                    <table  className="table">
                        <thead>
                            <tr>
                                <th>Ciudad</th>
                                <th>Agencia</th>
                                <th>Costo</th>
                            </tr>
                        </thead> 
                        <tbody> 
                        {
                                    this.props.routes.map(function (route)
                                    {
                                        return(
                                             <tr key={Math.random()}>
                                                <td >{route.city}</td>
                                                <td >{route.agency}</td>
                                                <td> $ {route.cost}</td>
                                            </tr>
                                        )
                                    })                                  
                        }
                        </tbody>
                    </table>
    	    	</div>
            </div>
        );
    }
}