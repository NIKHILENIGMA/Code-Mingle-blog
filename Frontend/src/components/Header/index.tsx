import { createElement, FC } from 'react'
import { useDispatch } from 'react-redux'
import { DraftingCompass, Notebook, Pencil } from '@/Utils/Icons'
import SearchBar from '@/features/drafts/components/Drafts/SearchBar'
import { NavLink, useNavigate } from 'react-router-dom'
import { NAV_LINKS, NOT_AUTHENTICATED_OPTIONS } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from '../DarkMode/mode-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useDraftMutations } from '@/features/drafts/hooks/useDraftMutations'
import { toast } from 'sonner'
import { setSelectedDraft } from '@/features/drafts/slices/draftSlice'
import { useAuthContext } from '@/features/auth/hooks/useAuthContext'
// import { useLogout } from '@/features/auth/hooks/useLogout'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { authService } from '@/features/auth/services/authApiServices'

const Header: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user, userLoggedOut } = useAuthContext()
  const { createDraftMutation } = useDraftMutations()

  const handleClick = (to: string) => {
    navigate(to)
  }

  const handleCreateDraft = async () => {
    try {
      const response = await createDraftMutation.mutateAsync()

      if (response?.draftId) {
        navigate(`/draft/${response.draftId}`)
        dispatch(
          setSelectedDraft({
            selectedDraft: {
              id: response.draftId,
              title: '',
              content: '',
              image: '',
            },
          }),
        )
        toast.success('New Draft created successfully')
      } else {
        toast.error('Failed to create draft: Missing draftId')
      }
    } catch (error) {
      toast.error('Failed to create draft')
      console.error('Error creating draft:', error)
    }
  }

  const handleLogout = async () => {
    try {
      const { success, message } = await authService.logout()
      if (success) {
        userLoggedOut()
        // Clear localStorage for persistent login
        localStorage.removeItem('isPersistent')
        toast.success(message || 'Logged out successfully')
        navigate('/')
      } else {
        toast.error(message || 'Failed to log out')
      }
    } catch (error) {
      throw new Error((error as string) || 'Failed to log out')
    }
  }

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-transparent shadow-sm backdrop-blur-md dark:bg-background/50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">NODEDRAFTS</div>
          {/* Added z-index to nav to ensure dropdown stays above other elements */}
          <nav className="hidden space-x-8 md:flex relative z-[51]">
            {NAV_LINKS.map((navOpt, index) => (
              <NavLink
                key={index}
                to={navOpt.path}
                className={({ isActive }: { isActive: boolean }): string =>
                  `${
                    isActive ? 'text-primary' : 'text-secondary-foreground'
                  } flex items-center space-x-2 font-serif font-medium hover:text-primary/80 transition-colors duration-200 ease-in-out`
                }
              >
                <span>{createElement(navOpt.icon, { size: '18' })}</span>{' '}
                <span className="text-sm">{navOpt.name}</span>
              </NavLink>
            ))}
            {/* Dropdown for writing drafts */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className="relative z-[50]">
                  <Pencil size={18} /> <span>Write</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative w-48 z-[52]">
                <DropdownMenuLabel>My Drafts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleCreateDraft}
                  >
                    <Notebook /> New Draft
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer">
                    <DraftingCompass /> Edit Draft
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          {/* Right side of the header */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <div className="flex items-center pr-4 space-x-4">
              <SearchBar size={18} />
              <div className="hidden space-x-4 lg:flex">
                {isAuthenticated && user ? (
                  <div className="flex justify-start w-full">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage
                            src={user.avatar || '/no-avatar-user.png'}
                            className="border-[0.2rem] border-primary/70 rounded-full object-cover"
                          />
                          <AvatarFallback>
                            <AvatarImage
                              src="/no-avatar-user.png"
                              className="object-cover border rounded-full border-primary/70"
                              alt={`${user.firstName} ${user.lastName} Avatar`}
                            />
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Link to="/profile/me">Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to="/profile/settings/general-details">
                              Settings
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center justify-around space-x-3 text-xl">
                    {NOT_AUTHENTICATED_OPTIONS.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleClick(option?.to)}
                        variant={option?.variant}
                      >
                        {option?.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
