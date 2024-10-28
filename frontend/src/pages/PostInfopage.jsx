import React from 'react'
import { useGetPostInfoQuery } from '../features/api/postApiSlice'
import { useParams } from 'react-router-dom';

const PostInfopage = () => {

  // id-ga jor see loo helaa. page-ka main-ka wxa uso bixisay ayad u bixine o ah id

    const {id} = useParams();


    const {data, error, isError, isLoading} = useGetPostInfoQuery(id); // id-ga aa loo baasa
    
    if(isLoading){
        return <h1 className='bg-cyan-600'>Loading...🔃</h1>
    }
    if(isError) return <h2>Something went wrong {error?.data?.message}</h2>


  return (
    <div>
      <h1>{data?.content}</h1>
      
      <img src={data?.image} width={200} height={300} />
    </div>
  )
}

export default PostInfopage
