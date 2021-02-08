import FooterCSS from './Footer.module.scss'

const footer = (props) => {
    return (
        <footer className={ FooterCSS.Main }>{ props.children }</footer>
    )
}

export default footer