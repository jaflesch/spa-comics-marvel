import SendEmailButtonCSS from './SendEmailButton.module.scss'

import { Component, Fragment } from 'react'
import Mailer from '../../utils/Mailer'
import ModalMail from '../UI/ModalMail/ModalMail'
import Backdrop from './../UI/Backdrop/Backdrop'

class SendEmailButton extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isModalOpen: false,
        isLoadingModal: false
    }

    clickHandler = () =>{
        console.log("clicou")
        this.setState({
            isModalOpen: true
        })
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false })
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
                />

                <button className={ SendEmailButtonCSS.Button } onClick={ this.clickHandler }>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </Fragment>
        )
    }
}

export default SendEmailButton