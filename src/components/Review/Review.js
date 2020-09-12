import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import happyImage from '../../images/giphy.gif';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/shipment');
    }
    const removeProduct = (productKey) => {
        // console.log('remove clicked',productKey);
        const newCart = cart.filter(pd => pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        // cart
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProduct);
        setCart(cartProduct);
    },[]);
    
    let thankYou;
    if(orderPlaced){
        thankYou = <img style={{marginLeft: '10%',padding: '20px',marginTop: '30px',width: '70%'}} src={happyImage} alt=""/>
    }
    return (
        <>
            {/* <h1 style={{textAlign: 'center'}}>Review Items: {cart.length}</h1> */}
            <div className='twin-container'>
                <div className="product-container">
                    {
                        cart.map(pd => <ReviewItem product={pd} key= {pd.key} removeProduct={removeProduct}></ReviewItem>)
                    }
                    {
                        thankYou
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <div className="link" style={{textAlign: "center",margin: "0 auto",width: "100%"}}>
                            {/* <Link to='/review'> */}
                                <button onClick={() => handleProceedCheckout()} className='main-button'>Proceed Checkout</button>
                            {/* </Link>     */}
                        </div>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Review;