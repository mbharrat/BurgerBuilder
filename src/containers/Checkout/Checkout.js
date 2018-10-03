import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
	onCancelHandler = () => {
		this.props.history.goBack();
	}

	onContinueHandler = () => {
		this.props.history.replace({pathname: '/checkout/contact-data'});
	}
	state = {
		ingredients: {
			lettuce: 1,
			meat: 1,
			cheese: 1,
			bacon: 1
		},
		totalPrice: 0
	}
	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0
		for(let param of query.entries()){
			if(param[0]=== 'price'){
				price = param[1];
			}else{
				ingredients[param[0]] = +param[1];
			}
			
		}
		this.setState({ingredients: ingredients, totalPrice: price});
	}
	render(){
		return(
			<div>
				<CheckoutSummary 
				ingredients={this.state.ingredients} 
				checkoutCancel={this.onCancelHandler}
				checkoutContinue={this.onContinueHandler}/>
				<Route path={this.props.match.path+'/contact-data'} 
				render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
			</div>
		);
	}
}

export default Checkout;