"use client";
import { postUser } from '@/actions/server/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Passwords don't match!",
        confirmButtonColor: '#10b981',
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      Swal.fire({
        icon: 'warning',
        title: 'Terms Required',
        text: 'You must agree to the terms and conditions!',
        confirmButtonColor: '#10b981',
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Call the server action
      const result = await postUser(formData);
      
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          html: `
            <div class="text-center">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Welcome to Amar Shop, ${formData.name}!</h3>
              <p class="text-gray-600">Your account has been created successfully.</p>
              <div class="mt-4 p-3 bg-emerald-50 rounded-lg">
                <p class="text-sm text-gray-700">Check your email for verification</p>
              </div>
            </div>
          `,
          confirmButtonText: 'Continue Shopping',
          confirmButtonColor: '#10b981',
          showCancelButton: true,
          cancelButtonText: 'Go to Dashboard',
          cancelButtonColor: '#6b7280',
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to home
            window.location.href = '/';
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Redirect to dashboard
            window.location.href = '/dashboard';
          }
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          image: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: result.message || 'Something went wrong. Please try again.',
          confirmButtonColor: '#10b981',
        });
      }
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during registration. Please try again.',
        confirmButtonColor: '#10b981',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a confirmation dialog before form submission (optional)
  const showConfirmDialog = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: 'Create Your Account?',
      html: `
        <div class="text-left">
          <p class="text-gray-600 mb-3">You're about to create an account with:</p>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>📝 Name: <strong>${formData.name || 'Not provided'}</strong></li>
            <li>📧 Email: <strong>${formData.email || 'Not provided'}</strong></li>
            <li>📱 Phone: <strong>${formData.phone || 'Not provided'}</strong></li>
          </ul>
          <p class="mt-3 text-sm text-gray-500">Make sure all information is correct before proceeding.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, create account!',
      cancelButtonText: 'Review details',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(e);
      }
    });
  };

  // Password strength checker function
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = checkPasswordStrength(formData.password);
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
  const strengthColor = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-emerald-500', 'text-emerald-600'][passwordStrength];
  const strengthBgColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-400', 'bg-emerald-500'][passwordStrength];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        
        {/* Left Side - Brand Section */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
            <div className="mb-8">
              <Link href="/" className="inline-block">
                <h2 className="text-3xl font-black text-shop-dark-green tracking-wider uppercase hover:text-shop-light-green transition-colors group">
                  Amar <span className='text-shop-light-green group-hover:text-shop-dark-green transition-colors'>Shop</span>
                </h2>
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Join Amar Shop
            </h1>
            
            <p className="text-gray-600 text-lg mb-10">
              Create your account and enjoy exclusive deals, faster checkout, and personalized shopping experiences.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-shop-light-green"></div>
                </div>
                <span className="text-gray-700">Free shipping on orders over ₹500</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-shop-light-green"></div>
                </div>
                <span className="text-gray-700">Exclusive member-only deals</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-shop-light-green"></div>
                </div>
                <span className="text-gray-700">Track orders and manage returns</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-shop-light-green"></div>
                </div>
                <span className="text-gray-700">Save multiple shipping addresses</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-shop-dark-green">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-shop-dark-green">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-shop-dark-green">100%</div>
                <div className="text-sm text-gray-600">Secure</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-shop-light-green to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-white" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
              <p className="text-gray-600">
                Join our shopping community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter your phone number with country code
                </p>
              </div>

              {/* image/Image Link Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image Link (Optional)
                </label>
                <div className="relative">
                  <imgIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="url" 
                    name="image"
                    placeholder="https://example.com/your-image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter a URL to your profile picture. If left blank, a default image will be used.
                </p>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-shop-light-green focus:border-shop-light-green outline-none transition-all hover:border-emerald-300"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Password Requirements with strength indicator */}
              {formData.password && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-700">Password Strength:</p>
                    <span className={`text-sm font-medium ${strengthColor}`}>
                      {strengthText}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`${strengthBgColor} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? 'text-emerald-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      At least 8 characters
                    </li>
                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      One uppercase letter
                    </li>
                    <li className={`flex items-center gap-2 ${/\d/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${/\d/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      One number
                    </li>
                    <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-600' : ''}`}>
                      <div className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(formData.password) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      One special character
                    </li>
                  </ul>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-shop-light-green border-gray-300 rounded focus:ring-shop-light-green"
                  required
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" className="text-shop-light-green hover:text-emerald-600 transition-colors font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-shop-light-green hover:text-emerald-600 transition-colors font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Newsletter */}
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="newsletter"
                  className="mt-1 w-4 h-4 text-shop-light-green border-gray-300 rounded focus:ring-shop-light-green"
                  defaultChecked
                />
                <label htmlFor="newsletter" className="text-sm text-gray-700">
                  Send me exclusive deals, new arrivals, and shopping tips
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                onClick={showConfirmDialog} // Use confirmation dialog
                className={`w-full bg-gradient-to-r from-shop-light-green to-emerald-500 hover:from-emerald-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <span>Creating Account...</span>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-200 hover:border-emerald-300 rounded-xl text-sm font-medium text-gray-700 hover:text-gray-900 transition-all group/login"
              >
                <span>Sign in to existing account</span>
                <ArrowRight className="group-hover/login:translate-x-1 transition-transform" size={16} />
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-4 h-4 bg-emerald-400 rounded-full"></div>
              <p className="text-xs text-gray-500">
                Secure registration with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}