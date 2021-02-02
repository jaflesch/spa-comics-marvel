import backdropClass from './Backdrop.module.css'

const backdrop = (props) => {
    return (
        <div className={ (props.visible) ? backdropClass.Wrapper : null} onClick={ props.clicked }></div>
    )
}

export default backdrop