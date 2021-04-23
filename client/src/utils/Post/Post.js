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

  delete: id => axios.delete(`/api/post/${id}`,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),

  update: (id,post) => axios.put(`/api/posts/${id}`,post,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default Post