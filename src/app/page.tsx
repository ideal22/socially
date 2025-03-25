'use client'

import { ThemeToggleButton } from '@/features/theme-toggle-button'
import { Button } from '@/shared/ui/button'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      <ThemeToggleButton />
    </div>
  )
}
