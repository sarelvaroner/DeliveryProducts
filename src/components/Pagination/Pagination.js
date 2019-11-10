import React, { useState, useEffect, Fragment } from 'react';

import './Pagination.css';




const Pagination = ({ totalProducts, perPage, correntpageHandler }) => {

    const [allPages, setAllPages] = useState([])
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(totalProducts / perPage))


    useEffect(() => {
        setDisableNext(currentPage === numberOfPages)
        setDisablePrev(currentPage === 1)
        correntpageHandler(currentPage)
        createButtons()
    }, [currentPage])



    const createButtons = () => {

        const result = []
        const startFrom = currentPage - 2 > 0 ? currentPage - 2 : 1
        const goTo = currentPage + 2 < numberOfPages ? currentPage + 2 : numberOfPages

        for (let i = startFrom; i <= goTo && result.length < 4; i++) {
            let liClassName = i === currentPage ? 'currentPage' : ''
            result.push(<li key={i} className={liClassName}><button onClick={() => pagingHandler(i)} >{i}</button></li>)
        }
 

        setAllPages(result)
    }


    const pagingHandler = (val) => {
        if (val === 'prev') setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
        else if (val === 'next') setCurrentPage(currentPage === numberOfPages ? numberOfPages : currentPage + 1)
        else setCurrentPage(val)
    }



    return (
        <div className="PaginationContainer">
            <ul>
                <li><button onClick={() => pagingHandler('prev')} disabled={disablePrev}>prev</button></li>
                {allPages}
                { numberOfPages - currentPage > 2 && <li><button onClick={() => pagingHandler(numberOfPages)} >{numberOfPages}</button></li>}
                <li><button onClick={() => pagingHandler('next')} disabled={disableNext}>next</button></li>
            </ul>
        </div>
    );
}

export default Pagination;
