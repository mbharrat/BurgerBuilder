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







