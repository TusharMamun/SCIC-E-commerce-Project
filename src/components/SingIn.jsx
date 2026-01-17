'use client'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const SingIn = () => {
  return (
    <SignInButton mode="modal">
      <button className='text-sm font-semibold hover:text-dark-color text-light-color hover:cursor-pointer hoverEffect px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors'>
        Login / Sign Up
      </button>
    </SignInButton>
  )
}

export default SingIn