import React, { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
  const [fileName, setFileName] = useState('')
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)

  const hendleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)
    formData.append('image', file)
formData.append('caption', caption)

axios.post('https://satisfied-success-production-59f0.up.railway.app/create-post', formData)
.then((res)=>{
console.log(res);



}).catch((err)=>{
console.log(err);



})
  }

  return (
    <div className="page">
      <div className="container">

        <h1 className="title">Create Post</h1>
        <p className="subtitle">Share something with the world</p>

        <div className="card">
          <form onSubmit={hendleSubmit}>

            <label className="label">Image / File</label>
            <label htmlFor="file-input" className="upload-box">
              <p className="upload-icon">☁️</p>
              <p className="upload-text">{fileName ? `✓ ${fileName}` : 'Click to upload'}</p>
              <p className="upload-hint">PNG, JPG, PDF — max 10MB</p>
              <input type="file" id="file-input" style={{display:'none'}} accept="image/*,.pdf"
                onChange={(e) => {
  setFile(e.target.files[0])
  setFileName(e.target.files[0]?.name || '')
}}/>
            </label>

            <div className="caption-box">
              <label className="label">Caption</label>
              <textarea
                placeholder="Write your caption here..."
                rows={4}
                maxLength={200}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="textarea"
              />
              <p className="char-count">{caption.length}/200</p>
            </div>

            <button type="submit" className="btn">Publish Post</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost