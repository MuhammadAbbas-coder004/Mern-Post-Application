import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="bottom-bar">

      <div className={`bottom-item ${location.pathname === '/' ? 'active' : ''}`}
        onClick={() => navigate('/')}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <span>Create</span>
      </div>

      <div className={`bottom-item ${location.pathname === '/feed' ? 'active' : ''}`}
        onClick={() => navigate('/feed')}>
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>Feed</span>
      </div>

    </div>
  )
}

export default BottomBar