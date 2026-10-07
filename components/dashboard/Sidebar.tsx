'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUser } from '@/lib/hooks/useUser'

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  
  const links = [
    { href: '/dashboard', label: 'Overview' },
    { href: '/dashboard/invitations', label: 'My Invitations' },
    { href: '/dashboard/settings', label: 'Settings' }
  ]
  
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold text-gray-900">Wedding Invitation</h1>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-lg px-4 py-2 text-sm font-medium ${
              pathname === link.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className="border-t p-4">
        <div className="rounded-lg bg-gray-50 px-4 py-3">
          <p className="text-xs font-medium text-gray-500">Tier Anda</p>
          <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
            {user?.tier || 'Free'}
          </p>
          {user?.tier === 'free' && (
            <Link
              href="/dashboard/upgrade"
              className="mt-2 block text-xs font-medium text-blue-600 hover:text-blue-500"
            >
              Upgrade ke Premium →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
