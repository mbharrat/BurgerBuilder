import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

//store these prices on a server?? @TODO
//let INGREDIENT_PRICES = {};



class BurgerBuilder extends Component {
	/*
	constructor(props) {
		super(props);
		this.state = {...}
	}
	*/
	state = {
		didClickOrder: false,
		loading: false,
		error: false
	}
	/*
	componentDidMount() {
		
		axios.get('https://mikeburger-c1225.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data});

			}).catch(error=>{
				this.setState({error: true});
			});
		
		axios.get('https://mikeburger-c1225.firebaseio.com/ingredientPrices.json')
			.then(response => {
				INGREDIENT_PRICES = {...response.data};
				
			}).catch(error=>{
				this.setState({error: true});
			});
			
		
	}
	*/

	updatePurchaseState = (ingredients) => {
		
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum,el) =>{
			return sum+el;
		},0);
		return sum > 0;
	}
	
/*
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
*/
	
	didClickOrderHandler = () => {
		this.setState({didClickOrder: true});
	}
	cancelOrderHandler = () => {
		this.setState({didClickOrder: false});
	}
	continuePurchaseHandler = () => {
	
		const queryParam = [];
		for(let i in this.props.ings){
			//encodes elements so they can be used in URL
			queryParam.push(encodeURIComponent(i) + '='+encodeURIComponent(this.props.ings[i]));
		}
		queryParam.push('price='+this.props.price);
		const queryString = queryParam.join('&');
		this.props.history.push({pathname: '/checkout', search: '?'+queryString});
	}

	render(){
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <=0;
		}
		let orderSummary = null;

		let burger = this.state.error ? <p style={{textAlign:'center'}}> <strong>Ingredients can't be loaded!</strong></p> : <Spinner/>
		if(this.props.ings){
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientDeleted}
					disabled={disabledInfo}
					ablePurchase={this.updatePurchaseState(this.props.ings)}
					didClickOrder={this.didClickOrderHandler}
					price={this.props.price}/>
				</Aux>);
			orderSummary = <OrderSummary ingredients={this.props.ings} price={this.props.price} cancelClicked={this.cancelOrderHandler} continueClick={this.continuePurchaseHandler}/>
			
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



const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
		onIngredientDeleted: (ingName) => dispatch({type: actionTypes.DELETE_INGREDIENT, ingredientName:ingName})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));