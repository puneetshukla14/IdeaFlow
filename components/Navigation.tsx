// components/Navigation.tsx
'use client'

import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">Your App</Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard" className={pathname.startsWith('/dashboard') ? 'text-blue-600 font-medium' : 'hover:text-gray-900'}>
                Dashboard
              </Link>
              <Link href="/settings" className={pathname.startsWith('/settings') ? 'text-blue-600 font-medium' : 'hover:text-gray-900'}>
                Settings
              </Link>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  )
}