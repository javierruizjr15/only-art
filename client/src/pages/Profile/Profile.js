import { useState, useEffect } from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import User from '../../utils/User'
import Post from '../../utils/Post'

const Profile = () => {
  const [profileState, setProfileState] = useState({
    user: {}
  })

  const [postState, setPostState] = useState({
    posts:[]
  })

  const handleDeletePost = id =>{
    Post.delete(id)
      .then(()=>{
        const posts = postState.posts.filter(post=>post._id!==id)
        setPostState({...postState,posts})
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
      <h1>Your Info</h1>
      <Card>
        <CardBody>
          <CardTitle tag='h5'>{profileState.user.name}</CardTitle>
          <CardSubtitle tag='h6' className='mb-2 text-muted'>{profileState.user.email}</CardSubtitle>
          <CardText>{profileState.user.username}</CardText>
        </CardBody>
      </Card>
      <hr />
      <h1>Your Posts</h1>
      {
        profileState.user.posts
          ? profileState.user.posts.map(post => (
            <Card key={post._id}>
              <CardBody>
                <CardTitle tag='h5'>{post.title}</CardTitle>
                <CardSubtitle tag='h6' className='mb-2 text-muted'>posted by {profileState.user.username}</CardSubtitle>
                <CardText>{post.body}</CardText>
                <button onClick={()=>handleDeletePost(post._id)}>Delete</button>
              </CardBody>
              
            </Card>
          ))
          : null
      }
      
    </>
  )
}

export default Profile