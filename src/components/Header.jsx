import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import SingIn from './SingIn'
import MobileMenu from './MobileMenu'
import { currentUser } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

const Header = async () => {
  const user = await currentUser()

  
  return (
    <header className='bg-white py-5 '>
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
          
          {/* Display UserButton if logged in, SingIn if not */}
          {user ? (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          ) : (
            <SingIn />
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header