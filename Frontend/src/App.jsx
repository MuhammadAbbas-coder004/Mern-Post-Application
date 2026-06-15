import React from 'react'
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomBar from './component/BottomBar';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePost/>} />
        <Route path='/feed' element={<Feed/>} />
      </Routes>
      <BottomBar/>
    </BrowserRouter>
  )
}

export default App