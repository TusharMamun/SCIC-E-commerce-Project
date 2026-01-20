import BrandsShowcase from '@/components/Cards/BrandsShowcase'
import CategoryGrid from '@/components/Cards/CategoryGrid'
import FeaturedProducts from '@/components/Cards/FeaturedProducts '
import Testimonials from '@/components/Cards/Testimonials'
import Container from '@/components/Container'
import Hombanner from '@/components/Hombanner'
import LatestProducts from '@/components/ProductManagment/LatestProducts'
import { Button } from '@/components/ui/button'
import React from 'react'

const Homepage = () => {
  return (
 <Container>
<Hombanner></Hombanner>
<LatestProducts></LatestProducts>
<FeaturedProducts></FeaturedProducts>
<CategoryGrid></CategoryGrid>
<BrandsShowcase></BrandsShowcase>
<Testimonials></Testimonials>
 </Container>
  )
}

export default Homepage