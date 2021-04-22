import axios from 'axios'

const User = {
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  delete: user => axios.delete('/api/users',user),
  update: user => axios.put('/api/users/:id', user),
  profile: () => axios.get('/api/user',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  getAllProfiles: () => axios.get('/api/users',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  saveArt: (body) => axios.post('/api/users/art', body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default User