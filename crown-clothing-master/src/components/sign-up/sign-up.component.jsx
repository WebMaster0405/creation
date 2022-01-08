import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createUserProfileDocument, auth } from '../../firebase/firebase.utilities';

class SignUp extends React.Component{

    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            passwordConfirm: ''  
        }
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        const {displayName, email, password, passwordConfirm} = this.state

        if(password !== passwordConfirm) return alert("passwords don't match")
        try{
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            //using auth.createUserWithEmailAndPassword(email, password) returns userAuth object
            //that can be used to create user in database.
            createUserProfileDocument(user, {displayName});
            this.setState({displayName: '', email: '', password:'', passwordConfirm: ''})
        } catch(err) {
            console.log('error signing up', err.message)
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState( {[name]: value} )
    }
    render() {
        return(
            <div className="sign-in">
                <h1 className="title">Don't Have An Account ?</h1>
                <span className="subtitle">Sign Us with your Email and Password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name="displayName" 
                        id="display-name" 
                        handleChange={this.handleChange}
                        label="Name"
                        value={this.state.displayName}
                        required
                    />                        
                    <FormInput 
                        type="email" 
                        name="email" 
                        id="sign-in-email" 
                        handleChange={this.handleChange}
                        label="Email"
                        value={this.state.email}
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        id="sign-in-password" 
                        handleChange={this.handleChange}
                        label="Password"
                        value={this.state.password}
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="passwordConfirm" 
                        id="passwordConfirm" 
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        value={this.state.passwordConfirm}
                        required
                    />
                    <CustomButton type='submit'> Sign Up </CustomButton>
                    
                </form>
            </div>
        )
    }
}

export default SignUp;