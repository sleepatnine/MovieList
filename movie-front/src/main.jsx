import React from 'react'
import ReactDOM from 'react-dom/client'
import AddMovie from './components/AddMovie/AddMovie.jsx'
import './index.css'
import MovieList from './components/MovieList/MovieList'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AddMovie />
    </React.StrictMode>,
)
