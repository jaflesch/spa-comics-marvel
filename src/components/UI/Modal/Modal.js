import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import Button from './../Button/Button'
import ModalClass from './Modal.module.scss'
import { parseComicDetail } from '../../../utils/Utils'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.readMarvelURL = 'https://read.marvel.com/#/book'
    }

    renderModalBody = () => {
        // Carregando conteúdo (fetch por id da comic)
        if(this.props.loading) {
            return (
                <Loader show />
            )   
        }
        // Erro de conexão
        else if(this.props.comic === -1) {
            return (
                <Alert type="Danger">Ops! Ocorreu um erro ao processar sua requisição. Por favor, tente novamente.</Alert>
            )
        }
        else {
            // Formata valores
            const comic = parseComicDetail(this.props.comic)

            // Gera lista de links de interesse na comic
            const listaLinks = comic.urls.map((url) => {
                const type = url.type === "detail" ? "+ Detalhes" : "Comprar"
                return (
                    <a key={url.url} href={ url.url } target="_blank" rel="noreferrer" className={ ModalClass.URLButton }>{ type }</a>
                )
            })

            // Se comic possui versão para leitura online
            let digitalId = null
            if(comic.digitalId > 0) {
                digitalId = (
                    <a href={`${this.readMarvelURL}/${comic.digitalId}`} className={ ModalClass.DigitalIssue } target="_blank" rel="noreferrer">
                        Disponível online
                    </a>
                )
            }

            return (
                <div className={ ModalClass.Detail }>
                    <div className={ ModalClass.Thumbnail }>
                        <img src={ comic.thumbnail } alt={ comic.title } />
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
        // Animação do modal
        let containerClasses = [ModalClass.Container]
        if(this.props.visible) {
            containerClasses.push(ModalClass.Animation)
        }     
        
        // Toggle de comic (Selecionar/Remover) da lista de selecionados (para envio de e-mail)
        let buttonLabel = "Selecionar"
        if(this.props.comic) {
            const comicId = this.props.comic.id		
            let index = this.props.selectedComics.findIndex(el => el.id === comicId)		
            
            if(index >= 0) {
                buttonLabel = 'Remover'
            }
        }

        // Exibição condicional do botão de Seleção
        let buttonSelect = null 
        if(this.props.comic !== -1) (
            buttonSelect = (
                <Button onClick={ this.props.selected.bind(this, this.props.comic) }>
                    { buttonLabel }
                </Button>
            )
        )

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
                        { buttonSelect }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal