import { useState, useEffect, } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg, Button, Container, Col, Row,
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
      <h1 className="text-center">Profile</h1>
      <Row>
        <Col sm="4" md={{ offset: 4 }}>
          
        <Card className="text-center cardinfoS">
        <CardBody>
          <CardTitle tag='h5'>{profileState.user.name}</CardTitle>
          <CardSubtitle tag='h6' className='mb-2'>{profileState.user.email}</CardSubtitle>
          <CardText>{profileState.user.username}</CardText>
        </CardBody>
      </Card>
      </Col>
      </Row>
      <hr />

      {/* Rendering posts from mongodb */}
      <h1 className="text-center">Your Posts</h1>
      <Container className="text-center"  fluid="lg">
        <div className="row">
          {
            profileState.user.posts
              ? profileState.user.posts.map(post => (

                
                <Col sm="4" row-cols-xl="3">
                  <Card className="cardartS border border-secondary formB" key={post._id}>
                    <CardImg className="photo" src={post.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="font-weight-bold" tag='h5'>Title: {post.title}</CardTitle>
                      <CardText>Description: {post.body}</CardText>
                      <CardText>Price: ${post.price}</CardText>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>Profile: {profileState.user.username}</CardSubtitle>
                      <CardText>Contact Email: {post.email}</CardText>
                      {/* <Button className="bttnM">Buy Now</Button> */}
                      <Button className="bttnM" onClick={() => handleDeletePost(post._id)}>Delete</Button>
                    </CardBody>

                  </Card>
                </Col>


              ))
              : null
          }</div>
      </Container>
    </>
  )
}

export default Profile