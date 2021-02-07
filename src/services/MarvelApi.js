import axios from 'axios'

class MarvelAPI {
    constructor() {
        this.publicKey = '9f10519dd487fe90f4db3fece4c12da0'
        this.baseURL = 'https://gateway.marvel.com:443/v1/public'
        this.axiosInstance = axios.create({
            baseURL: this.baseURL
        })
    }

    getCharacters (params) {
        return this.axiosInstance.get(`/characters?apikey=${this.publicKey}`).then((response) => {
            return response.data
        })
    }  

    getComics (title, callback) {
        let titleSearch = (title) ? `titleStartsWith=${title}` : ''

        return this.axiosInstance.get(`/comics?${titleSearch}&orderBy=-focDate&apikey=${this.publicKey}`).then((response) => {
            return response.data
        })
    }  

    getComicById (comicId) {
        return this.axiosInstance.get(`/comics/${comicId}?apikey=${this.publicKey}`).then((response) => {
            return response.data
        })
    }  
}

export default MarvelAPI