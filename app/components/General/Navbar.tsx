'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { buttonVariants } from '@/app/components/ui/button'
import { FiHome, FiGrid } from 'react-icons/fi'

type User = {
  given_name?: string
  picture?: string
} | null

export function Navbar({ user }: { user: User }) {
  return (
    <nav className="bg-white/30 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Go to homepage">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white hover:text-blue-600 transition-colors">
              Blog<span className="text-blue-600">Craft</span>
            </h1>
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <FiHome className="w-4 h-4" />
              Home
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <FiGrid className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right - Auth Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.picture && (
                <div className="relative group flex items-center gap-1 cursor-pointer">
                  <Image
                    src={user.picture}
                    alt={`${user.given_name ?? 'User'}'s profile picture`}
                    width={36}
                    height={36}
                    className="rounded-full border border-gray-300 object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 mt-10 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap">
                    {user.given_name}
                  </div>
                </div>
              )}
              <LogoutLink className={buttonVariants({ size: 'sm' })}>Logout</LogoutLink>
            </>
          ) : (
            <>
              <LoginLink className={buttonVariants({ size: 'sm' })}>Login</LoginLink>
              <RegisterLink className={buttonVariants({ variant: "secondary", size: 'sm' })}>
                Signup
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
