import AlertClass from './Alert.module.scss'

const alert = props => {
    const renderDefaultAlert = () => {
        return (<div className={ classes }>{ this.props.children }</div>)
    }
        
    const renderAlertWithType = (type) => {
        return (
            <div className={ classes.join(' ') }>
                <div className={ AlertClass.Icon }></div>
                <div className={ AlertClass.Content}>
                    { props.children }
                </div>
            </div>
        )
    }

    let classes = [AlertClass.Alert]
    if(props.type) {
        classes.push(AlertClass.WithType)
        classes.push(AlertClass[props.type])

        return renderAlertWithType(props.type)
    }

    else return renderDefaultAlert()
}

export default alert