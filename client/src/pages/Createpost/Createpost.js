import { useState, useEffect } from 'react'
import {
  Button, Form, FormGroup, Label, Input,
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import Post from '../../utils/Post'
import ArtCard from '../../components/ArtCard'
const Createpost = () => {
  const [postState, setPostState] = useState({
    title: '',
    image: '',
    body: '',
    category: '',
    price: '',
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
        // the line below is commented out so I can test post w/o loging in. 
        // window.location = '/login'
      })
  }, [handleCreatePost])
  return (
    <>
      <h1>Create A Post</h1>
      {/* <Artcard /> */}
      <Form inline onSubmit={handleCreatePost}>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label htmlFor='title' className='mr-sm-2'>Title</Label>
          <Input
            type='text'
            name='title'
            value={postState.title}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label htmlFor='body' className='mr-sm-2'>Body</Label>
          <Input
            type='textarea'
            name='body'
            value={postState.body}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Category</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Painting</option>
            <option>Sculpture</option>
            <option>Architecture</option>
          </Input>
        </FormGroup>
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label htmlFor='price' className='mr-sm-2'>$Price$</Label>
          <Input
            type='number'
            name='price'
            value={postState.price}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button onClick={handleCreatePost}>Create Post</Button>
      </Form>
      {
        postState.posts.length
          ? postState.posts.map(post => (
            <Card key={post._id}>
              <CardBody>
                <CardTitle tag='h5'>{post.title}</CardTitle>
                <CardSubtitle tag='h6' className='mb-2 text-muted'>posted by {post.author.username}</CardSubtitle>
                <CardText>{post.body}</CardText>
              </CardBody>
            </Card>
          ))
          : null
      }
    </>
  )
}

export default Createpost
