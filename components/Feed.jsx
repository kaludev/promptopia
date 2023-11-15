"use client"
import { useState,useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post =>(
        <PromptCard key={post._id}
        post = {post}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [Posts, setPosts] = useState([]);
  const [timeouts, setTimeouts] = useState(undefined);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagCLick = (e) => {
    setSearchText(e);
  }

  useEffect( () =>{
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json()


      setPosts(data);
    };
    const searchPosts = async () => {
      setTimeouts(undefined);
      const res = await fetch(`/api/prompt/search/${searchText}`);
      const data = await res.json()

      setPosts(data);
    }
    console.log()
    if(searchText.length > 0){
      if(timeouts){
        clearTimeout(timeouts);
      }
      setTimeouts(setTimeout(searchPosts, 400));
    }else{
      fetchPosts();
    }
  },[searchText])
  return (
    <section className='feed' >
      <form className='relative w-full flex-center'>
        <input type="text"
        placeholder='Search for a tag or username'
        value={searchText}
        onChange={handleSearchChange} 
        required
        className='search_input peer'/>
      </form>
      <PromptCardList
        data = {Posts}
        handleTagClick ={handleTagCLick}
        />
    </section>
  )

}

export default Feed