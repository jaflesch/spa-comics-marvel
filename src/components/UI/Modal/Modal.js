import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import Button from './../Button/Button'
import ModalClass from './Modal.module.scss'

class Modal extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    renderModalBody = () => {
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
            <h2>Foi!!!</h2>
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
                        <h3 className={ ModalClass.Title }>{ title }</h3>
                        <button className={ ModalClass.CloseButton } onClick={ this.props.closed }>&times;</button>                
                    </div>
                    <div className={ ModalClass.Body }>
                        { this.renderModalBody() }
                    </div>
                    <div className={ ModalClass.Footer }>
                        <Button classes={ ModalClass.Cancel } onClick={ this.props.closed }>
                            Fechar
                        </Button>
                        <Button onClick={ this.props.purchased }>
                            Selecionar
                        </Button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal