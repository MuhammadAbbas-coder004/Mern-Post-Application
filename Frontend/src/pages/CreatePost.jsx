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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 pb-20 transition-colors duration-300">
      <div className="w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1 tracking-tight">Create Post</h1>
        <p className="text-sm text-gray-400 text-center mb-5">Share something with the world</p>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-xl transition-colors duration-300">
          <form onSubmit={hendleSubmit}>

            {/* AI Section */}
            <div className="mb-5">
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                <FaWandMagicSparkles size={14} /> Generate Image with AI
              </label>
              <div className="flex gap-2.5 items-stretch">
                <input
                  type="text"
                  className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 outline-none focus:border-gray-900 dark:focus:border-white transition-colors duration-200 disabled:opacity-50"
                  placeholder="e.g. A futuristic city at sunset..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <button
                  type="button"
                  className="px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-semibold whitespace-nowrap hover:bg-gray-700 dark:hover:bg-gray-200 active:scale-[0.97] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleGenerate}
                  disabled={isGenerating || !aiPrompt}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>
              {aiError && <p className="text-red-500 text-xs mt-2 font-medium">{aiError}</p>}
            </div>

            {/* Divider */}
            <div className="flex items-center text-center my-6 text-gray-400 dark:text-gray-500 text-xs font-semibold">
              <div className="flex-1 border-b border-gray-200 dark:border-gray-600"></div>
              <span className="px-3">OR</span>
              <div className="flex-1 border-b border-gray-200 dark:border-gray-600"></div>
            </div>

            {/* Upload Box */}
            <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">
              Upload Image
            </label>
            <label
              htmlFor="file-input"
              className={`block mb-5 rounded-2xl cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 transition-all duration-200 hover:border-gray-900 dark:hover:border-white
                ${previewImage
                  ? 'p-0 border-solid overflow-hidden h-48 flex items-center justify-center bg-black'
                  : 'p-8 text-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
            >
              {!previewImage ? (
                <>
                  <p className="flex justify-center mb-3 text-gray-400 dark:text-gray-500">
                    <FaCloudArrowUp size={36} />
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {fileName ? `✓ ${fileName}` : 'Click to upload'}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPG — max 10MB</p>
                </>
              ) : (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover block" />
              )}
              <input type="file" id="file-input" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>

            {/* Caption */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2 block">
                Caption
              </label>
              <textarea
                placeholder="Write your caption here..."
                rows={4}
                maxLength={200}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full resize-none border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 outline-none focus:border-gray-900 dark:focus:border-white transition-colors duration-200 leading-relaxed"
              />
              <p className="text-xs text-gray-400 text-right mt-1">{caption.length}/200</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-none rounded-xl cursor-pointer tracking-wide hover:bg-gray-700 dark:hover:bg-gray-200 active:scale-[0.97] transition-all duration-200 flex items-center justify-center gap-2"
            >
              Publish Post
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost