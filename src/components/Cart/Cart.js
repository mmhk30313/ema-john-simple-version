import React from 'react';
import './Cart.css';

const Cart = (props) => {
    // console.log(props.product);
    const total = props.cart.reduce((total, pd) => total+(pd.price*pd.quantity), 0);
    let shipping = 0;
    if(total> 35){
        shipping = 0;
    }else if(total>15){
        shipping = 4.99;
    }else if(total>0){
        shipping = 12.99;
    }
    const tax = total/10;
    const grandTotal = total+tax+shipping;
    const formattedNum = (num) => {
        return Number(num.toFixed(2));
    }
    return (
        <>
            <div className="summary" style={{textAlign: 'center'}}>
                        <h2>Order Summery</h2>
                        {/* <h4>Items ordered: {props.cart.length}</h4> */}
                    </div>
            <div className="memo">
                <p className='des'><small>Items Ordered:</small></p>
                <p><small>{props.cart.length}</small> </p>
            </div>
            <div className="memo">
                <p className='des'><small>Products Price:</small></p>
                <p><small>${formattedNum(total)}</small></p>
            </div>
            <div className="memo">
                <p className='des'><small>Shipping & Handling:</small></p>
                <p><small>${formattedNum(shipping)}</small></p>
            </div>
            <div className="memo">
                <p className='des'><small>Total before tax:</small></p>
                <p><small>${formattedNum(total+shipping)}</small> </p>
            </div>
            <div className="memo">
                <p className='des'><small>Estimated Tax:</small></p>
                <p><small>${formattedNum(tax)}</small></p>
            </div>
            <div className="memo">
                <h6 className='des' style={{color: "red"}}>Order Total:</h6>
                <h6 style={{color: "red"}}>${formattedNum(grandTotal)}</h6>
            </div>
            {
                props.children
            }
            {/* <div className="link" style={{textAlign: "center",margin: "0 auto",width: "100%"}}>
                <Link to='/review'>
                    <button className='main-button'>Order Review</button>
                </Link>    
            </div> */}
            {/* <div className="cost-des">
                <p><small>Items:</small> </p>
                <p><small>Shipping & Handling:</small> </p>
                <p><small>Total before tax:</small></p>
                <p><small>Estimated Tax:</small></p>
                <p style={{color: "red"}}>Order Total:</p>
            </div>
            <div className="cost">
                <p><small>${formattedNum(total)}</small> </p>
                <p><small>${formattedNum(shipping)}</small> </p>
                <p><small>${formattedNum(total+shipping)}</small> </p>
                <p><small>${formattedNum(tax)}</small></p>
                <p style={{color: "red"}}>${formattedNum(grandTotal)}</p>
            </div> */}
        </>
    );
};

export default Cart;