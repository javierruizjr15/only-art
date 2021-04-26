import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Col, Row } from 'reactstrap'
import User from '../../utils/User'
// import Artcard from '../../components/ArtCard'


const Login = () => {
  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    un: '',
    pw: ''
  })

  

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleRegister = event => {
    event.preventDefault()
    User.register({
      name: loginState.name,
      email: loginState.email,
      username: loginState.username,
      password: loginState.password
    })
      .then(() => {
        alert(`Welcome ${loginState.name}, You are now registered with Art Only, where it's art only.`)
        setLoginState({ ...loginState, name: '', email: '', username: '', password: '' })
      })
      .catch(err => console.error(err))
  }

  const handleLogin = event => {
    event.preventDefault()
    User.login({
      username: loginState.un,
      password: loginState.pw
    })
      .then(({ data }) => {
        localStorage.setItem('user', data)
        window.location = '/'
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <h1 className="text-center">Login</h1>
     <Row>
        <Col className="login" sm="4" md={{ offset: 4 }}>
        <Form onSubmit={handleLogin}>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='un' className='mr-sm-2'>Username</Label>
            <Input
              type='text'
              name='un'
              value={loginState.un}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='pw' className='mr-sm-2'>Password</Label>
            <Input
              type='password'
              name='pw'
              value={loginState.pw}
              onChange={handleInputChange}
            />
          </FormGroup>
          
            <Col className="text-center">
            <Button  className="bttnM" onClick={handleLogin}>Login</Button>
            </Col>
            
        </Form>
      </Col>
      </Row>


      <h1 className="text-center">Register</h1>
      <Row>
        <Col className="login" sm="4" md={{ offset: 4 }}>
        <Form onSubmit={handleRegister}>
            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='name' className='mr-sm-2'>Name</Label>
            <Input
              type='text'
              name='name'
              value={loginState.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='email' className='mr-sm-2'>email</Label>
            <Input
              type='email'
              name='email'
              value={loginState.email}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='username' className='mr-sm-2'>Username</Label>
            <Input
              type='text'
              name='username'
              value={loginState.username}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label htmlFor='password' className='mr-sm-2'>Password</Label>
            <Input
              type='password'
              name='password'
              value={loginState.password}
              onChange={handleInputChange}
            />
          </FormGroup>
            <Col className="text-center">
          <Button className="bttnM" onClick={handleRegister}>Register</Button>
            </Col>
        </Form>
        </Col>
      </Row>
    </>
  )
}

export default Login