"use client"
import { useParams } from "next/navigation"


const OthersProfile = () => {
    const params = useParams();
    const username = params.username;
  return (
    <div>OthersProfile</div>
  )
}

export default OthersProfile