"use client"
import { Mail, Phone, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'


const UserCard = () => {
    const { data: session, status } = useSession()
    
    if (status === 'loading') {
        return (
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="mt-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                </div>
            </div>
        )
    }
    
    if (status === 'unauthenticated' || !session?.user) {
        return (
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                    <User className="text-gray-400" size={32} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Not Logged In</h2>
                <p className="text-gray-600">Please sign in to view your profile</p>
            </div>
        )
    }
    
    const { user } = session
    
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            {/* Profile Header with Background */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24"></div>
            
            {/* Profile Content */}
            <div className="px-6 pb-6 relative">
                {/* Profile Image */}
                <div className="relative -top-12">
                    {user.image ? (
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto">
                            <Image
                            width={40}
                        height={40}
                      
                                src={user.image} 
                                alt={user.name || 'User'} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${user.name || 'User'}&background=random&color=fff&bold=true`
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg flex items-center justify-center mx-auto">
                            <span className="text-white text-2xl font-bold">
                                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                    
                    {/* Online Status Indicator */}
                    <div className="absolute bottom-2 right-1/4 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                
                {/* User Information */}
                <div className="text-center -mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {user.name || 'Anonymous User'}
                    </h2>
                    
                    {user.email && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                            <Mail size={16} />
                            <p className="text-sm">{user.email}</p>
                        </div>
                    )}
                    
                    {user.phone && (
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                            <Phone size={16} />
                            <p className="text-sm">{user.phone}</p>
                        </div>
                    )}
                    
                    {/* Role Badge */}
                    {user.role && (
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-4">
                            {user.role.toUpperCase()}
                        </div>
                    )}
                </div>
                
                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">24</div>
                        <div className="text-xs text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">₹12,500</div>
                        <div className="text-xs text-gray-500">Spent</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-gray-800">4.8</div>
                        <div className="text-xs text-gray-500">Rating</div>
                    </div>
                </div>
                
                {/* Member Since */}
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500">
                        Member since {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserCard