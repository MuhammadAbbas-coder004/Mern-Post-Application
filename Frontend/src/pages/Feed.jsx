import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {
const [posts, setPosts] = useState([
  { _id: 1, 
    image: "",
    caption: ""
  },
])








useEffect(()=>{

axios.get('https://satisfied-success-production-59f0.up.railway.app/posts')
.then((res) =>{
setPosts(res.data.posts)



})



},[])


  return (
    <div className="feed-page">
      <h1 className="feed-title">Feed</h1>
      <div className="feed-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-image-wrap">
              <img src={post.image} alt="post" className="post-image" />
              <div className="post-overlay">
                <p className="post-caption">{post.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed