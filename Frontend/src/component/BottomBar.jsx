import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const BottomBar = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isCreate = location.pathname === '/'
  const isFeed = location.pathname === '/feed'

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-2xl flex justify-around items-center pt-3 pb-3 z-[999] transition-colors duration-300 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.2)] border-t border-white/20 dark:border-white/5">
      
      {/* Create */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer border-none bg-transparent outline-none group"
        onClick={() => navigate('/')}
      >
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center
          ${isCreate 
            ? 'text-black dark:text-white scale-125 -translate-y-1.5 drop-shadow-md' 
            : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white group-active:scale-75'
          }`}
        >
          {/* Unique Create Icon: Hexagon Plus */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isCreate ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </div>
      </button>

      {/* Feed (Home) */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer border-none bg-transparent outline-none group"
        onClick={() => navigate('/feed')}
      >
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center
          ${isFeed 
            ? 'text-black dark:text-white scale-125 -translate-y-1.5 drop-shadow-md' 
            : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white group-active:scale-75'
          }`}
        >
          {/* Unique Feed Icon: Overlapping Cards */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isFeed ? "2.5" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="16" height="15" rx="2" ry="2"/>
            <path d="M6 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2"/>
          </svg>
        </div>
      </button>

      {/* Theme Toggle */}
      <button
        className="flex-1 flex flex-col items-center justify-center gap-1.5 cursor-pointer border-none bg-transparent outline-none group"
        onClick={toggleTheme}
      >
        <div className="transition-all duration-500 flex items-center justify-center group-active:scale-75">
          <div className={`transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isDarkMode ? 'rotate-[360deg] scale-110 text-white' : '-rotate-[360deg] scale-110 text-gray-900'}`}>
            {isDarkMode ? (
              /* Unique Theme Icon: Magical Moon with Star */
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                <path d="M18 5l.5-1.5L20 3l-1.5.5L17 3l.5 1.5L17 6l1.5-.5L20 6l-1.5-1.5z" fill="currentColor" stroke="none"/>
              </svg>
            ) : (
              /* Unique Theme Icon: Starburst Sun */
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" />
                <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
              </svg>
            )}
          </div>
        </div>
      </button>

    </div>
  )
}

export default BottomBar