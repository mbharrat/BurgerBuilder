import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	
	componentDidMount(){
		this.props.onFetchOrders();
	}
	render(){
		let orders = <Spinner/>
		if(!this.props.loading){
			orders= this.props.orders.map(order => (
					<Order 
					key={order.id}
					ingredients={order.ingredients}
					price={Number.parseFloat(order.price).toFixed(2)}/>
				))
		}
		return(
			<div>
				{orders}
			</div>
		);
	}
}
const mapStateToProps  = state => {
	return{
		orders: state.orderReducer.orders,
		loading: state.orderReducer.loading
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));