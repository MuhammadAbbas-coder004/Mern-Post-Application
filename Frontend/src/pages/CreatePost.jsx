import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaWandMagicSparkles, FaCloudArrowUp } from "react-icons/fa6";
const CreatePost = () => {
  const [fileName, setFileName] = useState('')
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState(null)
  
  // AI States
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiError, setAiError] = useState('')
  const [previewImage, setPreviewImage] = useState(null)
  
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setAiError('');
    try {
      const response = await axios.post('http://localhost:3000/generate-image', { prompt: aiPrompt });
      const base64Data = response.data.image;
      
      // Convert base64 to Blob to File
      const res = await fetch(base64Data);
      const blob = await res.blob();
      const generatedFile = new File([blob], "ai-generated-image.jpg", { type: "image/jpeg" });
      
      setFile(generatedFile);
      setFileName(generatedFile.name);
      setPreviewImage(base64Data);
    } catch (err) {
      console.error(err);
      setAiError(err.response?.data?.error || 'Failed to generate image. Ensure API key is set.');
    } finally {
      setIsGenerating(false);
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setPreviewImage(URL.createObjectURL(selectedFile));
      setAiError('');
    }
  }

  const hendleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        alert("Please provide an image (Upload or Generate)");
        return;
    }

    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)

    axios.post('http://localhost:3000/create-post', formData)
    .then((res)=>{
        console.log(res);
        navigate('/feed');
    }).catch((err)=>{
        console.log(err);
        alert('Error creating post');
    })
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Create Post</h1>
        <p className="subtitle">Share something with the world</p>

        <div className="card">
          <form onSubmit={hendleSubmit}>

            <div className="ai-section">
              <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaWandMagicSparkles size={14} /> Generate Image with AI</label>
              <div className="ai-input-group">
                <input 
                  type="text" 
                  className="textarea ai-input" 
                  placeholder="e.g. A futuristic city at sunset..." 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <button type="button" className="btn ai-btn" onClick={handleGenerate} disabled={isGenerating || !aiPrompt}>
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
              {aiError && <p className="error-text">{aiError}</p>}
            </div>

            <div className="divider"><span>OR</span></div>

            <label className="label">Upload Image</label>
            <label htmlFor="file-input" className={`upload-box ${previewImage ? 'has-preview' : ''}`}>
              {!previewImage ? (
                  <>
                    <p className="upload-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}><FaCloudArrowUp size={36} /></p>
                    <p className="upload-text">{fileName ? `✓ ${fileName}` : 'Click to upload'}</p>
                    <p className="upload-hint">PNG, JPG — max 10MB</p>
                  </>
              ) : (
                  <img src={previewImage} alt="Preview" className="image-preview" />
              )}
              <input type="file" id="file-input" style={{display:'none'}} accept="image/*"
                onChange={handleFileChange} />
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