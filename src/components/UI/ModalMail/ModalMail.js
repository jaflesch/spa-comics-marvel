import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import Button from './../Button/Button'
import ModalClass from './ModalMail.module.scss'
import { getThumbnailPath, isValidEmail } from '../../../utils/Utils'

class ModalMail extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    // onChangeSendToHandler = (event) => {
    //     console.log(event)
    //     this.props.sendToInput = event.target.value
    // }

    renderModalBody = () => {
        let isInputChecked = false
        const comicId = this.props.id
        let index = this.props.selectedComics.findIndex(el => el.id === comicId)		
        if(index >= 0) {
            isInputChecked = true
        }
        
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
            // Mount comic list content
            let sendToInput = null
            let selectedComicsList = (
                <li className={ ModalClass.ListDefault }>Nenhum quadrinho selecionado</li>
            )
            
            if(this.props.selectedComics.length > 0) {
                selectedComicsList = this.props.selectedComics.map((comic) => {
                    const thumbnail = getThumbnailPath(comic.thumbnail)

                    return (
                        <li key={ comic.id }>
                            <img src={ thumbnail } className={ ModalClass.Thumbnail } alt={ comic.title } />
                            <h4 className={ ModalClass.ComicTitle }>
                                { comic.title }
                            </h4>
                            <Button classes={ ModalClass.RemoveComic } onClick={ this.props.removed.bind(this, comic.id) }>Remover</Button>
                        </li>
                    )
                })

                sendToInput = (
                    <div className={ ModalClass.Form }>
                        <label>Enviar lista para</label>
                        <input 
                            type="email" 
                            className={ ModalClass.SendToInput } 
                            placeholder="SEU@EMAIL.COM" 
                            onChange={ this.props.sendToChanged.bind(this) }
                            value={ this.props.sendTo }
                        />
                    </div>
                )
            }

            return (
                <div className={ ModalClass.Detail }>
                    <ul className={ ModalClass.List }>
                        { sendToInput }

                        { selectedComicsList }
                    </ul>
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
        
        let sendEmailButton = null 
        if(this.props.selectedComics.length > 0 && isValidEmail(this.props.sendTo)) {
            sendEmailButton = (
                <Button onClick={ this.props.submited }>
                    Enviar email
                </Button>
            )
        }

        return (
            <Fragment>
                <Backdrop visible={this.props.visible} clicked={ this.props.closed } />
                
                <div className={ containerClasses.join(' ') }>
                    <div className={ ModalClass.Header}>
                        <h3 className={ ModalClass.Title }>Quadrinhos selecionados</h3>
                        <button className={ ModalClass.CloseButton } onClick={ this.props.closed }>&times;</button>                
                    </div>
                    <div className={ ModalClass.Body }>
                        { this.renderModalBody() }
                    </div>
                    <div className={ ModalClass.Footer }>
                        <Button classes={ ModalClass.Cancel } onClick={ this.props.closed }>
                            Fechar
                        </Button>
                        { sendEmailButton }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ModalMail