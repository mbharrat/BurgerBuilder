import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
	salad: 0.2,
	cheese: 0.5,
	bacon: 1,
	meat: 1.5
};

class BurgerBuilder extends Component {
	/*
	constructor(props) {
		super(props);
		this.state = {...}
	}
	*/
	state = {
		ingredients : {
			lettuce: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount+1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		//sets the state to new terms
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0 ){
			return;
		}
		const updatedCount = oldCount-1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		//sets the state to new terms
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	}
	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0;
		}
		//{salad: true, meat: false,....}
		return(
			<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
				ingredientAdded={this.addIngredientHandler}
				ingredientRemoved={this.removeIngredientHandler}
				disabled={disabledInfo}/>
			</Aux>

		);
	}

}

export default BurgerBuilder;