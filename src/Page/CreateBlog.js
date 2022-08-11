import React, { useRef } from 'react'
import { useState } from 'react'
// import { withAuthenticator } from '@aws-amplify/ui-react'
import {v4 as uuid} from 'uuid'
import {createBlogpost} from '../../src/graphql/mutations'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css";
import { useNavigate } from 'react-router-dom'
import { API, Storage } from 'aws-amplify'


const initialState = {title: "", content: ""}
const CreateBlog = () => {
    const [post, setPost] = useState(initialState);
    const {title, content} = post;
    let navigate = useNavigate();
    const [image, setImage] = useState(null);
    console.log("dhur bal", image)
    const imageFileInput = useRef(null);
    function onChange(e) {
       setPost(()=>({
         ...post, [e.target.name]:e.target.value
       }))
    }
  
    async function createNewPost() {
      if(!title || !content) return;
      const id = uuid();
      post.id = id
 
      if(image){
        const filename = `${image.name}_${uuid()}`
        post.coverImage = filename 
        await Storage.put(filename)
      }

       await API.graphql({
        query: createBlogpost,
        variables: {input: post},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      navigate(`/blog/${id}`)
    }

    async function uploadeImage () {
      imageFileInput.current.click()
    }
    function handleChange(e){
      const fileUploade = e.target.files[0]
      if(!fileUploade) return
      setImage(fileUploade)
    }



  return (
    <div className=' px-10 bg-slate-100 h-screen'>
        <h1 className="text-3xl font-semibold tracking-wide mt-6">Create Vlog</h1>
        <input 
          className=" border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500"
          placeholder="Title"
          name="title"
          value={post.title}
          onChange={onChange}
        />
        {
          image && (
            <img
              src={URL.createObjectURL(image)}
            />
          )
        }
        <SimpleMDE
          className=" w-auto"
          value={post.content}
          onChange={(value)=> setPost({...post, content: value})}
        />
        <input
          type="file"
          ref={imageFileInput}
          onChange={handleChange}
          className=" absolute w-0 h-0"
        />
        <button
         type="button"
         onClick={createNewPost}
         className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
        >
          Post
        </button>
        {"  "}
        <button
         type='button'
         onClick={uploadeImage}
         className='mb-4 bg-purple-600 text-white font-semebold px-8 py-2 rounded-lg'
        >
          Upload Cover Image
        </button>
    </div>
  )
}

export default CreateBlog