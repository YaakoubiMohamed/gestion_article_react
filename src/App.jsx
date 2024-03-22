import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Footer from './layout/Footer'
import Navbar from './layout/Navbar'
import ListeArticles from './components/ListeArticles'
import ArtcileForm from './components/ArticleForm'
import AfficheArticle from './components/AfficheArticle'

function App() {

  return (
    <>
      <Router>
        <div className="App container">
          <Navbar/>
          <Routes>
            <Route path="/" element={< ListeArticles/>} />
            <Route path='/articles/new' element={< ArtcileForm/>}></Route>
            <Route path='/articles/:articleId' element={< AfficheArticle/>}></Route>
            <Route path='/articles/:articleId/edit' element={< ArtcileForm/>}></Route>
          </Routes>
          <Footer/>
        </div>
      </Router>
    </>
  )
}

export default App
