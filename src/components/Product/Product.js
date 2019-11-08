import React from 'react';
import './Product.css';

const Product = ({ viewDetails, item: { name, thumbnailUrl, description, id } }) => {

    return (
        <div className="ProductContainer" onClick={() => viewDetails(id)}>
            <div className="ProductInfo">
                <img className='ProductImg' src={thumbnailUrl} alt={name} />
                <div className="ProductText">
                    <h1 className="productHeader">{name}</h1>
                    <h2 className="productDescription">{description}</h2>
                </div>
            </div>
            <button className='ProductDeleteBtn'>Delete</button>
        </div >
    );
}

export default Product;
