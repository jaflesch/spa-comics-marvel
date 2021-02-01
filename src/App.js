import React, { Component } from 'react'
import MarvelAPI from './services/MarvelApi'
import CardList from './components/CardList/CardList'
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.searchTitle = null
	}

	state = {
		comics: [],
		isLoading: true
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

	inputChangedHandler = (event) => {
		this.searchTitle = event.target.value
	}

	searchComicsHandler = (event) => {
		this.fetchComics(this.searchTitle)
	}

	render() {
		let element = (this.state.isLoading) ? <p>Loading...</p> : <p>Request finished</p>
		let comics = null

		if (this.state.comics.results && this.state.comics.results.length > 0) {
			comics = [...this.state.comics.results]
		}

		return (
			<div className="App">
				<h1>SoftDesign Frontend Challenge</h1>
				<input type="text" onChange={this.inputChangedHandler} />
				<button onClick={this.searchComicsHandler}>Pesquisar</button>
				{ element}
				<CardList comics={comics} />
			</div>
		)

	}
}

export default App
