import SocialMediaListCSS from './SocialMediaList.module.css'
import SocialMediaLink from '../SocialMediaLink/SocialMediaLink'

const socialMediaList = (props) => {
    if(props.list) {
        const list = props.list.map((socialMediaProps, index) => {
            return (
                <li key={`${index}-${socialMediaProps.name}`}>
                    <SocialMediaLink 
                        external
                        to={ socialMediaProps.url }
                        name={ socialMediaProps.name }
                        icon={ socialMediaProps.icon }
                    />                
                </li>
            )
        })

        return (
            <ul className={ SocialMediaListCSS.Container }>{ list }</ul>
        )
    }

    return null
}

export default socialMediaList