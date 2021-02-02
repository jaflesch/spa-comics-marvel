import HeaderCSS from './Header.module.css'
import Logo from '../UI/Logo/Logo'

const header = () => {
    return (
        <header className={ HeaderCSS.Container }>
            <Logo classes={ HeaderCSS.Logo } />
            <div className={ HeaderCSS.Challenge }>
                <h1 className={ HeaderCSS.ChallengeTitle }>SoftDesign Frontend Challenge</h1>
            </div>
        </header>
    )
}

export default header