import React from 'react'
import logo from './logo.svg'
import './App.css'
import PostList from 'Components/PostList/PostList'
import CreatePost from 'Components/CreatePost/CreatePost'

function App() {
  return (
    <div className='App'>
      <CreatePost />
      <PostList></PostList>
    </div>
  )
}

export default App
