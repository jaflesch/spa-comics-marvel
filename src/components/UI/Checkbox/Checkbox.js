import CheckboxCSS from './Checkbox.module.scss'

const checkbox = (props) => {
    let classes = [CheckboxCSS.Container]
    if(props.className) {
        classes.push(props.className)
        classes = classes.join(' ')
    }
    return (
        <label className={ classes }>
            { props.label }
            <input type="checkbox" checked={ props.checked } onChange={ props.changed }/>
            <span className={ CheckboxCSS.Checkmark } onChange={ props.changed }></span>
        </label>
    )
}

export default checkbox