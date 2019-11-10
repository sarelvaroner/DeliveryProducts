import React from 'react';
import './Product.css';

const Product = ({ viewDetails, item: { name, thumbnailUrl, description, id } }) => {

    return (
        <div className="ProductContainer"  onClick={() => viewDetails(id)} >
            <div className="ProductInfo">
                <img className='ProductImg' src={thumbnailUrl} alt={name} />
                <div className="ProductText">
                    <div><h1 className="productHeader">{name}</h1></div>
                    <div className={'productDescriptionContainer'}><h2 className="productDescription">{description}</h2></div>
                </div>
            </div>
            <button className='ProductDeleteBtn'>Delete</button>
        </div >
    );
}

export default Product;
