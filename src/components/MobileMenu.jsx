'use client'
import { AlignLeft } from 'lucide-react'
import React, { useState } from 'react'
import SideMenu from './SideMenu'


const MobileMenu = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    return (
        <>
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
                aria-label="Toggle menu"
            >
                <AlignLeft className='hover:text-dark-color hoverEffect hover:cursor-pointer w-6 h-6' />
            </button>
            
            <div className='md:hidden'>
                <SideMenu 
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>
        </>
    )
}

export default MobileMenu