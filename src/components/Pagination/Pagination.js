import React, { useState, useEffect, Fragment } from 'react';

import './Pagination.css';


const lennn = 48
const perep = 5

const Pagination = () => {

    const [allPages, setAllPages] = useState([])
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(lennn / perep))


    const pagingButtons = () => {
        let result = [<li className={'numberOfPages'}>{`${numberOfPages} pages total`}</li>]
        let startFrom = 1
        let goTo = numberOfPages

        if (currentPage < 2) {
            if (currentPage === 1) setDisablePrev(true)
            startFrom = currentPage - 2
        }


        if ((numberOfPages - currentPage) > 2) {
            if (currentPage === numberOfPages) setDisableNext(true)
            goTo = currentPage + 2
        }
 

        for (let i = startFrom; i <= goTo; i++) {
            let liClassName = i === currentPage ? 'currentPage': ''
            result.push(<li className={liClassName}><button onClick={(i) => oncklicingPage(i)} >i</button></li>)
        }
        return result
    }






    return (
        <div className="PaginationContainer">
            <ul>
                <li><button onClick={() => oncklicingPage('prev')} disabled={disablePrev}>prev</button></li>
                {}
                <li><button onClick={() => oncklicingPage('next')} disabled={disableNext}>next</button></li>
            </ul>
        </div>
    );
}

export default Pagination;
