import CardListCSS from './CardList.module.css'
import ComicCard from './ComicCard/ComicCard'

const cardList = (props) => {
    let comics = <p>No comics were found</p>
    if(props.comics) {
        comics = props.comics.map((comic) => {
            return <ComicCard
                title={ comic.title }
                pageCount={ comic.pageCount }
                thumbnail={ comic.thumbnail }
                showMore={ showMoreHandler.bind(this, comic.id) }
            />
        })
    }
    return (
        <div className={ CardListCSS.Card }>{ comics }</div>
    )
}

export default cardList