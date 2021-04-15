import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import User from '../../utils/User'

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
        alert('User registered!')
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
      <h1>Register</h1>
      <Form inline onSubmit={handleRegister}>
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
        <Button onClick={handleRegister}>Register</Button>
      </Form>
      <h1>Login</h1>
      <Form inline onSubmit={handleLogin}>
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
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </>
  )
}

export default Login