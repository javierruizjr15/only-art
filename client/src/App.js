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
import Createpost from './pages/Createpost'

const App = () => {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  )
}

export default App