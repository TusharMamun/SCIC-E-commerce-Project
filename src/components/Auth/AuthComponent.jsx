'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import LogingButton from './LogingButton'
import Image from 'next/image'

const AuthComponent = () => {
    const { data: session, status } = useSession()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (status === 'loading') {
        return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
    }

    if (status === "authenticated" && session?.user) {
        const user = session.user
        const initials = user.name?.charAt(0) || user.email?.charAt(0) || 'U'
        
        return (
            <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    {/* Profile Avatar */}
                    {user.image ? (
                        <Image
                        width={40}
                        height={40}
                            src={user.image} 
                            alt={user.name || 'User'} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                            {initials}
                        </div>
                    )}
                    
                    {/* Dropdown Arrow */}
                    <svg 
                        className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border py-2 z-50">
                        {/* Add Product Button */}
                        <Link      
                            href="/addproduct" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            Add Product
                        </Link>
                        
                        {/* Manage Products Button */}
                        <Link 
                            href="/manageproduct" 
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            Manage Products
                        </Link>
                        
                        {/* Logout Button */}
                        <button
                            onClick={() => {
                                setIsDropdownOpen(false)
                                signOut({ callbackUrl: '/' })
                            }}
                            className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <Link 
                href="/register" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
                Register
            </Link>
            <LogingButton className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-dark transition-colors" />
        </div>
    )
}

export default AuthComponent