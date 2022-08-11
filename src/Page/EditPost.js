import { useEffect, useState, useRef } from "react";
import { API, Storage } from "aws-amplify";
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css";
import { updateBlogpost } from "../../src/graphql/mutations";
import { getBlogpost } from "../../src/graphql/queries";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";



const EditPost = () => {
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params;
    
    const [myPost, setMyPost] = useState([]);
    const getMyPost = async () => {
      const postData = await API.graphql({
          query: getBlogpost,
          variables: {id}
      })
      setMyPost(postData.data.getBlogpost)
  }
  useEffect(()=>{
      getMyPost();
    },[])
    
   if(!myPost) return null;
   function onChange(e) {
     setMyPost(()=> ({...myPost , [e.target.name]: e.target.value}))
   }

    const  {title, content } = myPost;
    async function updateCurrentPost() {
      if(!title || !content) return null;
      const updatePost = {
        id,
        content,
        title
      }
      await API.graphql({
        query: updateBlogpost,
        variables: { input: updatePost},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      navigate(`/blog`)
    }
    // const {title, content} = post;
    // async function updateCurrentPost() {
    //  if(!title|| !content) return;
    //  const postUpdated = {
    //      id,
    //      content,
    //      title
    //  };
    //   await API.graphql({
    //       query: updateBlogpost,
    //       variables: {input: postUpdated},
    //       authMood: "AMAZON_COGNITO_USER_POOLS"
    //   })
    //   navigate("/myblog")
    // }
  return (
    <div>
     <h1 className='text-3xl font-semibold uppercase tracking-wide mt-6 mb-2'>
        Edit post
      </h1>
      <input
        onChange={onChange}
        name='title'
        placeholder='Title'
        value={myPost.title}
        className='border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2'
      />
     <SimpleMDE
        value={myPost.content}
        onChange={(value) => setMyPost({ ...myPost, content: value })}
      />
           <button
        className='mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg'
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
    </div>
  )
}

export default EditPost