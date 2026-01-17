import React from 'react'
import { Title } from './ui/Text'
import Link from 'next/link'
import Image from 'next/image'
import { banner_1 } from '@/images'

const Hombanner = () => {
  return (
    <div className='py-16 md:py-0 bg-shop-light-pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
      <div className='space-y-5'>
        <Title >Grab Up To 50% Off on <br /> Selected headphones</Title>
        <Link 
          href="/shop" 
          className="bg-shop-dark-green/90 text-white/90 px-5 py-2 font-semibold rounded-md text-sm hover:text-white hover:bg-shop-dark-green transition-all duration-300 hover:scale-105" 
        >
          Buy Now
        </Link>
      </div>
      <div>
        <Image src={banner_1}  alt='banner_1' className='hidden md:inline-flex w-96'/>
      </div>
    </div>
  )
}

export default Hombanner