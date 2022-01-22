import axios from 'axios'

export default axios.create({
  baseURL: 'https://social-drawing-guessing-game.herokuapp.com/',
  // baseURL: 'http://localhost:8000/',
  headers: {
    'Content-type': 'application/json'
  }
})
