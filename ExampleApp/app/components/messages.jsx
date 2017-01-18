import React, {Component} from 'react';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import * as firebase from 'firebase';
import * as config from './config.jsx'
import {Accordion, Panel, Modal, Button} from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';



export default class Messages extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
                messagesList : [],
                newMessage: '',
                newTitle : '',
         
                showModal: false,
                selectedMessage: ''
         };


        this.handleTitle = this.handleTitle.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);


	}


    componentDidMount(){
        this.loadMessages();
        
    }


    componentWillUnmount(){
        this.removeDatabaseReference();
    }   


    closeModal() {
        this.setState({ showModal: false });
    }


    //Open the modal and save the selected message.
    openModal(item, e) {
        this.setState({ 
            showModal: true, 
            selectedMessage : item
        });
        //console.log(this.state.selectedMessage);
    }
    
    loadMessages(){
        var rootRef = firebase.database().ref().child('messages').orderByKey();
        rootRef.on('value', snap => {
            var result = Object.keys(snap.val()).map(function(k) { return snap.val()[k] });
            //result.reverse();
            this.setState({messagesList : result});
        });
    }



    //Remove the selected message, after modal's confirmation.
    handleDelete(){


        var messageRef = firebase.database().ref('messages');
        var query = messageRef.orderByChild('title').equalTo(this.state.selectedMessage);
        query.on('child_added', function(snapshot) {
            snapshot.ref.remove();
        });
        //console.log(item);
    
        //close the modal
        this.closeModal();
    }


    removeDatabaseReference(){
        var rootRef = firebase.database().ref().child('messages').orderByKey();
        rootRef.off();
    }

    handleTitle(event){
        event.preventDefault();
        this.setState({newTitle : event.target.value});
    }

    handleMessage(event){
        event.preventDefault();
        this.setState({newMessage : event.target.value});
    }

    

    handleSubmit(event){
        event.preventDefault();
        if(this.verifyInputs()){
            var text = this.state.newMessage.replace(/\r?\n/g, '\n');


            var message = {
                title : this.state.newTitle,
                message : text
            };
            firebase.database().ref('messages').push(message);
            this.clearInputs();
        }else{
            alert('Debes completar el título y el mensaje');
        }
    }


    verifyInputs(){
      if((this.state.newTitle !== '') && (this.state.newMessage !== '')){
        return true;
      }else{
        return false;
      }
    }

    clearInputs(){
      this.setState({ 
            newMessage : '',
            newTitle : ''
        });
    }


    render(){
    	return(
            <div>
        		<div className="col-md-12">
                    <Accordion>
            		{
                        this.state.messagesList.map(function(t){
                            var title = (
                                <div className="col-md-12">
                                    <h5>{t.title}</h5>
                                    
                                </div>
                                );

                            return(
                                <Panel key= {t.title} header={title} eventKey={t.title} style={{padding : "1px"}} bsStyle="primary" >
                                    <div className="col-md-12">
                                        <span className="glyphicon glyphicon-remove" aria-hidden="false" onClick={this.openModal.bind(this, t.title)} style={ {float: "right", paddingRight : "5px"}}></span>
                                            {t.message.split('\n').map(function(item) {
                                                  return (
                                                    <span key={Math.random()}>
                                                      {item}
                                                      <br/>
                                                    </span>
                                                  )
                                                })}
                                    </div>
                                </Panel>

                            
                            )
            		      },this)
                    }
                    </Accordion>
                    <NewMessasge submit={this.handleSubmit} title={this.state.newTitle} message={this.state.newMessage} titleChange={this.handleTitle} messageChange={this.handleMessage}/>
        	       
                   <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar Mensaje</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>  
                            <Button onClick={this.handleDelete.bind(this)}>Eliminar</Button>
                            <Button onClick={this.closeModal.bind(this)}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal>
               </div>

            </div>
    	);
    }
}




class NewMessasge extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="col-md-12">
                <form onSubmit={this.props.submit}>
                                <div className="form-group">
                                    <label htmlFor="inputMessage">Mensaje:</label>
                                    <input type="text" className="form-control" value={this.props.title} onChange={this.props.titleChange} placeholder="Título" />
                                    <textarea className="form-control" id="inputMessage" rows="10" value={this.props.message} onChange={this.props.messageChange} placeholder="Mensaje" required/>
                                </div>
                                <input type="submit" value="Agregar" className="btn btn-primary" style={{float : "right"}}/>
                </form> 

            </div>
        );
    }
}