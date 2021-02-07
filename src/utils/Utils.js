export const formatDate = (datetime) => {
    const date = new Date(datetime)
    const day = date.getDate()
    const year = date.getFullYear()
    let month = date.getMonth() 
    switch(month) {
        case 0: 
            month = "Janeiro"
            break
        case 1:
            month = "Fevereiro"
            break
        case 2:
            month = "Março"
            break
        case 3:
            month = "Abril"
            break
        case 4:
            month = "Maio"
            break
        case 5:
            month = "Junho"
            break
        case 6:
            month = "Julho"
            break
        case 7:
            month = "Agosto"
            break
        case 8:
            month = "Setembro"
            break
        case 9:
            month = "Outubro"
            break
        case 10:
            month = "Novembro"
            break
        case 11:
            month = "Dezembro"
            break
        default: break
    }

    return `${month} ${day}, ${year}`
}

export const parseComicDetail = (comic) => {
    if(comic) {
        let { description, diamondCode, digitalId, format, id, isbn, modified, pageCount, title, urls } = comic
        let creators    = (comic.creators) ? [...comic.creators.items] : []
        let onSaleDate  = (comic.dates[0]) ? formatDate(comic.dates[0].date) : ""
        let focDate     = (comic.dates[1]) ? formatDate(comic.dates[1].date) : ""
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
            price: price ? `$${price}` : 'Gratuito',
            thumbnail: thumbnail,
            urls: urls
        }
    }

    return null
}

export const getThumbnailPath = (thumbnailObject) => {
    if(thumbnailObject) {
        return `${thumbnailObject.path}.${thumbnailObject.extension}` 
    }

    return ''
}

export const formatHTMLMailTemplate = (selectedComics) => {
    const tableStyle = 'border-collapse: collapse; border: 1px solid #ccc;width:100%;'
    let htmlTemplate = `
        <table style="${tableStyle}" border="1">
            <thead>
                <th></th>
                <th>Título</th>
                <th>Formato</th>
                <th>Descrição</th>
            </thead>
            <tbody>
    `.trim()

    for(let comic of selectedComics) {
        const tdStyle = 'vertical-align:middle;padding: 10px;'
        const thumbnail = getThumbnailPath(comic.thumbnail)

        htmlTemplate += `
            <tr>
                <td style="${tdStyle}">
                    <img src="${thumbnail}" style="max-height: 150px;" alt="${comic.title}" />
                </td>
                <td style="${tdStyle}">
                    <strong>${comic.title}</strong>
                </td>
                <td style="${tdStyle}">${comic.format} / ${comic.pageCount} páginas</td>
                <td style="${tdStyle}" width="30%">${comic.description ? comic.description : 'Nenhuma descrição fornecida'}</td>
            </tr>
        `.trim()
    }

    htmlTemplate += `
            </tbody>
        </table>
    `.trim()

    return htmlTemplate
}

export const isValidEmail = (email) => {
    return email.match(/\S+@\S+\.\S+/) !== null
}