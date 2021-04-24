import { useState, useEffect } from 'react'

import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg, Button, Container
} from 'reactstrap'
import Post from '../../utils/Post'
import User from '../../utils/User'

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
      .then(({ data: posts }) => setPostState({ ...postState, posts }))
      // console.log(posts[5].artistName)
      // if(posts){
      //   posts.map(post=>{
      //     console.log(post.title)

      //   })
      // }


      .catch(err => {
        console.error(err)
      })
  }, [])
  return (
    <>
      <h1 className="text-center">Art Only</h1>
      <h2 className="text-center">Shop</h2>
      <Container fluid={true}>
        <div className="row">
          {
            postState.posts
              ? postState.posts.map(post => (


                <div className="col-sm-4 ">
                  <Card className="cardartS" key={post._id}>
                    <CardImg className="photo" src={post.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="font-weight-bold" tag='h5'>Title: {post.title}</CardTitle>
                      <CardText>Description: {post.body}</CardText>
                      <CardText>Price: ${post.price}</CardText>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>Artist: {post.artistName}</CardSubtitle>
                      {/* <Button className="bttnM">Buy Now</Button> */}
                      <Button className="bttnM">Buy Now</Button>
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