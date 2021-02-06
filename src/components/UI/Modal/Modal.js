import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import Button from './../Button/Button'
import ModalClass from './Modal.module.scss'
import parseComicDetail from '../../../utils/Utils'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.readMarvelURL = 'https://read.marvel.com/#/book'
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    renderModalBody = () => {
        console.log("@@@", parseComicDetail(this.props.comic))
        
        if(this.props.loading) {
            return (
                <Loader show />
            )   
        }
        else if(this.props.networkError) {
            return (
                <Alert type="Danger">Ops! Something went wrong. Please try again soon.</Alert>
            )
        }
        else {
            const comic = parseComicDetail(this.props.comic)

            const listaLinks = comic.urls.map((url) => {
                const type = url.type === "detail" ? "Detalhes" : "Comprar"
                return (
                    <a key={url.url} href={ url.url } target="_blank" rel="norefferer" className={ ModalClass.URLButton }>{ type }</a>
                )
            })

            let digitalId = null
            if(comic.digitalId > 0) {
                digitalId = (
                    <a href={`${this.readMarvelURL}/${comic.digitalId}`} className={ ModalClass.DigitalIssue } target="_blank" rel="norefferer">
                        Disponível online
                    </a>
                )
            }

            return (
                <div className={ ModalClass.Detail }>
                    <div className={ ModalClass.Thumbnail }>
                        <img src={ comic.thumbnail } />
                    </div>
                    <div className={ ModalClass.Text }>
                        <h3 className={ ModalClass.ComicTitle }>{  comic.title }</h3>
                        <p>{digitalId}</p>
                        <p>Publicado em { comic.onSaleDate }</p>
                        <p>{ comic.format } / { comic.pageCount } páginas </p>

                        <p className={ ModalClass.ComicDescription }>{  comic.description ?  comic.description : 'Nenhuma descrição fornecida' }</p>
                        <p className={ ModalClass.ComicPrice }>{ comic.price }</p>
    

                        <div className={ ModalClass.URLArea }>
                            { listaLinks }
                        </div>
                    </div>
                </div>
            )
        }

    }
    
    render() {
        // Handle modal show animation
        let containerClasses = [ModalClass.Container], title
        if(this.props.visible) {
            containerClasses.push(ModalClass.Animation)
        }     
        
        let buttonLabel = "Selecionar"
        if(this.props.comic) {
            title = this.props.comic.title
        
            const comicId = this.props.comic.id		
            let index = this.props.selectedComics.findIndex(el => el.id === comicId)		
            
            if(index >= 0) {
                buttonLabel = 'Remover'
            }
        }

        return (
            <Fragment>
                <Backdrop visible={this.props.visible} clicked={ this.props.closed } />
                
                <div className={ containerClasses.join(' ') }>
                    <div className={ ModalClass.Header}>
                        <h3 className={ ModalClass.Title }>Informações do quadrinho</h3>
                        <button className={ ModalClass.CloseButton } onClick={ this.props.closed }>&times;</button>                
                    </div>
                    <div className={ ModalClass.Body }>
                        { this.renderModalBody() }
                    </div>
                    <div className={ ModalClass.Footer }>
                        <Button classes={ ModalClass.Cancel } onClick={ this.props.closed }>
                            Fechar
                        </Button>
                        <Button onClick={ this.props.selected.bind(this, this.props.comic) }>
                            { buttonLabel }
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal