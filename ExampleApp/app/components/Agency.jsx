import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import * as firebase from 'firebase';


export default class Agency extends React.Component {
    constructor(props){
      super(props);
      this.state = {
                      agencies : [],
                      newAgency : '',
                      selectedAgency : '',
                      showModal : false
                };

      this.handleNewAgency =  this.handleNewAgency.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); 
      this.handleDelete = this.handleDelete.bind(this);
    
      //var id = this.getURLParameter("id");
      //console.log(this.props);
      //console.log(this.props.location.query.id);

    }



    componentDidMount(){ 
        this.loadAgencies();
        this.testAddCityCost();


        
    }

    componentWillUnmount(){
        this.removeDatabaseReference();
        //console.log("unmounted")
    }  


    handleNewAgency(event){
        this.setState({newAgency : event.target.value});
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
        this.setState({ showModal: false });
    }

    loadAgencies(){
        var rootRef = firebase.database().ref().child('agencies').orderByKey();
        rootRef.on('value', snap => {
            var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k].name });
            //console.log(result);
            this.setState({agencies : result});
        });
    }


    handleSubmit(event){
      event.preventDefault();
      if(this.verifyInputs()){
         firebase.database().ref('agencies').push({
           'name' : this.state.newAgency
          });
        this.clearInputs();

      }else{
        alert('Completar los datos');
      }
    
    }

    handleDelete(){
        var trackingsRef = firebase.database().ref('agencies');
        var query = trackingsRef.orderByChild('name').equalTo(this.state.selectedAgency);
        query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
        //console.log(item);
        this.closeModal();
    }

    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('agencies').orderByKey();
        rootRef.off();
    }


    

    verifyInputs(){
      if(this.state.newAgency !== ''){
        return true;
      }else{
        return false;
      }
    }

    clearInputs(){
      this.setState({ newAgency : ''});
    }



    
    
    testAddCityCost(){
        var city = {
            city : 'San José',
            cost : '100'
        };


        var agenciesRef = firebase.database().ref('agencies');
                var query = agenciesRef.orderByChild('name').equalTo('Agencia');
                query.on('child_added', function(snapshot) {
                    snapshot.ref.child('routes').push(city);
                });


         //firebase.database().ref('agencies/cities').push(city);
    }





    render() {
        return (
            <div className="col-md-12">
                          <form id="deliveryForm" onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                  <label htmlFor="inputName">Agencia</label>
                                  <input type="text" className="form-control" id="inputName" value={this.state.newAgency} onChange={this.handleNewAgency} placeholder="agencia" required/>
                              </div>

                              <Modal.Footer>
                                <input type="submit" value="Agregar" className="btn btn-primary"/>
                            </Modal.Footer>
                          </form> 

                          <div key='1' className="panel panel-success">
                            <div className="panel-heading">
                                <h3 className="panel-title">Agencias</h3>
                                             
                            </div>
                            <div className="panel-body">
                                <ul className="list-group">
                                {
                                  this.state.agencies.map(function(agency){
                                    return(
                                        <li key={agency} className="list-group-item">{agency}
                                          <span className="glyphicon glyphicon-remove" aria-hidden="false" onClick={this.openModal.bind(this, agency)} style={ {float: "right"}}></span>
                                        </li>
                                      )
                                  },this)
                                  
                                }
                                </ul>
                            </div>
                        </div>     
                        
                        <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Eliminar Agencia</Modal.Title>
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



