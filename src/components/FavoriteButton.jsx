import { Heart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const FavoriteButton = () => {
  return (
 <>
   <Link className='group relative' href={"/cart"}>
   <Heart className='w-5 h-5 hover:text-shop-light-green  hoverEffect'></Heart>
<span className='absolute -top-0 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5  rounded-full text-xs font-semibold flex items-center justify-center '>0</span>
    </Link></>
  )
}

export default FavoriteButton