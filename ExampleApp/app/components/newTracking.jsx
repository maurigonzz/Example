import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import Tracking from './Tracking.jsx';
import * as firebase from 'firebase';


export default class NewTracking extends React.Component {
    constructor(props){
      super(props);
      this.state = {
                      agencies : []
                };
    }

    
    componentDidMount(){
        this.loadAgencies();
    }

    componentWillUnmount(){
        this.removeDatabaseReference();
    } 


    loadAgencies(){
            var rootRef = firebase.database().ref().child('agencies').orderByKey();
            rootRef.on('value', snap => {
                var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k].name });
                console.log(result);
                this.setState({agencies : result});
            });
        }


    createTrack(tracking){
      //Do the Post of the track.
       event.preventDefault();
      firebase.database().ref('trackings').push(tracking);
    }

    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('agencies').orderByKey();
        rootRef.off();
    }



    render() {
        return (
            <div>
                  <Tracking agencies={this.state.agencies}  submitType="Guardar" handleTracking={this.createTrack}/> 
            </div>

        );
    }
}

