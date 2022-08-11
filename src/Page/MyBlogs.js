import { API, Auth } from 'aws-amplify';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deleteBlogpost } from '../graphql/mutations';
import { blogsByUsername } from '../graphql/queries';

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);

  const fetchPost = async ()=> {
    const {username} = await Auth.currentAuthenticatedUser();
    const postData = await API.graphql({
      query: blogsByUsername,
      variables: {username}
    })
    setPosts(postData.data.blogsByUsername.items)
 }
  useEffect(() => {
    fetchPost()
  }, [])

async function deletePost(id) {
  await API.graphql({
    query: deleteBlogpost,
    variables: {input: {id}},
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })
  fetchPost();
}

  return (
 <>
      <div>
      {
        posts.map((post,index)=>(
          <div
          key={index}
          className='py-8 px-8 max-w-xxl mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-1 sm:flex 
          sm:items-center sm:space-y-0 sm:space-x-6 mb-2'
        >
        <div
          key={index}
          className='py-8 px-8 max-w-xxl mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-1 sm:flex 
          sm:items-center sm:space-y-0 sm:space-x-6 mb-2'
        >
            <div className='space-y-0.5'>
              <p className='text-lg text-black font-semibold'>Title:{post.title}</p>
              <p className='text-slate-500 font-medium'>
                Created on: {moment(post.createdAt).format("ddd, MMM hh:mm a")}
              </p>
            </div>
            <div
              className='sm:py-4 sm:flex 
              sm:items-center sm:space-y-0 sm:space-x-1'
            >
              <p
                className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
                hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
                focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
              >
                <Link to={`/edit-post/${post.id}`}>Edit Post</Link>
              </p>
              <p
                className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
               hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
                 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
              >
                <Link to={`/blog/${post.id}`}>View Post</Link>
              </p>
              <button
                className='text-sm mr-4 text-red-500 border-red-500'
                onClick={() => deletePost(post.id)}
              >
                Delete Post
              </button>
            </div>
        </div>
        </div>
        ))
      }
      </div> 
    </>
  )
}

export default MyBlogs     