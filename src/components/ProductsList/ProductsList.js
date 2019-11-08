import React, { useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import 'react-fontawesome';
import './ProductsList.css';
import { PRODUCTS_API_URL, PRODUCTS_API_CONFIF, SORT_OPTIONS } from '../../consts'
import Product from '../Product/Product'
import Details from '../Details/Details'
import { extractData, choosecompareFunction, findSubStr } from '../../utils'


const ProductsList = () => {
  const [fetchingItems, setFetchingItems] = useState([])
  const [products, setProducts] = useState([])
  const [chosenProduct, setChosenProduct] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('priceStartFromCheap')
  const [loading, setLoading] = useState(false)
  const [noProducts, setNoProducts] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(PRODUCTS_API_URL, PRODUCTS_API_CONFIF)
        let newData = extractData(await response.json())
        if (newData.length === 0) setNoProducts(true)
        // if(0 === 0) setNoProducts(true)
        setFetchingItems(newData)
      }
      catch (error) { setNoProducts(true) }
      setLoading(false)
    }
    fetchData()
  }, []);


  useEffect(() => { setProducts(fetchingItems) }, [fetchingItems])


  useEffect(() => { sortHandler() }, [sortBy, searchText])


  useEffect(() => {
    if (searchText.length === 0) setProducts(fetchingItems)
    let result = fetchingItems.filter(item => findSubStr(item, searchText))
    setProducts(result)
  }, [searchText])




  const sortHandler = () => {
    let copy = cloneDeep(products)
    let sortFunc = choosecompareFunction(sortBy)
    setProducts(copy.sort(sortFunc))
  }


  return (
    <div className={'pageWrapper'}>
      <div className="controllerContainer">
        <button className='addProductBtn'>Add</button>
        <div className='searchInputContainer'>
          <i className="fa fa-search"></i>
          <input className={'searchInput'} placeholder='search product' onChange={e => setSearchText(e.target.value)}></input>
        </div>
        <div className={'sortByContainer'}>
          <select className={'sortBy'} onChange={e => setSortBy(e.target.value)}>{SORT_OPTIONS}</select>
        </div>
      </div>
      <div className="ProductsListContainer">
        {
          loading ?
            <div className={'loadingContainer'}>
              <h1>Loading itemss from store</h1>
              <i className="fa fa-spinner fa-pulse loading"></i>
            </div>
            :
            noProducts ?
              <div className={'noDataMsg'}>No data to display...</div>
              :
              <div className='itemsContainer'>
                {
                  products.length > 0 && products.map(item => {
                    return <Product
                      item={item}
                      key={item.id}
                      viewDetails={() => setChosenProduct(products.filter(product => product.id === item.id)[0])}
                    />
                  })
                }
              </div>
        }
        {chosenProduct && <Details chosenProduct={chosenProduct} />}
      </div>
    </div>
  );
}


export default ProductsList;
