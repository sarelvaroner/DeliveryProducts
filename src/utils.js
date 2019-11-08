

const extractData = (data) => {
    return data.map(x => {
        let item
        switch (x.type) {
            case 1:
                item = x.fedex
                item.deliveryComp = 'fedex'
                break;
            case 2:
                item = x.ups[0]
                item.deliveryComp = 'ups'
                break;
            case 3:
                item = x
                break
            default:
                item.type = x.type
        }
        return item
    })
}


const choosecompareFunction = (sortBy) => {
    let compareFunction
    switch (sortBy) {
        case 'priceStartFromCheap':
            compareFunction = (a, b) => a.price - b.price
            break;
        case 'priceStartFromExpensive':
            compareFunction = (a, b) => b.price - a.price
            break;
        case 'DateStartFromEarly':
            compareFunction = (a, b) => a.creationDate - b.dacreationDatete
            break
        case 'DateStartFromLate':
            compareFunction = (a, b) => b.creationDate - a.creationDate
            break
        case 'nameFromStart':
            compareFunction = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())
            break
        case 'nameFromEnd':
            compareFunction = (a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase())
            break
        default:
    }
    return compareFunction
}


const findSubStr = (item, searchText) => {
    return item.name.includes(searchText) || item.description.includes(searchText)
}


export {
    extractData,
    choosecompareFunction,
    findSubStr
}