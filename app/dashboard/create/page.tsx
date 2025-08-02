'use client'

import {
  CardHeader,
  CardTitle,
  Card,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/app/components/ui/button'
import { SubmitButton } from '@/app/components/General/Submitbutton'
import { handleSubmission } from '@/app/actions'
import { Sparkles } from 'lucide-react'
import React, { Suspense, useState, useRef } from 'react'

export default function CreateBlogRoute() {
  const [loading, setLoading] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  async function handleGenerateContent() {
    const title = titleRef.current?.value
    if (!title) return

    setLoading(true)

    try {
      const res = await fetch('/api/ollama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Write a detailed and engaging blog post on the topic: "${title}". Make it informative, well-structured, and suitable for a general audience.`,
        }),
      })

      const data = await res.json()
      if (contentRef.current) {
        contentRef.current.value = data.response
      }
    } catch (err) {
      console.error('Failed to generate content:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10 px-4">
      <Suspense fallback={<p>Waiting...</p>}>
        <Card className="max-w-2xl mx-auto shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-800">
              Create Post
            </CardTitle>
            <CardDescription className="text-zinc-600">
              Craft your story and share it with the world
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" action={handleSubmission}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  ref={titleRef}
                  name="title"
                  id="title"
                  required
                  type="text"
                  placeholder="Enter your post title..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Content</Label>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleGenerateContent}
                    disabled={loading}
                    className="transition-all duration-200 hover:bg-blue-100 hover:text-blue-900 text-sm font-medium"
                  >
                    <Sparkles className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? 'Generating...' : 'Generate using AI'}
                  </Button>
                </div>
                <Textarea
                  ref={contentRef}
                  name="content"
                  id="content"
                  required
                  placeholder="Write your blog content here..."
                  rows={10}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                />
              </div>

            
              <div className="flex flex-col gap-2">
                <Label htmlFor="url">Image URL</Label>
                <Input
                  name="url"
                  id="url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
                />
              </div>

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  )
}
