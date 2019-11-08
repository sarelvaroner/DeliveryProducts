import React, { useState, Fragment, useEffect } from 'react';
import './Details.css';


const Details = ({ chosenProduct: { name, description, price, url } }) => {

    const [currentName, setCurrentName] = useState(name);
    const [currentDescription, setCurrentDescription] = useState(description);
    const [currentPrice, setCurrentPrice] = useState(price);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [disabledSave, setDisabledSave] = useState(false);
    const [priceWarning, setPriceWarning] = useState(false);
    const [NameWarning, setNameWarning] = useState(false);


    useEffect(() => { setCurrentName(name); }, [name])
    useEffect(() => { setCurrentDescription(description) }, [description])
    useEffect(() => { setCurrentPrice(price) }, [price])
    useEffect(() => { validateValues() }, [currentName, currentDescription, currentPrice])


    const validateValues = () => {
        let disableSaving = false
        let nameWarn = false
        let priceWarn = false

        if (currentName.length < 1) {
            disableSaving = true
            nameWarn = true
        }

        if (parseInt(currentPrice) < 0 || currentPrice.length < 1) {
            disableSaving = true
            priceWarn = true
        }

        setDisabledSave(disableSaving)
        setPriceWarning(priceWarn)
        setNameWarning(nameWarn)
    }


    return (
        <div className='detailsContainer'>
            {
                showSuccessModal ?
                    <Fragment>
                        <img className='detailsImg' src={url} alt={'product'} />
                        <label htmlFor="detailsName">Name</label>
                        <textarea id='detailsName' value={currentName} onChange={e => setCurrentName(e.target.value)}></textarea >
                        {
                            NameWarning && <h5 className={'warning'}>Product must have a name</h5>
                        }
                        <label htmlFor="detailsDescription">Description</label>
                        <textarea id='detailsDescription' value={currentDescription} onChange={e => setCurrentDescription(e.target.value)}></textarea >
                        <label htmlFor="detailsPrice">Price</label>
                        <textarea id='detailsPrice' value={currentPrice} onChange={e => setCurrentPrice(e.target.value)}></textarea >
                        {priceWarning && <h5 className={'warning'}>Price must be a positive number</h5>}
                        <button className='detailsSaveBtn' onClick={() => setShowSuccessModal(!showSuccessModal)} disabled={disabledSave}>Save</button>
                    </Fragment>
                    :
                    <div className='successModal' onClick={() => setShowSuccessModal(!showSuccessModal)}>
                        {`Thank you for updating product ${currentName}`}
                    </div>
            }
        </div>
    );
}

export default Details;
