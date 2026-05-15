'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Phone, Mail, User, Check } from 'lucide-react'
import { useUserStore } from '@/store/userStore'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

type AuthMode = 'login' | 'signup'
type AuthStep = 'phone' | 'otp' | 'details'

export default function AuthPage() {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)
  const user = useUserStore((state) => state.user)

  const [mode, setMode] = useState<AuthMode>('login')
  const [step, setStep] = useState<AuthStep>('phone')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Form data
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // OTP countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Validate phone number
  const isValidPhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone)
  }

  // Validate email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Handle phone submission
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidPhone(phoneNumber)) {
      toast.error('Please enter a valid 10-digit mobile number')
      return
    }

    setIsLoading(true)

    try {
      // Simulate sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('OTP sent to your mobile number!')
      setStep('otp')
      setCountdown(30) // 30 seconds countdown
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  // Handle OTP verification
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP')
      return
    }

    setIsLoading(true)

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (mode === 'login') {
        // Login successful
        const mockUser = {
          id: 'user-' + Date.now(),
          email: `${phoneNumber}@phone.com`,
          phone: phoneNumber,
          name: 'User',
          addresses: [],
          wishlist: [],
          loyaltyPoints: 0,
          createdAt: new Date(),
          lastLogin: new Date(),
        }

        setUser(mockUser)
        toast.success('Login successful!')
        router.push('/')
      } else {
        // Move to details step for signup
        setStep('details')
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signup details submission
  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Please enter your name')
      return
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      // Simulate account creation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser = {
        id: 'user-' + Date.now(),
        email: email,
        phone: phoneNumber,
        name: name,
        addresses: [],
        wishlist: [],
        loyaltyPoints: 100, // Welcome bonus
        createdAt: new Date(),
        lastLogin: new Date(),
      }

      setUser(mockUser)
      toast.success('Account created successfully! Welcome bonus: 100 points 🎉')
      router.push('/')
    } catch (error) {
      toast.error('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('OTP resent successfully!')
      setCountdown(30)
      setOtp(['', '', '', '', '', ''])
    } catch (error) {
      toast.error('Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  // Go back
  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone')
      setOtp(['', '', '', '', '', ''])
    } else if (step === 'details') {
      setStep('otp')
    }
  }

  // Switch mode
  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setStep('phone')
    setPhoneNumber('')
    setOtp(['', '', '', '', '', ''])
    setName('')
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            Grahini Mart
          </h1>
          <p className="text-gray-600 mt-2">थोक दाम में किराना</p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          {/* Back Button */}
          {step !== 'phone' && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {step === 'phone' && 'Enter your mobile number to continue'}
              {step === 'otp' && 'Enter the OTP sent to your mobile'}
              {step === 'details' && 'Complete your profile'}
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'phone'
                  ? 'bg-primary-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {step === 'phone' ? '1' : <Check className="w-5 h-5" />}
            </div>
            <div className="w-12 h-1 bg-gray-200">
              <div
                className={`h-full bg-primary-500 transition-all duration-300 ${
                  step !== 'phone' ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === 'otp'
                  ? 'bg-primary-500 text-white'
                  : step === 'details'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step === 'details' ? <Check className="w-5 h-5" /> : '2'}
            </div>
            {mode === 'signup' && (
              <>
                <div className="w-12 h-1 bg-gray-200">
                  <div
                    className={`h-full bg-primary-500 transition-all duration-300 ${
                      step === 'details' ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === 'details'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  3
                </div>
              </>
            )}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {/* Step 1: Phone Number */}
            {step === 'phone' && (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handlePhoneSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                      maxLength={10}
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    We'll send you an OTP to verify your number
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Send OTP
                </Button>
              </motion.form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleOtpSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter 6-digit OTP sent to +91 {phoneNumber}
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-600">
                      Resend OTP in <span className="font-bold text-primary-600">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Verify OTP
                </Button>

                {/* Demo Note */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800 text-center">
                    <strong>Demo Mode:</strong> Enter any 6 digits to verify
                  </p>
                </div>
              </motion.form>
            )}

            {/* Step 3: User Details (Signup only) */}
            {step === 'details' && mode === 'signup' && (
              <motion.form
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleDetailsSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isLoading}
                >
                  Complete Signup
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Switch Mode */}
          {step === 'phone' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={switchMode}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </button>
              </p>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          <p>By continuing, you agree to our</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <a href="/terms" className="text-primary-600 hover:underline">
              Terms of Service
            </a>
            <span>•</span>
            <a href="/privacy" className="text-primary-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
