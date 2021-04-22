import { useState, useEffect } from 'react'
import {
  Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Container, CardImg
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'

const Home = () => {
  const [postState, setPostState] = useState({
    title: '',
    body: '',
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
    Post.getAll()
      .then(({ data: posts }) => {
        console.log(posts)
        setPostState({ ...postState, posts })
      })
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }, [])
  
  return (
    <>
      <Container fluid={true}>
        <div className="row">
          {
            profileState.user.posts
              ? profileState.user.posts.map(post => (


                <div className="col-sm-4">
                  <Card key={post._id}>
                    <CardImg className="photo" src={post.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag='h5'>Title: {post.title}</CardTitle>
                      <CardText>Description: {post.body}</CardText>
                      <CardText>Price: ${post.price}</CardText>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>Artist: {profileState.user.username}</CardSubtitle>
                      <Button>Buy Now</Button>
                      <Button onClick={() => handleDeletePost(post._id)}>Delete</Button>
                    </CardBody>

                  </Card>
                </div>


              ))
              : null
          }</div>
      </Container>
    </>
  )
}

export default Home
