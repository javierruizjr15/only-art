import { useState, useEffect } from 'react'

// import {
//   Card, CardText, CardBody,
//   CardTitle, CardSubtitle, CardImg, Button, Container
// } from 'reactstrap'
import Post from '../../utils/Post'
import User from '../../utils/User'

const Home = () => {
  const [postState, setPostState] = useState({
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  const handleCreatePost = event => {
    event.preventDefault()
    Post.create({
      title: postState.title,
      body: postState.body
    })
      .then(({ data: post }) => {
        console.log(post)
        const posts = [...postState.posts]
        posts.push(post)
        setPostState({ ...postState, posts, title: '', body: '' })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    User.getAllProfiles()
      .then(({data:users})=>{
        console.log(users)
        users.map(user=>
          user.posts.map(art=>console.log(art)))
      }) 
      .catch (err => {
        console.error(err)
      })
  }, [])


return (
  <>
    <h1 className="text-center">Home Page</h1>



  </>
)
}

export default Home
