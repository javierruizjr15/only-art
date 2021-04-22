import { useState, useEffect } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg, Button, Container
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'
import "./Profile.css"

const Profile = () => {
  const [profileState, setProfileState] = useState({
    user: {}
  })


  const handleDeletePost = id => {
    Post.delete(id)
      .then(() => {
        const user = profileState.user
        user.posts = profileState.user.posts.filter(post => post._id !== id)
        setProfileState({ ...profileState, user })
      })
  }

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => setProfileState({ ...profileState, user }))
      .catch(err => {
        console.error(err)
        window.location = '/login'
      })
  }, [])

  return (
    <>
      {/* Rendering your profile info from mongodb */}
      <h1>Your Info</h1>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>{profileState.user.name}</CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{profileState.user.email}</CardSubtitle>
          <CardText>{profileState.user.username}</CardText>
        </CardBody>
      </Card>
      <hr />
      {/* Rendering posts from mongodb */}
      <h1>Your Posts</h1>
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

export default Profile