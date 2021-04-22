import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import AppBar from './components/AppBar'
// import CreateArtPost from './components/CreateArtPost'
import Createpost from './pages/Createpost'
// import ArtCard from './components/ArtCard'
// import Modal from './components/Modal'

const App = () => {

  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <Router>
      <div className="App">
        <AppBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/createpost'>
            <Createpost />
          </Route>
        </Switch>
        {/* Code for firebase upload and render connection - don't need in this project but want to keep it for reference later on. */}
        {/* <ArtCard setSelectedImg={setSelectedImg} />
        { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> } */}
      </div>
    </Router>
  )
}

export default App