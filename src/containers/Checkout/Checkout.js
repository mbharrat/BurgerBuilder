import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component{
	

	onCancelHandler = () => {
		this.props.history.goBack();
	}

	onContinueHandler = () => {
		this.props.history.replace({pathname: '/checkout/contact-data'});
	}
/***********************************************************************************************************************/
/*				removed with redux


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

/***********************************************************************************************************************/
	render(){
		let summary = <Redirect to='/'/>

		if(this.props.ings){
			const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary 
					ingredients={this.props.ings} 
					checkoutCancel={this.onCancelHandler}
					checkoutContinue={this.onContinueHandler}/>
					<Route path={this.props.match.path+'/contact-data'} component={ContactData}/>
				</div>
			);
		}
		return summary;

	}
}

const mapStateToProps = state => {
	return {
		ings: state.reducer.ingredients,
		purchased: state.orderReducer.purchased
	};
};



export default connect(mapStateToProps)(Checkout);



