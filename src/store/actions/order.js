import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
};

export const purchaseBurgerBegin = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_BEGIN
	}
};

export const purchaseBurgerStart = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerBegin());
		axios.post('/orders.json', orderData).then(response => {
			console.log(response.data);
			dispatch(purchaseBurgerSuccess(response.data.name, orderData));
		
			}).catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	}

	
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};


export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
		.then(resp =>{
			//console.log(resp.data);
			const fetchedOrders =[];
			for(let key in resp.data){
				fetchedOrders.push({...resp.data[key],id: key});
			}
			dispatch(fetchOrdersSuccess(fetchedOrders));
		}).catch(err =>{
			dispatch(fetchOrdersFail(err));
		});
	};
};











