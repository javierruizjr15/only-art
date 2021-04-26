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
import onlyart from './onlyart.png'
import { CartIcon } from '../icons'

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
    <Navbar className="navbar" light expand='md'>
      <Link to='/' className='link'>
        <NavbarBrand>
          <img src={onlyart} style={{ width: 100, marginTop: -7 }} />
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
                <Link to='/' className='link'>
                  <NavLink color="black">Shop</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/createpost' className='link'>
                  <NavLink color="black">Create and Sell</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/profile' className='link'>
                  <NavLink color="black">My Profile</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink color="black" onClick={handleLogOut}>Log Out</NavLink>
              </NavItem>
              <NavItem>
                <NavLink color='black' to='/cart' className='cart'> <CartIcon/> Cart </NavLink>
              </NavItem>
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppBar