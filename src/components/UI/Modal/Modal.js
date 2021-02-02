import React, { Component, Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import Loader from './../Loader/Loader'
import Alert from './../Alert/Alert'
import ModalClass from './Modal.module.css'

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
                        <button className={ [ModalClass.Button, ModalClass.Cancel].join(' ') } onClick={ this.props.closed }>Fechar</button>
                        <button 
                            className={ [ModalClass.Button, ModalClass.Confirm].join(' ') } 
                            onClick={ this.props.purchased }
                        >
                            Purchase
                        </button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Modal