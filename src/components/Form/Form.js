import FormCSS from './Form.module.scss'

const form = (props) => {
    return (
        <form className={ FormCSS.Container }>
            <input type="text" onChange={ props.changed } placeholder="Pesquisar" />
            <button onClick={ props.submited }>
                <i className="fas fa-search"></i>
            </button>
        </form>
    )
}

export default form