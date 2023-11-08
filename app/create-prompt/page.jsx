"use client"

import { useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const createPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  const router = useRouter();
  const {data:session} = useSession();
  const createPrompt = async (e) => {
    e.preventDefault();
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })
      if(res.ok){
        router.push('/')
      }
    }catch (e) {
      console.log(e);
    }finally {
      setSubmitting(false);
    }
  }
  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default createPrompt