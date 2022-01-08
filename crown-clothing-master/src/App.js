import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/collection-page/shop.component';
import Header from './components/header/header.component';
import AuthenticationPage from './pages/authentication/authentication.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utilities';
import { setCurrentUser } from './redux/users/user.actions';


class App extends React.Component{
 unsubscribeFromAuth = null;

 componentDidMount() {
  const { setCurrentUser } = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged( async(userAuth) => {

      if(userAuth){
        //userRef is user document file from database returned by createUserProfile after querying as
        //const userRef = firestore.doc(`users/${userAuth.uid}`)
        const userRef =  await createUserProfileDocument(userAuth);

        //Snapshot is sent by firebase along with document
        //to get data from snapshot use snapshot.data(), as its hidden otherwise.
        userRef.onSnapshot(snapshot => {
          setCurrentUser(
            {
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }, 
            //second function in set.state parameter to console aync function after await is performed
            () => {
              //console.log(this.state.currentUser)
            }
          )
        });
      } else{
        setCurrentUser(this.props.currentUser)
        //i.e equals to setting currentUser to null as either no userauth or on signout - userAuth equals null
      }
      
   })
 }

 componentWillUnmount() {
   this.unsubscribeFromAuth();
 }

 render(){
  return (
    <div className='app'>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/authentication' component={AuthenticationPage} />
      </Switch>
    </div>
  );

 }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
  //whatever we passed in dispatch(whatever) redux pass it as action object as action.payload
})

export default connect(null, mapDispatchToProps)(App);
