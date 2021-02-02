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
		isLoading: true,
		isModalOpen: false
	}

    componentDidMount() {
		this.fetchComics('Marv')
    }
    
    // Fetch data
	fetchComics = (title) => {
		let marvelAPIInstance = new MarvelAPI()

		marvelAPIInstance.getComics(title).then((response) => {
			this.setState({
				comics: response.data,
				isLoading: false
			})
		})
	}

	fetchComicById = (id) => {
		let marvelAPIInstance = new MarvelAPI()

		marvelAPIInstance.getComicById(id).then((response) => {
			console.log('apiisnt:::', response)
			this.setState({
				comicDetail: response.data.results[0],
				isLoading: false
			})
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
		console.log(id)
		this.setState({ 
			isModalOpen: true,
			isLoading: true
		 })     
		this.fetchComicById(id)
	}
	
	closeModalHandler = () => {
		this.setState({ isModalOpen: false})
    }
    
    render() {
        let element = (this.state.isLoading) ? <p>Loading...</p> : <p>Request finished</p>
		let comics = null

		if (this.state.comics.results && this.state.comics.results.length > 0) {
			comics = [...this.state.comics.results]
		}

		return (
			<Fragment>
				<Modal 
					visible={ this.state.isModalOpen }
					closed={ this.closeModalHandler.bind(this) }
					comic={ this.state.comicDetail }
				/>
                <Header />
				
				<MainContent>
					<Form
						changed={ this.inputChangedHandler }
						submited={ this.searchComicsHandler }
					/>

					{ element}

					<CardList 
						comics={comics} 
						clickedComic={ this.showMoreHandler }
					/>
				</MainContent>

                <Footer>
					<SocialMediaList list={ this.socialMedia } />
					<p>
						&copy;{ this.currentYear } { Project.author }
					</p>
				</Footer>
			</Fragment>
		)
    }
}

export default Layout