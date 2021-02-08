import ButtonCSS from './Button.module.scss'

const button = (props) => {
    let classes= [ButtonCSS.Style]
    if(props.classes) {
        if(typeof props.classes === "string") {
            classes.push(props.classes)
        }
        else {
            classes.push(...props.classes)
        }
    }
    return (
        <button className={ classes.join(' ') } onClick={ props.onClick }>{ props.children }</button>
    )
}

export default button