import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomBar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isCreate = location.pathname === '/'
  const isFeed = location.pathname === '/feed'

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-t border-gray-150 dark:border-gray-900 flex justify-around items-center pt-3 pb-5 z-[999] transition-colors duration-300">
      
      {/* Create */}
      <button
        className="w-20 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[11px] font-medium transition-all duration-300 border-none bg-transparent outline-none"
        onClick={() => navigate('/')}
      >
        <div className={`transition-colors duration-300 flex items-center justify-center
          ${isCreate 
            ? 'text-gray-900 dark:text-white' 
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
        <span className={`transition-colors duration-300 ${isCreate ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Create</span>
      </button>

      {/* Feed */}
      <button
        className="w-20 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[11px] font-medium transition-all duration-300 border-none bg-transparent outline-none"
        onClick={() => navigate('/feed')}
      >
        <div className={`transition-colors duration-300 flex items-center justify-center
          ${isFeed 
            ? 'text-gray-900 dark:text-white' 
            : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <span className={`transition-colors duration-300 ${isFeed ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Feed</span>
      </button>

      {/* Theme Toggle */}
      <button
        className="w-20 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-[11px] font-medium transition-all duration-300 border-none bg-transparent outline-none"
        onClick={toggleTheme}
      >
        <div className="transition-colors duration-300 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          {isDarkMode ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </div>
        <span className="text-gray-400 dark:text-gray-500">{isDarkMode ? 'Light' : 'Dark'}</span>
      </button>

    </div>
  )
}

export default BottomBar