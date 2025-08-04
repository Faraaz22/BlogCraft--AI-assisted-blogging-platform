"use server"
import {prisma} from '@/app/utils/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/dist/server/api-utils'
import { redirect } from 'next/navigation'

export const revalidate =60;

export async function handleSubmission(formData : FormData) {

    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if(!user){
        return redirect('/api/auth/register')
    }

    const title = formData.get('title')
    const content = formData.get('content')
    const url = formData.get('url')

        const data = await prisma.blogPost.create({
            data:{
                title: title as string,
                content:content as string,
                imageUrl:url as string,
                authorId: user.id,
                authorImage:user.picture as string,
                authorName:user.given_name as string
            }
        })
        console.log(data.id)

        revalidatePath("/")
        return redirect("/dashboard")
    }

export async function generateContentAction(formData: FormData) {
  const prompt = formData.get('prompt')?.toString() || ''

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2', 
        prompt,
        stream: false,
      }),
    })

    const data = await response.json()
    return data.response
  } catch (err) {
    console.error('Ollama error:', err)
    return 'Error generating content'
  }
}