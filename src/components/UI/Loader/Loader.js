import LoaderClass from './Loader.module.css'

const loader = props => {
    let element = null
    if(props.show) {
        element = (
            <div className={ LoaderClass.Loader }></div>
        )
    }

    return element
}

export default loader