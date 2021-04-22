import { useState, useEffect } from 'react'
import {
  Button, Form, FormGroup, Label, Input,
  Card, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap'
import Post from '../../utils/Post'
// import ArtCard from '../../components/ArtCard'
// import { render } from "react-dom"
import { storage } from "../../utils/firebase"
import User from '../../utils/User'

const Createpost = () => {
  const [postState, setPostState] = useState({
    title: '',
    body: '',
    price: '',
    posts: []
  })
  
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)
  // const collectionRef = firestore.collection('images')
  const [profileState, setProfileState] = useState({
    user: {}
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleUpload = (event) => {
    event.preventDefault()
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            let newArt = {
              title: postState.title,
              image: url,
              body: postState.body,
              price: postState.price
          
            }
            User.saveArt(newArt)
              .then(({ data }) => {
                console.log(data)
              })
              .catch(err => console.log(err))
            // collectionRef.add({ url, createdAt, artist: profileState })
            setUrl(url)
          })
      }
    )
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
  }, [])

  return (
    <>
      <h1>Create A Post</h1>
      {/* <Artcard /> */}
      <Form inline onSubmit={(event) => handleUpload(event)}>
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
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label htmlFor='price' className='mr-sm-2'>$Price$</Label>
          <Input
            type='number'
            name='price'
            value={postState.price}
            onChange={handleInputChange}
          />
        </FormGroup >
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <div>
            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" onChange={handleChange} />
            <br />
            {url}
          </div>
        </FormGroup>
        <Button onClick={(event) => handleUpload(event)}>Create Post</Button>
      </Form>
      {
        postState.posts.length
          ? postState.posts.map(post => (
            <Card key={post._id}>
              <CardBody>
                <CardTitle tag='h5'>{post.title}</CardTitle>
                <CardSubtitle tag='h6' className='mb-2 text-muted'>posted by {post.username}</CardSubtitle>
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
