import React, { useState, Fragment, useEffect } from 'react';
import './Details.css';


const Details = ({ saveChangesHandler, chosenProduct: { name, description, price, url, id } }) => {

    const [currentName, setCurrentName] = useState(name);
    const [currentDescription, setCurrentDescription] = useState(description);
    const [currentPrice, setCurrentPrice] = useState(price);
    const [disabledSave, setDisabledSave] = useState(false);
    const [priceWarning, setPriceWarning] = useState(false);
    const [NameWarning, setNameWarning] = useState(false);


    useEffect(() => { setCurrentName(name); }, [name])
    useEffect(() => { setCurrentDescription(description) }, [description])
    useEffect(() => { setCurrentPrice(price) }, [price])
    useEffect(() => { validateValues() }, [currentName, currentDescription, currentPrice])


    const validateValues = () => {
        const regex = /^[0-9\b]+$/;
        let disableSaving = false
        let nameWarn = false
        let priceWarn = false

        if (currentName.length < 1) {
            disableSaving = true
            nameWarn = true
        }

        if (currentPrice.length < 1 || !regex.test(currentPrice) || parseInt(currentPrice) < 0) {
            disableSaving = true
            priceWarn = true
        }

        setDisabledSave(disableSaving)
        setPriceWarning(priceWarn)
        setNameWarning(nameWarn)
    }



    const saveDetails = () => {
        let changes = { id, currentName, currentDescription, currentPrice }
        saveChangesHandler(changes)
    }

    return (
        <div className='detailsContainer'>
            {
                <Fragment>
                    <div className={'detailsImgContainer'}>
                        <img className='detailsImg' src={url} alt={'product'} />
                    </div>
                    <div className={'detailsTextContainer'}>

                        <label htmlFor="detailsName">Name</label>
                        <textarea id='detailsName' value={currentName} onChange={e => setCurrentName(e.target.value)}></textarea >
                        {
                            NameWarning && <h5 className={'warning'}>Product must have a name</h5>
                        }
                        <label htmlFor="detailsDescription">Description</label>
                        <textarea id='detailsDescription' value={currentDescription} onChange={e => setCurrentDescription(e.target.value)}></textarea >
                        <label htmlFor="detailsPrice">Price</label>
                        <textarea type="number" id='detailsPrice' value={currentPrice} onChange={e => setCurrentPrice(e.target.value)} ></textarea >
                        {priceWarning && <h5 className={'warning'}>Price must be a positive number</h5>}
                        <button className='detailsSaveBtn' onClick={(e) => saveDetails()} disabled={disabledSave}>Save</button>
                    </div>
                </Fragment>


            }
        </div>
    );
}

export default Details;
