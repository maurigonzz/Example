import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';
import Menu from './menu.jsx';
import Menu2 from './menu2.jsx';
import Menu3 from './menu3.jsx';
import Menu4 from './menu4.jsx';
import NewTracking from './newTracking.jsx';
import TrackingList from './trackingList.jsx';
import './style.scss';
import './bootflat/scss/bootflat.scss';
import Tracking from './Tracking.jsx';
import Agency from './Agency.jsx';
import ClientTracking from './clientTracking.jsx';
import Login from './login.jsx';
import MessagesList from './messages.jsx';

import * as firebase from 'firebase';


  var config = {
    apiKey: "AIzaSyBrlMI10NSgBvUBByHKyZIUEXW-kPOUhF0",
    authDomain: "trackapp-aafa6.firebaseapp.com",
    databaseURL: "https://trackapp-aafa6.firebaseio.com",
    storageBucket: "trackapp-aafa6.appspot.com",
    messagingSenderId: "247309817139"
  };
  firebase.initializeApp(config);
  var database = firebase.database();



class App extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
            user : null
        }
    
        this.handleAuth = this.handleAuth.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.renderApp = this.renderApp.bind(this);
    }


    componentWillMount () {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user }, function(){console.log(user)})
         })
     }


    handleAuth(user) {
            //const auth = new firebase.auth();
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
              .then(result => console.log(result +  'ha iniciado sesión'))
              .catch(error => {
                    console.log(`Error ${error.code}: ${error.message}`)
                    alert("Error de autenticación")}
                    );
      }



    handleLogout() {
             firebase.auth().signOut()
                .then(result => console.log('Te has desconectado correctamente'))
                .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }



    renderApp(){
        return (
                <div>
                    <nav>
                        <Menu4 logout={this.handleLogout}/>
                    </nav>
                    <section className="mainSection">
                       {this.props.children}
                    </section>
                </div>
            );
    }


    render(){
        return(
            <div>
                {(this.state.user) ? this.renderApp() : <Login signIn={this.handleAuth}/> }
            </div>
        );
    }
}

//Using React Route and Link Navigation
ReactDOM.render(
    <Router history = {hashHistory}>
        <Route path = "/" component = {App}>
            <IndexRoute component = {TrackingList} />
            <Route path = "trackingList" component = {TrackingList} />
            <Route path = "newTracking" component = {NewTracking} />
            <Route path = "agency" component = {Agency} />
            <Route path = "clientTracking" component = {ClientTracking} />
            <Route path = "messagesList" component = {MessagesList} />
        </Route>
    </Router>
,
    document.getElementById('container')
);