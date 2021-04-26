import { useState, useEffect } from 'react'

import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, CardImg, Button, Container, Col, Row
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
        window.location = '../login'
      })
  }, [])

  
  let postLength = postState.posts.length

  let ranPost = postState.posts[Math.floor(Math.random() * postState.posts.length)]
  
  for (let i = 0; i < postLength; i++) {
  
      console.log(postState.posts[Math.floor(Math.random() * postState.posts.length)])
  
    // console.log(ranPost)
  }

  

  

  return (
    <>
      
      <h1 className="text-center">Art Only</h1>
      <h2 className="text-center">Shop</h2>

      <Container row-cols-xl="3" className="text-center" fluid="lg" >
        <hr />
      </Container>

      <Container className="text-center" fluid="lg">
        <div className="row">
          {
            postState.posts
              ? postState.posts.map(bingo => (


                <Col sm="4" row-cols-xl="3">
                  <Card className="cardartS border border-secondary" key={bingo._id}>
                    <CardImg className="photo" src={bingo.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle className="font-weight-bold" tag='h5'>Title: {bingo.title}</CardTitle>
                      <CardText>Description: {bingo.body}</CardText>
                      <CardText>Price: ${bingo.price}</CardText>
                      <CardSubtitle tag='h6' className='mb-2 text-muted'>Artist: {bingo.artistName}</CardSubtitle>

                      <Button className="bttnM">Buy Now</Button>
                    </CardBody>
                  </Card>
                </Col>
              // </Card>

              ))
              : null
          }</div>
      </Container>


    </>
  )
}

export default Home