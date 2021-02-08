import MainContentCSS from './MainContent.module.scss'

const mainContent = props => {
    return (
        <main className={ MainContentCSS.Container }>{ props.children }</main>
    )
}

export default mainContent