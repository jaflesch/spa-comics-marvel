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
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    renderModalBody = () => {
        console.log("@@@", parseComicDetail(this.props.comic))
        console.log(this.props)

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
        return (
            <div className={ ModalClass.Detail }>
                <div className={ ModalClass.Thumbnail }>
                {   this.props.comic && this.props.comic.thumbnail ? (
                        <img src={this.props.comic.thumbnail.path + '.' + this.props.comic.thumbnail.extension } />
                    ) : null
                }
                </div>
                <div className={ ModalClass.Text }>
                    <h3>formato: { this.props.comic ? this.props.comic.format : null }</h3>
                    <h3>${ this.props.comic ? this.props.comic.prices[0].price : null }</h3>
                    <h3>pg{ this.props.comic ? this.props.comic.pageCount : null }</h3>
                    <h3>{ this.props.comic && this.props.comic.description ? this.props.comic.description : 'Nenhuma descrição fornecida' }</h3>
                    <h3>{ this.props.comic && this.props.comic.urls ? (<a href={this.props.comic.urls[0].url} target="_blank">Detalhe</a>) : null }</h3>
                    <h3>{ this.props.comic && this.props.comic.urls.length > 1 ? (<a href={this.props.comic.urls[1].url} target="_blank">Comprar</a>) : null }</h3>
                </div>
            </div>
        )
    }
    
    render() {
        // Handle modal show animation
        let containerClasses = [ModalClass.Container], title
        if(this.props.visible) {
            containerClasses.push(ModalClass.Animation)
        }     
        
        if(this.props.comic) {
            title = this.props.comic.title
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
                            Selecionar
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal