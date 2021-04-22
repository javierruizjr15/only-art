// import React, { useState, useEffect } from "react"
// import { render } from "react-dom"
// import { storage, firestore, timestamp } from "../../utils/firebase"
// import User from '../../utils/User'

// const ReactFirebaseFileUpload = () => {
//   const [image, setImage] = useState(null)
//   const [url, setUrl] = useState("")
//   const [progress, setProgress] = useState(0)
//   const collectionRef = firestore.collection('images')
//   const [profileState, setProfileState] = useState({
//     user: {}
//   })
  
//   const handleChange = e => {
//     if (e.target.files[0]) {
//       setImage(e.target.files[0])
//     }
//   }

//   const handleUpload = () => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image)
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         )
//         setProgress(progress)
//       },
//       error => {
//         console.log(error)
//       },
//       () => {
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             const createdAt = timestamp()
//             let newArt = {

//             }
//             User.saveArt()
//             .then()
//             .catch()
//             // collectionRef.add({ url, createdAt, artist: profileState })
//             setUrl(url)
//           })
//       }
//     )
//   }


//   return (
//     <div>
//       <progress value={progress} max="100" />
//       <br />
//       <br />
//       <input type="file" onChange={handleChange} />
//       <button onClick={handleUpload}>Upload</button>
//       <br />
//       {url}
//     </div>
//   )
// }

// render(<ReactFirebaseFileUpload />, document.querySelector("#root"))

// export default ReactFirebaseFileUpload