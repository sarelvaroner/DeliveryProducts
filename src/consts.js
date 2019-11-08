import React from 'react';

const PRODUCTS_API_URL = 'https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json'
const PRODUCTS_API_CONFIF = { method: 'GET', headers: { 'Content-Type': 'application/json; charset=UTF-8' } }

const SORT_OPTIONS = [
    <option value={'priceStartFromCheap'} key={'1'}>Price - low to high</option>,
    <option value={'priceStartFromExpensive'} key={'2'}>Price - high to low</option>,
    <option value={'DateStartFromEarly'} key={'3'} > Creation Date - early first</option>,
    <option value={'DateStartFromLate'} key={'4'}>Creation Date - latest first</option>,
    <option value={'nameFromStart'} key={'5'}> Name - A - Z</option>,
    <option value={'nameFromEnd'} key={'6'} >Name - Z - A </option>
]





export {
    PRODUCTS_API_URL,
    PRODUCTS_API_CONFIF,
    SORT_OPTIONS
};