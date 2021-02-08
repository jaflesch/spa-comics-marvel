import backdropClass from './Backdrop.module.scss'

const backdrop = (props) => {
    return (
        <div className={ (props.visible) ? backdropClass.Wrapper : null} onClick={ props.clicked }>
            { props.children }
        </div>
    )
}

export default backdrop