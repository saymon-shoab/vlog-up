import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import  './ConfigureAmplify'
import Navbar from './Component/Navbar';
import Home from './Page/Home';
import CreateBlog from './Page/CreateBlog';
import Profile from './Page/Profile';
import MyBlogs from './Page/MyBlogs';
import Id from './Page/Id';
import EditPost from './Page/EditPost';


function App() {
  return (
    <div className=" mx-24">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/createBlog" element={<CreateBlog/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/blog" element={<MyBlogs/>}/>
        <Route path="/blog/:id" element={<Id/>}/>
        <Route path="/edit-post/:id" element={<EditPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
