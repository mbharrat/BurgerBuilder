import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
	ingredients : null,
	totalPrice: 4,
	error: false
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
			var updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
			var updatedIngredients = updateObject(state.ingredients,updatedIngredient);
			var updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
			return updateObject(state, updatedState);
			
		case actionTypes.DELETE_INGREDIENT:
			var updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
			var updatedIngredients = updateObject(state.ingredients,updatedIngredient);
			var updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
			return updateObject(state, updatedState);

		case actionTypes.SET_INGREDIENTS:
			return updateObject(state, {
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false
			});
			
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, {error: true});
		default:
			return state;

		
	}
};

export default reducer;