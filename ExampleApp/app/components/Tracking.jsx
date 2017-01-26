import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Router, Route, Link, hashHistory, IndexRoute  } from 'react-router';


export default class Tracking extends React.Component {
    constructor(props){
      super(props);
      this.state = {
                      name : '',
                      trackingNumber: '',
                      date : new Date().toISOString().slice(0,10),
                      agencies: this.props.agencies,
                      agencySelected : '',
                      couponId : '0'
                };

        this.handleAgencyChange =  this.handleAgencyChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTrackingNumberChange = this.handleTrackingNumberChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCouponChange = this.handleCouponChange.bind(this);
    }


    componentWillReceiveProps(nextProps){
        if (nextProps.agencies !== this.props.agencies){
          this.setState({agencies : nextProps.agencies});
        }
    }


    handleNameChange(event){
        this.setState({name : event.target.value});
    }

    handleTrackingNumberChange(event){
        this.setState({trackingNumber : event.target.value});
    }

    handleAgencyChange(event){
        this.setState({agencySelected : event.target.value});    
    }

    handleDateChange(event){
      this.setState({date : event.target.value});
    }

    //For the moment we only manage one type of coupon. Later can be upgraded to manage many coupons with id.
    handleCouponChange(event){
        console.log(event.target.checked);
        if(event.target.checked){
          this.setState({couponId : '1'});
        }else{
            this.setState({couponId : '0'});
        }
        console.log(this.state.couponId);
    }



    handleSubmit(event){
      event.preventDefault();

      var ag = this.state.agencySelected;
      ag = ((ag === '') ? this.state.agencies[0] : ag);

      if(this.verifyInputs()){
          var tracking = {
              name : this.state.name,
              trackingNumber : this.state.trackingNumber,
              date : this.state.date,
              agency : ag,
              couponId : this.state.couponId
          }
          //returning data
          this.props.handleTracking(tracking);
          hashHistory.push('trackingList/');
      }else{
        alert('Completar todos los campos');
      }
  }


     verifyInputs(){
      if((this.state.name !== '') && (this.state.trackingNumber !== '')){
        return true;
      }else{
        return false;
      }
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
                             
                             <div className="form-group">
                                  <label htmlFor="checkboxCoupon">Agregar Cupón:</label>
                                  <label className="toggle" style={{float : "right"}}>
                                      <input type="checkbox" id="checkboxCoupon" value={this.state.couponId} onChange={this.handleCouponChange}/>
                                      <span className="handle"/>
                                  </label>
                              </div>


                              <Modal.Footer>
                                <input type="submit" value={this.props.submitType} className="btn btn-primary"/>
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


