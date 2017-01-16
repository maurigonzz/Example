import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import Tracking from './Tracking.jsx'


export default class NewTracking extends React.Component {
    constructor(props){
      super(props);
      this.state = {
                      agencies : []
                };

        
        //this.loadTrackings();

    }

    componentWillMount(){
        //this.loadAgencies();
    }


    loadAgencies(){
        var url = 'https://trackapp-aafa6.firebaseio.com/agencies.json';
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                var result = Object.keys(data).map(function(k) { return data[k] });
                this.setState({ agencies : result}, function(){console.log(this.state.agencies);});
            }).catch((error) => {
                console.error(error);
        });
    }


    createTrack(tracking){
      //Do the Post of the track.
        var url = 'https://trackapp-aafa6.firebaseio.com/trackings.json';
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tracking)
        }).then((result) => {
            console.log(result);
        }).then(() => {
            //hashHistory.push('moviePage/'+ this.state.id);
            //this.close();
        });

    }

    handleTest(data){
      console.log(data);
    }


    render() {
        return (
            <div>
                  <Tracking agencies={this.state.agencies}  submitType="Guardar" handleTracking={this.createTrack}/> 
            </div>

        );
    }
}

