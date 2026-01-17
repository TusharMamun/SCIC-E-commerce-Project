import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Logo = ({className}) => {
  return (
<Link href={"/"}>
<h2 className={cn("text-2xl text-shop-dark-green font-black tracking-wider uppercase  hover:text-shop-light-green hoverEffect group font-sans:",className)}>Amar <span className='text-shop-light-green  group-hover:text-shop-dark-green hoverEffect '>Shop</span></h2>

</Link>
  )
}

export default Logo