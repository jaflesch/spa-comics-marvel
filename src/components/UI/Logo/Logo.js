import marvelLogo from './marvel.svg'

const logo = (props) => {
    let inheritedClasses = []
    if(props.classes) {
        if(typeof props.classes === "string") {
            inheritedClasses = props.classes
        }
        else {
            inheritedClasses = props.classes.join(' ')
        }
    }

    return <img src={ marvelLogo } alt="Marvel" className={ inheritedClasses }/>
}

export default logo