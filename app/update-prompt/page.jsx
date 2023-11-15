"use client"

import { useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams} from 'next/navigation'

import Form from '@components/Form'

const editPromptPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const params = useSearchParams();
  const promptId = params.get('id');
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })
  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
            prompt:data.prompt,
            tag:data.tag,
        });
    }

    if(promptId) getPromptDetails();
  },[promptId])
  const router = useRouter();
  const {data:session} = useSession();
  const editPrompt = async (e) => {
    e.preventDefault();
    
    if(!promptId) return alert("promptId is missing");
    setSubmitting(true);
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  )
}

export default editPromptPage