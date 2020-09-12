import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    // console.log(fakeData);
    const data_10 = fakeData.slice(0, 10);
    // console.log(data_10);
    const products = data_10;
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart);
    },[])
    const handleAddProduct = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // const sameProduct = newCart.filter(pd => pd.key === product.key);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }
    return (
        <div>
            <div className="twin-container">
                <div className="product-container">
                    {
                        products.map(pd => <Product handleAddProduct={handleAddProduct} key={pd.key} showAddToCart={true} product={pd}></Product>)
                    }
                </div>
                <div className="cart-container">
                    {/* <div className="summary" style={{textAlign: 'center'}}>
                        <h2>Order Summery</h2>
                        <h4>Items ordered: {cart.length}</h4>
                    </div> */}
                    <div className="memo-cart">
                        {/* <div className="cost-des">
                            <p>Items:</p>
                            <p>Shipping & Handling:</p>
                            <p>Total before tax:</p>
                            <p>Estimated Tax:</p>
                            <h2 style={{color: "red"}}>Order Total:</h2>
                        </div> */}
                        <Cart cart={cart}>
                            <div className="link" style={{textAlign: "center",margin: "0 auto",width: "100%"}}>
                                <Link to='/review'>
                                    <button className='main-button'>Order Review</button>
                                </Link>    
                            </div>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;