import SendEmailButtonCSS from './SendEmailButton.module.scss'

import { Component, Fragment } from 'react'
import Mailer from '../../utils/Mailer'
import Backdrop from './../UI/Backdrop/Backdrop'

class SendEmailButton extends Component {
    state = {
        isModalOpen: false
    }

    clickHandler = () =>{
        console.log("clicou")
        this.setState({
            isModalOpen: true
        })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    render() {
        return (
            <Fragment>
                <Backdrop visible={ this.state.isModalOpen } clicked={ this.closeModal } />
                <button className={ SendEmailButtonCSS.Button } onClick={ this.clickHandler }>
                    <i className="fas fa-envelope"></i>
                </button>
            </Fragment>
        )
    }
}

export default SendEmailButton