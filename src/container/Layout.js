import React, { Component, Fragment } from 'react'
import MarvelAPI from '../services/MarvelApi'
import Header from '../components/Header/Header'
import MainContent from '../components/MainContent/MainContent'
import Form from '../components/Form/Form'
import Footer from '../components/Footer/Footer'
import CardList from '../components/CardList/CardList'
import Modal from '../components/UI/Modal/Modal'
import SocialMediaList from '../components/UI/SocialMediaList/SocialMediaList'
import Project from '../utils/Project'
import ProjectContext from '../context/Project'
import Mailer from '../utils/Mailer'
import LayoutCSS from './Layout.module.css'

class Layout extends Component {
    constructor(props) {
        super(props) 
		this.searchTitle = null
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
		comicDetail: null,
		isLoading: false,
		isModalOpen: false,
		isLoadingModal: true,
		selectedComics: []
	}

    componentDidMount() {
		this.setState({isLoading: true })
		this.fetchComics('Marv')
    }
    
    // Fetch data
	fetchComics = (title) => {
		let marvelAPIInstance = new MarvelAPI()

		marvelAPIInstance.getComics(title).then((response) => {
			this.setState({
				comics: response.data.results,
				isLoading: false
			})
		})
		.catch((err) => {
			this.setState({
				comics: -1,
				isLoading: false
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

			/*
			const mailerInstance = new Mailer()
			mailerInstance.setParams({
				subject: response.data.results[0].title,
				message: `<img src="${response.data.results[0].thumbnail.path}.${response.data.results[0].thumbnail.extension}" />`,
				sendTo: 'jean.flesch93@gmail.com'
			})

			mailerInstance.send((res) => {
				console.log(res)
			})
			*/
		})
	}

    // Handler
	inputChangedHandler = (event) => {
		this.searchTitle = event.target.value
	}

	searchComicsHandler = (event) => {
		event.preventDefault()
		this.fetchComics(this.searchTitle)
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
		console.log("SELECTED", selectedComics)
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