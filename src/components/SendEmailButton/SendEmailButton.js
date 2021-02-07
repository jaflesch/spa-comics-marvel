import SendEmailButtonCSS from './SendEmailButton.module.scss'

import { Component, Fragment } from 'react'
import Mailer from '../../utils/Mailer'
import ModalMail from '../UI/ModalMail/ModalMail'
import Backdrop from './../UI/Backdrop/Backdrop'
import { formatHTMLMailTemplate } from './../../utils/Utils'

class SendEmailButton extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isModalOpen: false,
        isLoadingModal: false,
        emailSent: false,
        sendToInput: ""
    }

    clickHandler = () =>{
        this.setState({ isModalOpen: true })
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false })
    }

    onSubmitModal = () => {
        // Enviar email
        const mailerInstance = new Mailer({
            subject: 'Sua lista de quadrinhos Marvel',
            message: formatHTMLMailTemplate(this.props.selectedComics),
            sendTo: this.state.sendToInput
        })

        mailerInstance.send((res) => {
            this.setState({ emailSent: true })
        })
    }

    onSendToChange = (event) => {
        let { value } = event.target
        if(value) value = value.toLowerCase()
        
        this.setState({ sendToInput: value })
    }

    render() {
        return (
            <Fragment>
                <Backdrop visible={ this.state.isModalOpen } clicked={ this.closeModal } />

                <ModalMail 
                    visible={ this.state.isModalOpen }
					removed={ this.props.removed.bind(this) }
					closed={ this.closeModalHandler.bind(this) }
					loading={ this.state.isLoadingModal }
					selectedComics={ this.props.selectedComics }
                    submited={ this.onSubmitModal.bind(this) }
                    sendTo={ this.state.sendToInput }
                    sendToChanged={ this.onSendToChange.bind(this) }
                />

                <button className={ SendEmailButtonCSS.Button } onClick={ this.clickHandler }>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </Fragment>
        )
    }
}

export default SendEmailButton