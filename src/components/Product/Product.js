import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const Product = (props) => {
    // console.log(props.product);
    // console.log(props.handleAddProduct);
    const {name,img,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div className="description">
                <h5 className='product-name'>{
                    props.showAddToCart 
                    ? <Link to={`product/${key}`}>{name}</Link>
                    : name
                }</h5>
                <p><small>by {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left stock - order soon</small></p>
                {
                    props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;