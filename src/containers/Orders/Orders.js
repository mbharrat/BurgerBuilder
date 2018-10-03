import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

class Orders extends Component {
	state = {
		orders:[],
		loading:true,

	}
	componentDidMount(){
		axios.get('/orders.json')
		.then(resp =>{
			//console.log(resp.data);
			const fetchedOrders =[];
			for(let key in resp.data){
				fetchedOrders.push({...resp.data[key],id: key});
			}
			this.setState({loading: false, orders: fetchedOrders});
		}).catch(err =>{
			this.setState({loading: false});
		});
	}
	render(){
		return(
			<div>
				{this.state.orders.map(order => (
					<Order 
					key={order.id}
					ingredients={order.ingredients}
					price={Number.parseFloat(order.price).toFixed(2)}/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders,axios);