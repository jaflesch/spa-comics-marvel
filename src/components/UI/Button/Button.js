import ButtonCSS from './Button.module.css'

const button = (props) => {
    return (
        <button className={ ButtonCSS.Style } onClick={ props.onClick }>{ props.children }</button>
    )
}

export default button