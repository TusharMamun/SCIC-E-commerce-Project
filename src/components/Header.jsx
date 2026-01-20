import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import MobileMenu from './MobileMenu'
import Link from 'next/link'
import LogingButton from './Auth/LogingButton'
import Usercard from './Cards/Usercard'
import AuthComponent from './Auth/AuthComponent'

const Header = () => {
  return (
    <header className='bg-white py-5'>
      <Container className="flex items-center justify-between text-light-color">
        <div className='w-auto md:1/3 flex items-center gap-2.5 justify-start md:gap-0'>
          <MobileMenu/>
          <Logo/>
        </div>
        
        <HeaderMenu/>
        
        <div className='w-auto md:1/3 flex items-center justify-end gap-5'>
          <SearchBar/>
          <CartIcon/>
          <FavoriteButton/>
   
          
          {/* Register and Login buttons */}
        <AuthComponent></AuthComponent>
        </div>
      </Container>
    </header>
  )
}

export default Header