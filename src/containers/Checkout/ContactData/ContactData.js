import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
	state = {
		orderForm:{
				name: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Your Name'
					},
					value: '',
					validation: {
						required: true

					},
					valid: false,
					didTouch: false
				},
				street: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Street'
					},
					value: '',
					validation: {
						required: true
						
					},
					valid: false,
					didTouch: false
				},
				city: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'City'
					},
					value: '',
					validation: {
						required: true
						
					},
					valid: false,
					didTouch: false
				},
				state: {
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'State'
					},
					value: '',
					validation: {
						required: true
						
					},
					valid: false,
					didTouch: false
				},
				zipCode:{
					elementType: 'input',
					elementConfig: {
						type: 'number',
						placeholder: 'ZipCode'
					},
					value: '',
					validation: {
						required: true,
						minLength: 5,
						maxLength: 5
						
					},
					valid: false,
					didTouch: false
				},
				country:{
					elementType: 'input',
					elementConfig: {
						type: 'text',
						placeholder: 'Country'
					},
					value: '',
					validation: {
						required: true
						
					},
					valid: false,
					didTouch: false
				},
				email: {
					elementType: 'input',
					elementConfig: {
						type: 'email',
						placeholder: 'Your Email'
					},
					value: '',
					validation: {
						required: true
						
					},
					valid: false,
					didTouch: false
				},
				deliveryMethod: {
					elementType: 'select',
					elementConfig: {
						options: [
							{value: 'fastest', displayValue: 'Fastest'},
							{value: 'cheapest', displayValue: 'Cheapest'}
						]
					},
					value: 'fastest',
					valid: true
				}
		},
		formIsValid: false,
		loading: false,

	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})
		const formData = {};
		for(let formElementIdentifier in this.state.orderForm){
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		}
		axios.post('/orders.json', order).then(response => {
			this.setState({loading: false});
			this.props.history.push('/');
			console.log("did post");
			}).catch(error => {
				this.setState({loading: false});
			});
	}
	checkValidity(value, rules) {
		let isValid = false;

		if(rules.required){
			isValid = value.trim() !=='';
		}

		if(rules.minLength){
			isValid = value.length >= rules.minLength;
		}

		if(rules.maxLength){
			isValid = value.length === rules.maxLength;
		}
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm

		};
			const updatedFormElement = {
				...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		if(updatedFormElement.elementType != 'select'){
			updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
		}
		updatedFormElement.didTouch = true;
		console.log(updatedFormElement.valid);
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for(let inputIdentifier in updatedOrderForm){
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});


		
	}
	render(){
		const formElementsArray =[];
		for(let key in this.state.orderForm){
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
				<form onSubmit={this.orderHandler}>
					{formElementsArray.map(formElement => (
						<Input key={formElement.id} elementType={formElement.config.elementType} 
						elementConfig={formElement.config.elementConfig} 
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.didTouch}
						changed={(event)=>this.inputChangedHandler(event, formElement.id)}

						/>
					))}
					<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
				</form>
		);
		if(this.state.loading){
			form = <Spinner/>;
		}
		return(
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
};

export default connect(mapStateToProps)(ContactData);