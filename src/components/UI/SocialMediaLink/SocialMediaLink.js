const socialMediaLink = (props) => {
    let iconClass = null
    if(props.icon) {
        iconClass = (
            <i className={ props.icon } />
        )
    }
    
    return (
        <a href={ props.to } target={props.external ? '_blank' : ''} rel='noreferrer'>
            { iconClass } { props.children }
        </a>
    )
}

export default socialMediaLink