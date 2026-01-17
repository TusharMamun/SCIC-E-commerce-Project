import ProductCard from '@/components/Cards/ProductCard'
import React from 'react'

const loading = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
        {
            [...Array(12)].map((_,index)=><ProductCard key={index}></ProductCard>)
        }
        
     </div>
  )
}

export default loading
