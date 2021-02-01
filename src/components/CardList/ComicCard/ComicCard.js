import ComicCardCSS from './ComicCard.module.css'

const comicCard = (props) => {
    const thumbnail = `${props.thumbnail.path}.${props.thumbnail.extension}`

    return (
        <div className={ ComicCardCSS.Card }>
            <div className= { ComicCardCSS.ThumbnailContainer }>
                <div className= { ComicCardCSS.Thumbnail } style={{ backgroundImage: `url('${thumbnail}')` }}></div>
            </div>
            <h2>{ props.title }</h2>
            <p>{ props.pageCount }</p>
            <button onClick={ props.showMore }>See more</button>
        </div>
    )
}

export default comicCard