import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import {apiGet} from './firebaseFactory.jsx';
import FilterTrack from './FilterTrack.jsx';

import * as firebase from 'firebase';
import * as config from './config.jsx'
import * as databaseFactory from './firebaseTest.jsx'

import CopyToClipboard from 'react-copy-to-clipboard';



export default class TrackingList extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
                trackings : [],
                url : config.agencyUrl,
                selectedTracking : '',
                showModal : false
         };


	   this.handleDelete = this.handleDelete.bind(this);
       this.searchTrackings = this.searchTrackings.bind(this);
       this.clearSearch = this.clearSearch.bind(this);
	}


    componentDidMount(){
        this.loadTrackings();
        
    }

    //Open the modal and save the selected message.
    openModal(item, e) {
        this.setState({ 
            showModal: true, 
            selectedTracking : item
        });
        //console.log(this.state.selectedMessage);
    }
    
    closeModal() {
        this.setState({ showModal: false });
    }

    componentWillUnmount(){
        this.removeDatabaseReference();
        console.log("unmounted")
    }   

    loadTrackings(){
        var rootRef = firebase.database().ref().child('trackings').orderByKey();
        rootRef.on('value', snap => {
            var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            result.reverse();
            this.setState({trackings : result});
        });
    }


    handleDelete(){
        var trackingsRef = firebase.database().ref('trackings');
        var query = trackingsRef.orderByChild('trackingNumber').equalTo(this.state.selectedTracking);
        query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
        //console.log(item);
        this.closeModal();
    }


    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('trackings').orderByKey();
        rootRef.off();
    }


    searchTrackings(query){
        var searchResult = [];
        var agency = '';
        var name = '';
        var trackingNumber = '';
        var queryFilter = query.toLowerCase();
        
        this.state.trackings.map(function(t){
            agency = t.agency.toLowerCase();
            name = t.name.toLowerCase();
            trackingNumber = t.trackingNumber.toLowerCase();

            if ( ((agency).indexOf(queryFilter) > -1) || ((name).indexOf(queryFilter) > -1) || ((trackingNumber).indexOf(queryFilter) > -1) ) {
                searchResult.push(t);
            }
        });
        
        this.setState({ trackings : searchResult}); 
    }



    clearSearch(){
        this.loadTrackings();
    }



    render(){
    	return(
            <div>
                <FilterTrack searchTrackings={this.searchTrackings} clearSearch={this.clearSearch}/>
        		<div className="col-md-12">
        		{
                    this.state.trackings.map(function(t){
                        return(
    	    			<div key={t.trackingNumber} className="panel panel-primary" >
    	    				<div className="panel-heading">
    	    					<p className="panel-title" style={{fontWeight : "bold"}}>{t.name}</p>
                                
    	    				</div>
    	    				<div className="panel-body">
    	    					<p>Agencia: {t.agency}</p>
                                <p>Fecha: {t.date}</p>
                                <p>Número: {t.trackingNumber}</p>
                                <ModifyButton deleteOption={this.openModal.bind(this, t.trackingNumber)} url={this.state.url + t.trackingNumber} active={t.agency === 'DAC'} />
                            </div>
    	    			</div>

                        )
                    },this)
        			
        		}
        		</div>
                
                <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Envío</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>  
                            <Button onClick={this.handleDelete.bind(this)}>Eliminar</Button>
                            <Button onClick={this.closeModal.bind(this)}>Cancelar</Button>
                        </Modal.Footer>
                </Modal>
            </div>
    	);
    }
}



class ModifyButton extends React.Component{

    render(){
        return(
            <div className="btn-group" >
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown"> 
                    Opciones 
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" role="menu">
                    <li>
                        {(this.props.active) ? (<a target='_blank' href={this.props.url}>Ver Estado</a>) : ('') }
                        <a href='#'>Modificar</a>
                        <a href='#' onClick={this.props.deleteOption}>Eliminar</a>
                    </li>
                </ul>
                {(this.props.active) ? (
                    
                    <CopyToClipboard text={this.props.url}>
                        <button type="button" className="btn btn-primary" style={{margin : "0px 0px 0px 0px"}}>Copiar</button> 
                    </CopyToClipboard>

                    ) : ('')
                }   
            </div>
            );
    }
}