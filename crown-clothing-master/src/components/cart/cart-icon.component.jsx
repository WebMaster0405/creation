import React from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as CartLogo } from '../../assets/cart-icon.svg';
import { connect } from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={() => toggleCartHidden()}>
        <CartLogo className="shopping-icon"/>
        <div className="item-count"> {itemCount} </div>
    </div>
)
const mapDispatchToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})
const mapStateToProps = (state) => ({
    itemCount: selectCartItemsCount(state)
})
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);