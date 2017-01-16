import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import {apiGet} from './firebaseFactory.jsx';
import FilterTrack from './FilterTrack.jsx';

import * as firebase from 'firebase';
import * as config from './config.jsx'
import CopyToClipboard from 'react-copy-to-clipboard';



export default class TrackingList extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
                trackings : [],
                url : config.agencyUrl
         };


	   this.handleDelete = this.handleDelete.bind(this);
       this.searchTrackings = this.searchTrackings.bind(this);
       this.clearSearch = this.clearSearch.bind(this);
	}


    componentDidMount(){
        this.loadTrackings();
    }


    componentWillUnmount(){
        this.removeDatabaseReference();
        console.log("unmounted")
    }   

    loadTrackings(){
        var rootRef = firebase.database().ref().child('trackings').orderByKey();
        rootRef.on('value', snap => {
            var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            console.log(result);
            this.setState({trackings : result});
        });
    }


    handleDelete(item, e){
        var trackingsRef = firebase.database().ref('trackings');
        var query = trackingsRef.orderByChild('trackingNumber').equalTo(item );
        query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
        //console.log(item);
    }


    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('trackings').orderByKey();
        rootRef.off();
    }


    //Must be corrected. Now is case sensitve.
    searchTrackings(query){
        var searchResult = [];
        this.state.trackings.map(function(t){
            if ( ((t.agency).indexOf(query) > -1) || ((t.name).indexOf(query) > -1) || ((t.trackingNumber).indexOf(query) > -1) ) {
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
    	    			<div key={t.trackingNumber} className="panel panel-primary">
    	    				<div className="panel-heading">
    	    					<h3 className="panel-title">{t.name}</h3>
                                
    	    				</div>
    	    				<div className="panel-body">
    	    					<p>Agencia: {t.agency}</p>
                                <p>Fecha: {t.date}</p>
                                <p># {t.trackingNumber}</p>
                                <p>url</p>
                                <ModifyButton deleteOption={this.handleDelete.bind(this, t.trackingNumber)} url={this.state.url + t.trackingNumber} active={t.agency === 'DAC'} />
                            </div>
    	    			</div>

                        )
                    },this)
        			
        		}
        		</div>
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