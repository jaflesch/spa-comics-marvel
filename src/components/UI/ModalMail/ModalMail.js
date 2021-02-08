import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import Button from './../Button/Button'
import ModalClass from './ModalMail.module.scss'
import { getThumbnailPath, isValidEmail } from '../../../utils/Utils'

class ModalMail extends Component {
    renderModalBody = () => {
        // Carregando conteúdo (envio de e-mail)
        if(this.props.loading) {
            return (
                <Loader show />
            )   
        }
        // Erro de conexão
        else if(this.props.selectedComics === -1) {
            return (
                <Alert type="Danger">Ops! Ocorreu um erro ao processar sua requisição. Por favor, tente novamente.</Alert>
            )
        }
        // Mensagem de feedback após envio de email
        else if(this.props.emailSent) {
            return (
                <div className={ ModalClass.Detail }>
                    <ul className={ ModalClass.List }>
                        <li className={ ModalClass.ListDefault }>E-mail enviado com sucesso</li>
                    </ul>
                </div>
            )
        }
        // Renderização da lista de comics selecionados
        else {
            // Fallbacks
            let sendToInput = null
            let selectedComicsList = (
                <li className={ ModalClass.ListDefault }>Nenhum quadrinho selecionado</li>
            )
            
            // Monta lista de comics selecionados
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

                // Campo para definir destinatário
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
                        <i className="fas fa-envelope" />
                    </div>
                )
            }

            return (
                <div className={ ModalClass.Detail }>
                    { sendToInput }
                    <ul className={ ModalClass.List }>
                        { selectedComicsList }
                    </ul>
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
        
        // Exibição condicional do botão de enviar e-mail
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