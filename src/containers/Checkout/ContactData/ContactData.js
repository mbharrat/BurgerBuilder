import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			city: '',
			state: '',
			postalCode:''
		},
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
			this.setState({loading: false});
			this.props.history.push('/');
			console.log("did post");
			}).catch(error => {
				this.setState({loading: false});
			});
	}
	render(){
		let form = (
				<form>
					<input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
					<input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
					<input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
					<input className={classes.Input} type="text" name="city" placeholder="Your City"/>
					<input className={classes.Input} type="text" name="postalCode" placeholder="Your Zipcode"/>
					<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;