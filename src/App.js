import React, { Component, Fragment } from 'react'
import MarvelAPI from './services/MarvelApi'
import CardList from './components/CardList/CardList'
import Modal from './components/UI/Modal/Modal'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.searchTitle = null
	}

	state = {
		comics: [],
		comicDetail: null,
		isLoading: true,
		isModalOpen: false
	}

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

	componentDidMount() {
		this.fetchComics('Marv')
	}

	inputChangedHandler = (event) => {
		this.searchTitle = event.target.value
	}

	searchComicsHandler = (event) => {
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
					title= { this.state.comicDetail ? this.state.comicDetail.title : '' }
				/>
				<div className="App">
					<h1>SoftDesign Frontend Challenge</h1>
					<input type="text" onChange={this.inputChangedHandler} />
					<button onClick={this.searchComicsHandler}>Pesquisar</button>
					{ element}
					<CardList 
						comics={comics} 
						clickedComic={ this.showMoreHandler }
					/>
				</div>
			</Fragment>
		)
	}
}

export default App
