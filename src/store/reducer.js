import * as actionTypes from './actions';

const initialState = {
	ingredients : {
		lettuce: 0,
		cheese: 0,
		bacon: 0,
		meat: 0
	},
	totalPrice: 4
};

const INGREDIENT_PRICES = {
	lettuce: 0.2,
	cheese: 0.5,
	bacon: 1,
	meat: 1.5
};

const reducer = (state=initialState, action) =>{
	switch(action.type){
		case actionTypes.ADD_INGREDIENT:
			return{
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.DELETE_INGREDIENT:
			return{
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

			};
		default:
			return state;

		
	}
};

export default reducer;