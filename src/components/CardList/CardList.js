import CardListCSS from './CardList.module.scss'
import ComicCard from '../ComicCard/ComicCard'
import Loader from '../UI/Loader/Loader'
import Alert from '../UI/Alert/Alert'

const cardList = (props) => {
    let comics = (
        <div className={ CardListCSS.Feedback } >
            <p>Nenhum resultado encontrado para a pesquisa realizada.</p>
        </div>
    )

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
            <div className={ CardListCSS.Feedback } >
                <Alert type="Danger">Erro ao acessar API da Marvel. Por favor, tente novamente</Alert>
            </div>
        )
    }
    // Render fetched content
    else if(props.comics.length > 0) {
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