import FooterCSS from './Footer.module.css'

const footer = (props) => {
    return (
        <footer className={ FooterCSS.Main }>{ props.children }</footer>
    )
}

export default footer