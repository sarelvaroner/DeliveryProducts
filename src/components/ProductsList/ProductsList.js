import React, { useState, useEffect, Fragment } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import 'react-fontawesome';
import './ProductsList.css';
import { PRODUCTS_API_URL, PRODUCTS_API_CONFIF, SORT_OPTIONS } from '../../consts'
import Product from '../Product/Product'
import Details from '../Details/Details'
import Modal from '../Modal/Modal'
// import Pagination from '../Pagination/Pagination'
import { extractData, choosecompareFunction, findSubStr } from '../../utils'


const ProductsList = () => {
  const [rawData, setRawData] = useState([])
  const [fetchingItems, setFetchingItems] = useState([])
  const [products, setProducts] = useState([])
  const [chosenProduct, setChosenProduct] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [sortBy, setSortBy] = useState('priceStartFromCheap')
  const [loading, setLoading] = useState(false)
  const [noProducts, setNoProducts] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 5
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(PRODUCTS_API_URL, PRODUCTS_API_CONFIF)
        let json = await response.json()
        setRawData(json)
        let newData = extractData(json)
        if (newData.length === 0) setNoProducts(true)
        setFetchingItems(newData)
      }
      catch (error) { setNoProducts(true) }
      setLoading(false)
    }
    fetchData()
  }, []);

  useEffect(() => { productsManager() }, [searchText, fetchingItems, sortBy])


  const productsManager = () => {
    let searchResult
    if (searchText.length === 0) searchResult = fetchingItems
    else searchResult = fetchingItems.filter(item => findSubStr(item, searchText))

    let sortFunc = choosecompareFunction(sortBy)
    let sortResult = cloneDeep(searchResult).sort(sortFunc)

    setProducts(sortResult.slice(0, 5))
  }


  const pagingItems = () => {





  }


  const sucssesHandler =()=>{
    setShowSuccessModal(false)
    setChosenProduct(null)

}


  const saveChangesHandler = ({ id, currentName, currentDescription, currentPrice }) => {

    let copy = cloneDeep(fetchingItems)
    let index = copy.findIndex((item) => { return item.id === id })
    let { ...newItem } = { ...copy[index], price: currentPrice, description: currentDescription, name: currentName }

    copy[index] = newItem

    setFetchingItems(copy)
    setShowSuccessModal(!showSuccessModal)

  }


  return (
    <Fragment>
      <div className={'pageWrapper'}>
        <div className="controllerContainer">
          <button className='addProductBtn'>Add</button>
          <div className={'filterContainer'}>
            <div className='searchInputContainer'>
              <i className="fa fa-search"></i>
              <input className={'searchInput'} placeholder='search product' onChange={e => setSearchText(e.target.value)}></input>
            </div>
            <div className={'sortByContainer'}>
              <select className={'sortBy'} onChange={e => setSortBy(e.target.value)}>{SORT_OPTIONS}</select>
            </div>
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
                    products && products.map(item => {
                      return <Product
                        item={item}
                        key={item.id}
                        viewDetails={() => setChosenProduct(products.filter(product => product.id === item.id)[0])}
                      />
                    })
                  }


                </div>


          }
          {chosenProduct && <Details chosenProduct={chosenProduct} saveChangesHandler={(item) => saveChangesHandler(item)} sucssesHandler={()=> sucssesHandler()}/>}
        </div>

      </div>
      {/* <Pagination perPage={productPerPage} pagingHandler={()=> true}/> */}
      {showSuccessModal &&<Modal sucssesHandler ={()=>sucssesHandler()} name={chosenProduct.name}/>}
    </Fragment>
  );
}


export default ProductsList;
