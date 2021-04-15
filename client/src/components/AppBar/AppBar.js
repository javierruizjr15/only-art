import { useState, useEffect } from 'react'
import 'react-bulma-components/basic/react-bulma-components.min.css'
import { 
  Navbar,
  NavbarBrand,
  NavbarBurger,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  NavbarItem,
  NavbarLink,
  NavbarkDropdown,
  NavbarDivier
} from 'react-bulma-components/dist'
import User from '../../utils/User'
import './AppBar.css'

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
        <NavbarBrand>Not Facebook</NavbarBrand>
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
            </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default AppBar