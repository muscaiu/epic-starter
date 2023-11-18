import { Link, useMatches } from '@remix-run/react'
import React from 'react'
import { useOptionalUser } from '#app/utils/user.ts'
import UserDropdown from '../nav/UserDropdown.tsx'
import { SearchBar } from '../search-bar.tsx'
import { Button } from '../ui/button.tsx'
import ThemeSwitch from './ThemeSwitch.tsx'

export default function Nav({ data }: { data: any }) {
  const user = useOptionalUser()
  const matches = useMatches()

  const isOnSearchPage = matches.find(m => m.id === 'routes/users+/index')
  const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />

  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
        <Link to="/">
          <div className="font-bold mx-10">Home</div>
        </Link>
        <Link to="/dashboard">
          <div className="font-bold">Dashboard</div>
        </Link>
        <div className="ml-auto hidden max-w-sm flex-1 sm:block">
          {searchBar}
        </div>
        <div className="flex items-center gap-10">
          {user ? (
            <UserDropdown />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
        <ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
        <div className="block w-full sm:hidden">{searchBar}</div>
      </div>
    </nav>
  )
}
