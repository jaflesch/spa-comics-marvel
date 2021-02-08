import CardListCSS from './CardList.module.scss'
import ComicCard from '../ComicCard/ComicCard'
import Loader from '../UI/Loader/Loader'
import Alert from '../UI/Alert/Alert'
import Backdrop from '../UI/Backdrop/Backdrop'

const cardList = (props) => {
    let comics = (
        <div className={ CardListCSS.Feedback } >
            <p>Nenhum resultado encontrado para a pesquisa realizada.</p>
        </div>
    )

    // Lazy Load
    let lazyLoading = null
    if(props.lazyLoading) {
        lazyLoading = (
            <Backdrop visible>
                <div className={ CardListCSS.LazyLoadContainer }>
                    <Loader show/>
                </div>
            </Backdrop>
        )
    }

    // Carrefando conteúdo
    if(props.loading) {
        comics = (
            <div className={ CardListCSS.Loader } >
                <p>Carregando...</p>
                <Loader show />
            </div>
        )
    }    
    // Erro de conexão / fetch
    else if(props.comics === -1) {
        comics = (
            <div className={ CardListCSS.Feedback } >
                <Alert type="Danger">Erro ao acessar API da Marvel. Por favor, tente novamente</Alert>
            </div>
        )
    }
    // Renderização de quadrinhos retornados da consulta
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
        <div className={ CardListCSS.Grid }>
            { comics }
            { lazyLoading }
        </div>
    )
}

export default cardList