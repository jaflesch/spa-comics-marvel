import MainContentCSS from './MainContent.module.css'

const mainContent = props => {
    return (
        <main className={ MainContentCSS.Container }>{ props.children }</main>
    )
}

export default mainContent