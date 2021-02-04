import ComicCardCSS from './ComicCard.module.scss'

import { useContext } from 'react'
import Button from '../UI/Button/Button'
import ProjectContext from '../../context/Project'

const ComicCard = (props) => {
    const projectContext = useContext(ProjectContext)

    const onMouseOutHandler = (event) => {
        const nodeList = document.querySelectorAll(`.${ComicCardCSS.Fog}`)
        
        for(let node of nodeList) {
            node.classList.remove(ComicCardCSS.Fog)
        }
    }

    const onMouseEnterHandler = (event) => {
        const nodeList = document.querySelectorAll(`.${ComicCardCSS.Card}`)
        
        for(let node of nodeList) {
            node.classList.add(ComicCardCSS.Fog)
        }      
        event.target.classList.remove(ComicCardCSS.Fog)        
    }

    const thumbnail = `${props.thumbnail.path}.${props.thumbnail.extension}`

    let isInputChecked = false
    const comicId = props.id
    let index = projectContext.selectedComics.findIndex(el => el.id === comicId)		
    if(index >= 0) {
        isInputChecked = true
    }

    return (
        <div className={ ComicCardCSS.Card } 
            title={ props.title }
            onMouseEnter={ onMouseEnterHandler }
            onMouseLeave={ onMouseOutHandler }
        >
            <div className= { ComicCardCSS.ThumbnailContainer }>
                <div className= { ComicCardCSS.Thumbnail } style={{ backgroundImage: `url('${thumbnail}')` }}></div>
                <div className={ ComicCardCSS.PageCount } >
                    <span>
                        <i className="fab fa-readme"></i> { props.pageCount }
                    </span>
                </div>
            </div>
            <h3 className={ ComicCardCSS.Title } title={ props.title }>{ props.title }</h3>
            
            <input type="checkbox" onChange={ projectContext.selectHandler.bind(this, props) } checked={ isInputChecked }/>
            
            <Button onClick={ props.showMore }>Ver mais</Button>
        </div>
    )
}

export default ComicCard