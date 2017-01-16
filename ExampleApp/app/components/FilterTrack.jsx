import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';


export default class FilterTrack extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			query: ''
		}


    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmitQuery = this.handleSubmitQuery.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);

	}

  handleQueryChange(event){
        this.setState({query : event.target.value});
        console.log(event.target.value);
  }


  handleSubmitQuery(event){
      console.log(this.state.query);
      this.props.searchTrackings(this.state.query);
  }

  handleClearSearch(event){
      //console.log("Clear Search");
      this.props.clearSearch();
      this.setState({query : ''});
  }




render(){
	return(
		<div className="col-md-12">
        <nav className="navbar navbar-inverse">
                    <div className="container-fluid">

                      <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Buscar</a>
                      </div>

          
                      <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-2" >
                        <form className="navbar-form navbar-left" role="search" onSubmit={this.handleSubmitQuery}>
                            <div className="form-group">
                                <input type="text" id="inputQuery" className="form-control" value={this.state.query} onChange={this.handleQueryChange} placeholder="buscar"/>
                            </div>
                            <div className="btn-group" style={{margin : "10px"}}>
                              <button type="submit" className="btn btn-primary">Buscar</button>
                              <button type="button" className="btn btn-default" onClick={this.handleClearSearch}>Borrar</button>
                            </div>
                        </form>
                        
                      </div>
                    </div>
        </nav>
    </div>
	);
}

}
