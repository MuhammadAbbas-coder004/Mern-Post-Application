import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then((res) => {
        // Sort by oldest first (Pehle create kiya hua pehle)
        const sortedPosts = res.data.posts.sort((a, b) => a._id.localeCompare(b._id));
        setPosts(sortedPosts);
      })
  }, [])

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      setPosts(posts.filter(p => p._id !== postId));
      setSelectedPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  }

  const handleDownload = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `post-${new Date().getTime()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image: ", error);
      window.open(imageUrl, '_blank');
    }
  }

  const handleShare = (platform, post) => {
    const text = encodeURIComponent(post.caption || 'Check out this post!');
    const url = encodeURIComponent(post.image);
    
    let shareUrl = '';
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        if (navigator.share) {
          navigator.share({
            title: 'Post',
            text: post.caption,
            url: post.image,
          }).catch(console.error);
          return;
        } else {
          alert('Instagram sharing requires mobile app. Image link copied to clipboard!');
          navigator.clipboard.writeText(post.image);
          return;
        }
      default:
        break;
    }
    
    if(shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 pt-8 pb-24 transition-colors duration-300">

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8 tracking-tight">Feed</h1>

      {/* Standard CSS Grid for equal sized cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group relative rounded-[2rem] overflow-hidden cursor-pointer bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ring-1 ring-black/5 dark:ring-white/10"
            onClick={() => setSelectedPost(post)}
          >
            {/* Image — Match card size exactly */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              <img
                src={post.image}
                alt="post"
                className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Animated Caption & Badge */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                <p className="text-white text-[15px] font-medium leading-relaxed line-clamp-3 drop-shadow-lg">
                  {post.caption || "Tap to view this post in detail."}
                </p>
                
                {/* View Badge (Glassmorphism) */}
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-white drop-shadow-md">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-white/95 uppercase tracking-widest drop-shadow-md">Expand</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-3xl md:rounded-[2rem] w-full max-w-sm md:max-w-lg max-h-[80vh] md:max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col border border-gray-100 dark:border-gray-800 relative -mt-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/50 backdrop-blur-md border-none text-white z-10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg"
              onClick={() => setSelectedPost(null)}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Image */}
            <div className="w-full rounded-t-3xl md:rounded-t-[2rem] overflow-hidden bg-black/5 flex justify-center items-center">
              <img
                src={selectedPost.image}
                alt="selected"
                className="w-full max-h-[35vh] md:max-h-[50vh] object-contain block"
              />
            </div>

            {/* Caption */}
            {selectedPost.caption && (
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-2">
                  {selectedPost.caption}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="px-4 py-4 md:px-6 md:py-6 bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-3 md:gap-6 rounded-b-3xl md:rounded-b-[2rem]">
              {/* Primary Actions */}
              <div className="flex gap-2 md:gap-3">
                {/* Download */}
                <button
                  className="flex-1 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-[1.03] shadow-sm transition-all duration-300 ease-out active:scale-[0.97] text-[13px] md:text-[14px]"
                  onClick={() => handleDownload(selectedPost.image)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="md:w-[18px] md:h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline strokeLinecap="round" strokeLinejoin="round" points="7 10 12 15 17 10"></polyline>
                    <line strokeLinecap="round" strokeLinejoin="round" x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download
                </button>
                
                {/* Delete */}
                <button
                  className="flex-1 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl border-none bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white hover:scale-[1.03] transition-all duration-300 ease-out active:scale-[0.97] text-[13px] md:text-[14px]"
                  onClick={() => handleDelete(selectedPost._id)}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="md:w-[18px] md:h-[18px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete Post
                </button>
              </div>

              {/* Share Buttons */}
              <div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 md:mb-3 ml-1">Share</p>
                <div className="flex gap-2 md:gap-3">
                  {/* WhatsApp */}
                  <button
                    className="flex-1 py-2.5 md:py-3 rounded-xl md:rounded-2xl border-none bg-[#25D366] text-white font-semibold flex items-center justify-center cursor-pointer hover:-translate-y-1 shadow transition-all active:scale-95"
                    onClick={() => handleShare('whatsapp', selectedPost)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>

                  {/* Facebook */}
                  <button
                    className="flex-1 py-2.5 md:py-3 rounded-xl md:rounded-2xl border-none bg-[#1877F2] text-white font-semibold flex items-center justify-center cursor-pointer hover:-translate-y-1 shadow transition-all active:scale-95"
                    onClick={() => handleShare('facebook', selectedPost)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  {/* Instagram */}
                  <button
                    className="flex-1 py-2.5 md:py-3 rounded-xl md:rounded-2xl border-none bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white font-semibold flex items-center justify-center cursor-pointer hover:-translate-y-1 shadow transition-all active:scale-95"
                    onClick={() => handleShare('instagram', selectedPost)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default Feed