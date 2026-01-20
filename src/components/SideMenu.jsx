'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import { menuData } from '@/Constents/Data'
import Logo from './Logo'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import SocialMedia from './SocialMedia'
import { useOutsideClick } from '@/Hooks/useOutsideClick'


const SideMenu = ({ isOpen, onClose }) => {
    const pathname = usePathname()
    const sidebarRef = useRef(null) // Create a ref for the sidebar
    
    // Use the hook - it will call onClose when clicking outside sidebar
    useOutsideClick(sidebarRef, onClose)
    
    return (
        <>
            {/* Backdrop - covers entire screen */}
            <div 
                className={`fixed inset-0 z-40 bg-gradient-to-r from-black/60 via-black/40 to-black/20 backdrop-blur-lg transition-all duration-800 ease-in-out ${
                    isOpen 
                        ? "opacity-90 pointer-events-auto" 
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />
            
            {/* Sidebar Panel - separate element */}
            <div 
                ref={sidebarRef} // Attach the ref here
                className={`fixed top-0 left-0 h-screen z-50 min-w-72 max-w-96 bg-black p-8 border-r border-r-shop-light-green flex flex-col gap-6 transition-all duration-800 ease-in-out ${
                    isOpen 
                        ? "translate-x-0 opacity-100" 
                        : "-translate-x-full opacity-0"
                }`}
            >
                <div className='flex items-center justify-between gap-5'>
                    <Logo className="text-white text-lg" />
                    <button 
                        onClick={onClose} 
                        className='hover:text-shop-light-green hoverEffect p-1'
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Menu Items with smaller text */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="flex flex-col gap-2">
                        {menuData.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`text-sm py-2.5 px-3 rounded-lg transition-all duration-300 ${
                                    pathname === item.href 
                                        ? "text-shop-light-green bg-white/10 font-medium" 
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                }`}
                                onClick={onClose}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                    
                    {/* Social Media Section */}
                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Follow Us</p>
                        <SocialMedia />
                    </div>
                </div>
                
                {/* Footer */}
              
            </div>
        </>
    )
}

export default SideMenu