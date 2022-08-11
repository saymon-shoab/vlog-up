import React from 'react'
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listBlogposts } from '../graphql/queries';
const Home = () => {
    const [posts, setPosts] = useState([]);

    const fetchBlogPost = async () => {
        const blogPostData = await API.graphql({
            query: listBlogposts
        })
        setPosts(blogPostData.data.listBlogposts.items)
    }

    useEffect(()=>{
        fetchBlogPost()
      },[])

  return (
    <div>
    <h1 className='text-sky-500 text-2xl uppercase font-bold tracking-wide mt-6 mb-2'> News Feed </h1>
      {posts.map((post,index)=> (
        <Link to={`/blog/${post.id}`} key={index}>
          <div className=' cursor-pointer border-b border-gray-300 '>
          <h1 className='text-xl font-semibold'>{post.title}</h1>
          <p className='text-gray-500 mt-2 '>Author: {post.username}</p>
        </div>
        </Link>

      ))}

  </div>
  )
}

export default Home