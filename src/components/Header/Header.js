import HeaderCSS from './Header.module.css'
import Logo from '../UI/Logo/Logo'
import ProjectContext from '../../context/Project'
import React, { useContext } from 'react'

const Header = () => {
    const projectContext = useContext(ProjectContext)
    console.log(projectContext)

    return (
        <header className={ HeaderCSS.Container }>
            <Logo classes={ HeaderCSS.Logo } />
            <div className={ HeaderCSS.Challenge }>
                <h1 className={ HeaderCSS.ChallengeTitle }>{ projectContext.title }</h1>
            </div>
        </header>
    )
}

export default Header