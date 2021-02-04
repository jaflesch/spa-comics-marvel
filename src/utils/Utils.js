const parseComicDetail = (comic) => {
    if(comic) {
        let { description, diamondCode, digitalId, format, id, isbn, modified, pageCount, title } = comic
        let creators    = (comic.creators) ? [...comic.creators.items] : []
        let onSaleDate  = (comic.dates[0]) ? comic.dates[0].date : ""
        let focDate     = (comic.dates[1]) ? comic.dates[1].date : ""
        let price       = (comic.prices[0]) ? comic.prices[0].price : ""
        let thumbnail   = `${comic.thumbnail.path}.${comic.thumbnail.extension}`
        return {
            title: title,
            description: description, 
            diamondCode: diamondCode,
            digitalId: digitalId,
            format: format, 
            id: id,
            isbn: isbn,
            modified: modified, 
            pageCount: pageCount, 
            creators: creators, 
            onSaleDate: onSaleDate,
            focDate: focDate,
            price: price,
            thumbnail: thumbnail
        }
    }

    return null
}

export default parseComicDetail