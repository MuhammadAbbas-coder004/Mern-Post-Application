import React from 'react'
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomBar from './component/BottomBar';


const App = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePost/>} />
        <Route path='/feed' element={<Feed/>} />
      </Routes>
      <BottomBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
    </BrowserRouter>
  )
}

export default App