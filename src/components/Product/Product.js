import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const Product = (props) => {
    // console.log(props);
    // console.log(props.handleAddProduct);
    const {name,img,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div className="description">
                <h5>{name}</h5>
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left stock - order soon</small></p>
                <button onClick={() => props.handleAddProduct(props.product)} className="addButton"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;