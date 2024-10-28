import React from 'react'
import { useGetPostsQuery } from '../features/api/postApiSlice'
import { Link } from 'react-router-dom';

const HomePage = () => {

    const {data, isLoading, isError, error} = useGetPostsQuery();
    if(isError) return <h2>Something went wrong{error?.data?.message}</h2>
       
    
    if(isLoading) {
        return <h1>Loading...</h1>

    }
    
    // console.log(data.data);

  return (
    <div>
        {/* <p>{data.content}</p> */}
      {data.length >0 && data.map(post => (
        <div>
             <Link to ={`/post/${post._id}`}>
            {post.content}
        </Link>
        </div>
       
      ))}
    </div>
  )
}

export default HomePage
