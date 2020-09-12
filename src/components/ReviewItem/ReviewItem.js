import React from 'react';

const ReviewItem = (props) => {
    const product = props.product;
    const {name,img,quantity,price,category,key} = product;
    // const reviewStyle = {
    //     borderBottom: '1px solid lightgray',
    //     marginBottom: '5px',
    //     paddingBottom: '5px',
    //     marginLeft: '200px'
    // }
    return (
        <>
            <div  className='product'>
                <div className="image">
                    <img src={img} alt=""/>
                </div>
                <div className="description">
                    <h4 className='product-name'>{name}</h4>
                    <p>Quantity: {quantity}</p>
                    <p><small>Category: {category}</small></p>
                    <p><small>Price: ${price}</small></p>
                    <button onClick={() => props.removeProduct(key)} className='main-button'>Remove</button>
                </div>
            </div>
        </>
    );
};

export default ReviewItem;