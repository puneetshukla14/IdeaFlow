'use client'

import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      router.push('/sign-in')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Hello</h1>

      <button
        onClick={handleLogout}
        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
      >
        Logout
      </button>
    </div>
  )
}
