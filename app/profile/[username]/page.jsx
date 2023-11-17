"use client"
import Profile from "@components/Profile";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


const OthersProfile = () => {
    const params = useParams();
    const username = params.username;
    const [posts, setPosts] = useState([]);
    useEffect( () =>{
      const fetchPosts = async () => {
        const res = await fetch(`/api/users/${username}/posts`);
        const data = await res.json()
  
        setPosts(data);
      };
  
      if(username) fetchPosts();
      
    },[])
  return (
    <Profile 
    name = {`${username}'s`}
    desc= {`Welcome to ${username}'s profile page`}
    data = {posts}
    />
  )
}

export default OthersProfile