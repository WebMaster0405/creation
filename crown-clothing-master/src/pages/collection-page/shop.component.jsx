import React from 'react';
import './shop.styles.scss';
import SHOP_DATA from './shoppage.data';
import CollectionPreview from '../../components/collection-peview/collection-preview.component';

class ShopPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            shopdata: SHOP_DATA
        }
    }

    render(){
        return(
            <div className="shop-page">
                {this.state.shopdata.map(({id, ...otherShopdataProps})=>(
                    <CollectionPreview key={id} {...otherShopdataProps}/>
                ))}
            </div>
        )
    }
}

export default ShopPage;