import { API } from 'aws-amplify';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getBlogpost } from '../graphql/queries';

const Id = () => {
  const params = useParams();
  const {id} = params;
  const [myPost, setMyPost] = useState([]);
  const [coverImage, setCoverImage] = useState(null)
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

  useEffect(()=> {
     updateCoverImage()
  },[])

  async function updateCoverImage(){
    if(myPost.coverImage){
      const imageKey = await Storage.get(myPost.coverImage)
      setCoverImage(imageKey)
    }
  }

  return (
<div>
<h1 className='text-sky-500 text-2xl uppercase font-bold tracking-wide mt-6 mb-2'> Vlog Details </h1>
   {
     coverImage && (
       <img src={coverImage} />
     )
   }
    <h1 className=' text-2xl font-semibold mt-4 tracking-wide'>
       Title: {myPost?.title}
    </h1>
    <p className=' text-sm font-light my-4'> Author: {myPost?.username} </p>
  <div className='mt-8'>
  <p reactMarkdown='prose '>Content: {myPost?.content} </p>
  </div>
  </div>
  )
}

export default Id