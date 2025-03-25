import { BellIcon, HomeIcon, UserIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/nextjs'

import { currentUser } from '@clerk/nextjs/server'
import { ThemeToggleButton } from '@/features/theme-toggle-button'

export const DesktopNavbar = async () => {
  const user = await currentUser()

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggleButton />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ??
                user.emailAddresses[0].emailAddress.split('@')[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Sign In</Button>
        </SignInButton>
      )}
    </div>
  )
}
