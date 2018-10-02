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
		}
	}
	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for(let param of query.entries()){
			ingredients[param[0]] = +param[1];
		}
		this.setState({ingredients: ingredients});
	}
	render(){
		return(
			<div>
				<CheckoutSummary 
				ingredients={this.state.ingredients} 
				checkoutCancel={this.onCancelHandler}
				checkoutContinue={this.onContinueHandler}/>
				<Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
			</div>
		);
	}
}

export default Checkout;