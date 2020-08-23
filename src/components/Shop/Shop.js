import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const Shop = () => {
    // console.log(fakeData);
    const data_10 = fakeData.slice(0, 5);
    // console.log(data_10);
    const [products, setProducts] = useState(data_10);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product)=>{
        // console.log('This is product...\n',product);
        console.log(cart);
        const newCart = [...cart, product];
        // console.log(newCart);
        setCart(newCart);
    }
    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        products.map(pd => <Product handleAddProduct={handleAddProduct} key={pd.key} product={pd}></Product>)
                    }
                </div>
                <div className="cart-container">
                    <div className="summary" style={{textAlign: 'center'}}>
                        <h2>Order Summery</h2>
                        <h4>Items ordered: {cart.length}</h4>
                    </div>
                    <div className="memo">
                        <div className="cost-des">
                            <p>Items:</p>
                            <p>Shipping & Handling:</p>
                            <p>Total before tax:</p>
                            <p>Estimated Tax:</p>
                            <h2 style={{color: "red"}}>Order Total:</h2>
                        </div>
                        <Cart product={cart}></Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;