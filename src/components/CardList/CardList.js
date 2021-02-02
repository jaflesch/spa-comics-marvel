import CardListCSS from './CardList.module.css'
import ComicCard from '../ComicCard/ComicCard'
import Modal from '../UI/Modal/Modal'

const cardList = (props) => {
    let comics = <p>No comicse were found</p>

    if(props.comics) {
        comics = props.comics.map((comic) => {
            return <ComicCard
                key={ comic.id }
                title={ comic.title }
                pageCount={ comic.pageCount }
                thumbnail={ comic.thumbnail }
                showMore={ props.clickedComic.bind(this, comic.id) }       
            />
        })
    }
    return (
        <div className={ CardListCSS.Grid }>{ comics }</div>
    )
}

export default cardList