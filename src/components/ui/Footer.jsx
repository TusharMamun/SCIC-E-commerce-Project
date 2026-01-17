import React from 'react'
import Container from '../Container'
import FooterTop from '../FooterTop'
import Logo from '../Logo'
import SocialMedia from '../SocialMedia'
import { Subtext, Title, SubTitle } from './Text'
import { quickLinksData, categoriesData, productType } from '@/Constents/Data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-white border-t'>
      <Container>
        <FooterTop />
        
        {/* Main grid with gap between columns only */}
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
          
          {/* Company Info Section */}
          <div>
            <Logo />
            <div className="mt-4">
              <Subtext>
                Discover curated furniture collections at Shopcartyt, blending
                style and comfort to elevate your living spaces.
              </Subtext>
            </div>
            <div className="mt-4">
              <SocialMedia
                className="text-darkColor/60"
                iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
                tooltipClassName="bg-darkColor text-white"
              />
            </div>
          </div>

          {/* Quick Links Section - No internal gap */}
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="mt-4">
              {quickLinksData.map((item, index) => (
                <li key={index} className="mb-2 last:mb-0">
                  <Link 
                    href={item.href} 
                    className="text-gray-600 hover:text-shop-dark-green transition-colors inline-block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section - No internal gap */}
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="mt-4">
              {categoriesData.map((item, index) => (
                <li key={index} className="mb-2 last:mb-0">
                  <Link 
                    href={`/category/${item.href}`} 
                    className="text-gray-600 hover:text-shop-dark-green transition-colors inline-block capitalize"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Types Section - No internal gap */}
          <div>
            <SubTitle>Product Types</SubTitle>
            <ul className="mt-4 mb-6">
              {productType.map((item, index) => (
                <li key={index} className="mb-2 last:mb-0">
                  <Link 
                    href={`/products?type=${item.value}`} 
                    className="text-gray-600 hover:text-shop-dark-green transition-colors inline-block capitalize"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter Subscription */}
            <div>
              <SubTitle>Stay Updated</SubTitle>
              <div className="mt-4">
                <Subtext className="text-sm mb-3">
                  Subscribe to our newsletter for the latest updates
                </Subtext>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-shop-dark-green focus:border-transparent"
                  />
                  <button className="bg-shop-dark-green text-white px-4 py-2 rounded-r-md text-sm hover:bg-shop-dark-green/90 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-6 pb-8 border-t text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Shopcartyt. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer