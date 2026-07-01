'use client'

import { useEffect, useState } from 'react'

export default function PWARegister() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // التحقق من أننا في المتصفح
    if (typeof window === 'undefined') {
      return
    }
    
    // تعطيل Service Worker تماماً في وضع التطوير
    // لأن Next.js Development Server يسبب طلبات متكررة
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    
    if (isDevelopment) {
      console.log('Service Worker registration disabled in development mode')
      return
    }
    
    // تسجيل Service Worker فقط في الإنتاج
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => {
          console.log('Service Worker registered:', registration)
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error)
        })
    }
  }, [])

  // لا نعيد أي شيء حتى يتم تحميل المكون على العميل
  if (!isClient) {
    return null
  }

  return null
}
