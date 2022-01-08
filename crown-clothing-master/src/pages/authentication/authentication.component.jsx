import React from 'react';
import './authenticatioon.styles.scss';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const AuthenticationPage = () => (
    <div className="sign-in-sign-up">
        <SignIn/>
        <SignUp/>
    </div>
)

export default AuthenticationPage;