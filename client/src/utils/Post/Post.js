import axios from 'axios'

const Post = {
  getAll: () => axios.get('/api/posts',{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),

  create: post=>axios.post('/api/posts',post,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),

  delete: post => axios.delete('/post/:id',{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),

  update: post => axios.put('/posts/:id',post,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}