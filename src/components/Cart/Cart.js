import React from 'react';

const Cart = (props) => {
    console.log(props.product);
    const total = props.product.reduce((total, prd) => total+prd.price, 0);
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
        <div className="cost">
            <p>${formattedNum(total)}</p>
            <p>${formattedNum(shipping)}</p>
            <p>${formattedNum(total+shipping)}</p>
            <p>${formattedNum(tax)}</p>
            <h2 style={{color: "red"}}>${formattedNum(grandTotal)}</h2>
        </div>
    );
};

export default Cart;