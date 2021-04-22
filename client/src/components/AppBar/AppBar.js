import { useState, useEffect } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import User from '../../utils/User'
import './AppBar.css'
import artonly from './artonly.png'

const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleLogOut = () => {
    localStorage.removeItem('user')
    window.location = '/login'
  }

  useEffect(() => {
    User.profile()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [])
  return (
    <Navbar color='light' light expand='md'>
      <Link to='/' className='link'>
        <NavbarBrand>
          <a href="#">&#9776; React-Bootstrap
          <img src={artonly} style={{ width: 100, marginTop: -7 }} />
          </a>
        </NavbarBrand>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          {
            !isLoggedIn &&
            <NavItem>
              <Link to='/login' className='link'>
                <NavLink>Register/Login</NavLink>
              </Link>
            </NavItem>
          }
          {
            isLoggedIn &&
            <>
              <NavItem>
                <Link to='/profile' className='link'>
                  <NavLink>My Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/' className='link'>
                  <NavLink>Home</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink onClick={handleLogOut}>Log Out</NavLink>
              </NavItem>
              <NavItem>
                <Link to='/createpost' className='link'>
                  <NavLink>Create and Sell</NavLink>
                </Link>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppBar