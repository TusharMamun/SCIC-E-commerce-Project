"use client"
import {  signIn } from "next-auth/react"
import React from 'react'


const LogingButton = () => {
  return (
  <button  onClick={()=>signIn()}> Login</button>
  )
}

export default LogingButton