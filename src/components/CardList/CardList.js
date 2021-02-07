import CardListCSS from './CardList.module.scss'
import ComicCard from '../ComicCard/ComicCard'
import Loader from '../UI/Loader/Loader'

const cardList = (props) => {
    let comics = <p>No comics were found</p>

    // Loading content
    if(props.loading) {
        comics = (
            <div className={ CardListCSS.Loader } >
                <p>Carregando...</p>
                <Loader show />
            </div>
        )
    }

    // Network error
    else if(props.comics === -1) {
        comics = (
            <div className={ CardListCSS.Loader } >
                <p style={{ textAlign: 'center', width: '100%' }}>Erro ao acessar API da Marvel. Por favor, tente novamente.</p>
            </div>
        )
    }
    // Render fetched content
    else if(props.comics) {
        comics = props.comics.map((comic) => {
            return <ComicCard
                key={ comic.id }
                id={ comic.id }
                title={ comic.title }
                pageCount={ comic.pageCount }
                format={ comic.format }
                description= { comic.description }
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