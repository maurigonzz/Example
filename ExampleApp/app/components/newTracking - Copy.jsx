import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';


export default class NewTracking extends React.Component {
    constructor(props){
      super(props);
      this.state = {
                      name : '',
                      trackingNumber: '',
                      date : new Date().toISOString().slice(0,10),
                      agencies : ["Agencia1","Agencia2","Agencia3","Agencia4"],
                      agencySelected : ''
                };

        this.handleAgencyChange =  this.handleAgencyChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTrackingNumberChange = this.handleTrackingNumberChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        //this.loadTrackings();

    }


    handleNameChange(event){
        this.setState({name : event.target.value});
        console.log(event.target.value);
    }

    handleTrackingNumberChange(event){
        this.setState({trackingNumber : event.target.value});
        console.log(event.target.value);
    }

    handleAgencyChange(event){
        this.setState({agencySelected : event.target.value});
        console.log(event.target.value);
        
    }

    handleDateChange(event){
      this.setState({date : event.target.value});
      console.log(event.target.value);
    }


    handleSubmit(event){
      event.preventDefault();
        /*
        var ag = this.state.agencySelected
        if (ag === ''){
          ag = this.state.agencies[0];
        }
        */
      var ag = this.state.agencySelected;
      ag = ((ag === '') ? this.state.agencies[0] : ag);

      var tracking = {
          name : this.state.name,
          trackingNumber : this.state.trackingNumber,
          date : this.state.date,
          agency : ag
      }

      console.log(tracking);
      this.createTrack(tracking);

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


    //this is just for test the API GET
    loadTrackings(){
        var url = 'https://angularfirebaseexample-460dd.firebaseio.com/.json';
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((gen) => {
                //this.setState({ genres: gen, genreSelected: gen[0]})
                console.log(gen);
            }).catch((error) => {
            console.error(error);
        });
    }



    render() {
        return (
            <div className="col-md-12">
                          <form id="deliveryForm" onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                  <label htmlFor="inputName">Nombre</label>
                                  <input type="text" className="form-control" id="inputName" value={this.state.nombre} onChange={this.handleNameChange} placeholder="nombre" required/>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="inputTracking">Número de Envío</label>
                                  <input type="text" className="form-control" id="inputTracking" value={this.state.trackingNumber} onChange={this.handleTrackingNumberChange} placeholder="número de envío" required/>
                              </div>
                             
                              <div className="form-group">
                                  <label htmlFor="inputDate">Fecha</label>
                                  <input type="date" className="form-control" id="inputDate" defaultValue={this.state.date} onChange={this.handleDateChange}/>
                              </div>

                               <div className="form-group">
                                  <label htmlFor="inputEmail">Agencia</label>
                                  <SelectOptions id="selectAgency" options={this.state.agencies} defaultq={this.state.agencies[0]} selectedOpt={this.handleAgencyChange}/>
                              </div>
                             
                              <Modal.Footer>
                                <input type="submit" value="Save" className="btn btn-primary"/>
                                <Button  bsStyle="danger">Close</Button>
                            </Modal.Footer>
                          </form>        
            </div>

        );
    }
}


class SelectOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <select id="selectAgencies" name="agencies" className="form-control" defaultValue={this.props.defaultq} onChange={this.props.selectedOpt}>
                    {
                        this.props.options.map(function(agen){
                            return (
                                <option  key={agen} value={agen}>{agen}</option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }

}


