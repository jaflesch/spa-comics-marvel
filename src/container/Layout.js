import React, { Component, Fragment } from 'react'
import Project from '../utils/Project'
import ProjectContext from '../context/Project'
import MarvelAPI from '../services/MarvelApi'
import Header from '../components/Header/Header'
import MainContent from '../components/MainContent/MainContent'
import Form from '../components/Form/Form'
import Footer from '../components/Footer/Footer'
import CardList from '../components/CardList/CardList'
import Modal from '../components/UI/Modal/Modal'
import SocialMediaList from '../components/UI/SocialMediaList/SocialMediaList'
import SendEmailButton from '../components/SendEmailButton/SendEmailButton'

class Layout extends Component {
    constructor(props) {
        super(props) 
		this.currentYear = new Date().getFullYear()
		this.socialMedia = [
			{
				name: "LinkedIn",
				url: "https://www.linkedin.com/in/jean-flesch-19a189104/",
				icon: "fab fa-linkedin"
			},
			{
				name: "GitHub",
				url: "https://github.com/jaflesch",
				icon: "fab fa-github"
			}
		]
    }
	
    state = {
		comics: [],
		offsetComics: 0,
		comicDetail: null,
		searchTitle: "",
		lastFetchTitle: "",
		isLoading: false,
		isModalOpen: false,
		isLoadingModal: true,
		isLazyLoading: false,
		selectedComics: []
	}

    componentDidMount() {
		this.setState({ isLoading: true })
		this.fetchComics()
		window.addEventListener('scroll', this.infiniteScroll);
    }
    
	// Bindings
	infiniteScroll = () => {
		// Se chega no final da página, carrega mais comics
		if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {	
			this.setState({ isLazyLoading: true })	
			this.fetchComics(this.state.searchTitle)
		}
	}

    // Fetch data
	fetchComics = (title) => {
		// Se alterou o filtro por título, reinicia contador para offset
		const offsetComics = (this.state.lastFetchTitle === this.state.searchTitle) ? this.state.comics.length : 0				
		
		let marvelAPIInstance = new MarvelAPI()		
		marvelAPIInstance.getComics(title, offsetComics).then((response) => {			
			this.setState((prevState) => ({
				comics: [...prevState.comics, ...response.data.results],
				offsetComics: offsetComics,
				isLoading: false,
				isLazyLoading: false
			}))
		})
		.catch((err) => {
			this.setState({
				comics: -1,
				offsetComics: 0,
				selectedComics: -1,
				isLoading: false,
				isLazyLoading: false
			})
		})	
	}

	fetchComicById = (id) => {
		let marvelAPIInstance = new MarvelAPI()

		marvelAPIInstance.getComicById(id).then((response) => {
			this.setState({
				comicDetail: response.data.results[0],
				isLoadingModal: false
			})
		})
		.catch((err) => {
			this.setState({
				comicDetail: -1,
				isLoadingModal: false
			})
		})
	}

    // Handlers
	inputChangedHandler = (event) => {
		this.setState({ searchTitle: event.target.value })
	}

	searchComicsHandler = (event) => {
		event.preventDefault()
		this.setState({ 
			comics: [],
			isLoading: true,
			offsetComics: 0,
			lastFetchTitle: this.state.searchTitle
		})
		this.fetchComics(this.state.searchTitle)
	}

	showMoreHandler = (id) => {
		this.setState({ 
			isModalOpen: true,
			isLoadingModal: true
		 })     
		this.fetchComicById(id)
	}
	
	closeModalHandler = () => {
		this.setState({ isModalOpen: false })
	}
	
	selectComicHandler = (comic) => {
		// Aplica toggle de comic selecionada/removida
		const comicId = comic.id
		const selectedComics = [...this.state.selectedComics]
		let index = selectedComics.findIndex(el => el.id === comicId)		
		if(index === -1) {
			selectedComics.push(comic)
		}
		else {
			selectedComics.splice(index, 1)
		}

		this.setState({ selectedComics: selectedComics })
	}

	removeComicHandler = (comicId) => {
		const selectedComics = [...this.state.selectedComics]
		let index = selectedComics.findIndex(el => el.id === comicId)		
		if(index >= 0) {
			selectedComics.splice(index, 1)
		}

		this.setState({ selectedComics: selectedComics })
	}

	clearComics = () => {
		this.setState({ selectedComics: []})
	}
    
    render() {
		return (
			<Fragment>
				<Modal 
					visible={ this.state.isModalOpen }
					selected={ this.selectComicHandler.bind(this) }
					closed={ this.closeModalHandler.bind(this) }
					comic={ this.state.comicDetail }
					loading={ this.state.isLoadingModal }
					selectedComics={ this.state.selectedComics }
				/>
                <Header />
				
				<MainContent>
					<Form
						changed={ this.inputChangedHandler }
						submited={ this.searchComicsHandler }
					/>

					<ProjectContext.Provider value={{
						selectedComics: this.state.selectedComics,
						selectHandler: this.selectComicHandler.bind(this)
					}}>
						<CardList 
							comics={ this.state.comics } 
							clickedComic={ this.showMoreHandler }
							loading={ this.state.isLoading }
							lazyLoading={ this.state.isLazyLoading }
						/>						

						<SendEmailButton 
							visible={ this.state.isModalOpen }
							closed={ this.closeModalHandler.bind(this) }
							removed={ this.removeComicHandler.bind(this) }
							selectedComics={ this.state.selectedComics }
							cleared={ this.clearComics }
						/>
					</ProjectContext.Provider>
					
				</MainContent>

                <Footer>
					<SocialMediaList list={ this.socialMedia } />
					<p>&copy;{ this.currentYear } { Project.author }</p>
				</Footer>
			</Fragment>
		)
    }
}

export default Layout