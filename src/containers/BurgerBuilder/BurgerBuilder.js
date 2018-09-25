import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	lettuce: 0.2,
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
		ingredients : null,
		totalPrice: 4,
		ablePurchase: false,
		didClickOrder: false,
		loading: false,
		error: false
	}
	componentDidMount() {
		axios.get('https://mikeburger-c1225.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});
			}).catch(error=>{
				this.setState({error: true});
			});
	}

	updatePurchaseState = (ingredients) => {
		/*
		const ingredients = {
			...this.state.ingredients
		};
		*/
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum,el) =>{
			return sum+el;
		},0);
		this.setState({ablePurchase: sum>0});
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
		this.updatePurchaseState(updatedIngredients);
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
		this.updatePurchaseState(updatedIngredients);
	}
	didClickOrderHandler = () => {
		this.setState({didClickOrder: true});
	}
	cancelOrderHandler = () => {
		this.setState({didClickOrder: false});
	}
	continuePurchaseHandler = () => {
		//alert("You will continue");
		this.setState({loading: true})
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Michael Bharrat',
				address: {
					street: 'Test1',
					zipCode:'111111',
					country:'America'
				},
				email: 'mbharrat@gmail.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order).then(response => {
			this.setState({loading: false, didClickOrder: false});
			}).catch(error => {
				this.setState({loading: false, didClickOrder: false});
			});


	}
	render(){
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0;
		}
		let orderSummary = null;

		let burger = this.state.error ? <p style={{textAlign:'center'}}> <strong>Ingredients can't be loaded!</strong></p> : <Spinner/>
		if(this.state.ingredients){
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls 
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					ablePurchase={this.state.ablePurchase}
					didClickOrder={this.didClickOrderHandler}/>
				</Aux>);
			orderSummary = <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} cancelClicked={this.cancelOrderHandler} continueClick={this.continuePurchaseHandler}/>
			
		}

		if(this.state.loading){
			orderSummary = <Spinner/>
		}
		
		//{salad: true, meat: false,....}
		return(

			<Aux>
				<Modal show={this.state.didClickOrder} modalClosed={this.cancelOrderHandler}>
					{orderSummary}
				</Modal>
				{burger}
				
			</Aux>

		);
	}

}

export default withErrorHandler(BurgerBuilder, axios);