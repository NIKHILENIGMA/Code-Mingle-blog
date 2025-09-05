import { createElement, FC } from 'react'
import { useDispatch } from 'react-redux'
import { DraftingCompass, Notebook, Pencil } from '@/Utils/Icons'
import { NavLink, useNavigate, Link } from 'react-router'
import { NAV_LINKS, NOT_AUTHENTICATED_OPTIONS } from '@/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from '../Theme/mode-toggle'
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
import { Button } from '../ui/button'
import { authService } from '@/features/auth/services/authApiServices'

const Header: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user, loggedOut } = useAuthContext()
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
        loggedOut()

        // Show success message and redirect
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
    // Fixed Header Component
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent border-b shadow-xs backdrop-blur-md dark:bg-background/50 border-border/5">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-16">
          <div className="text-xl font-bold shrink-0">NODEDRAFTS</div>

          {/* Navigation with proper flex layout */}
          <nav className="items-center hidden space-x-6 md:flex">
            {NAV_LINKS.map((navOpt, index) => (
              <NavLink
                key={index}
                to={navOpt.path}
                className={({ isActive }: { isActive: boolean }): string =>
                  `${
                    isActive ? 'text-primary' : 'text-secondary-foreground'
                  } flex items-center space-x-2 font-serif font-medium hover:text-primary/80 transition-colors duration-200 ease-in-out whitespace-nowrap`
                }
              >
                <span>{createElement(navOpt.icon, { size: '18' })}</span>
                <span className="text-sm">{navOpt.name}</span>
              </NavLink>
            ))}

            {/* Write Dropdown with fixed positioning */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'ghost'}
                  className="flex items-center space-x-2 min-w-[80px] justify-center hover:bg-accent/50"
                >
                  <Pencil size={18} />
                  <span className="text-sm">Write</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 border shadow-lg z-60 bg-background/95 backdrop-blur-xs"
                side="bottom"
                align="start"
                sideOffset={8}
                avoidCollisions={true}
              >
                <DropdownMenuLabel>My Drafts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={handleCreateDraft}
                  >
                    <Notebook size={16} />
                    <span>New Draft</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                    <DraftingCompass size={16} />
                    <span>Edit Draft</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side with consistent spacing */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="items-center hidden space-x-3 lg:flex">
              <ModeToggle />
            </div>
            <div className="flex items-center space-x-3">
              <div className="items-center hidden space-x-3 lg:flex">
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="w-8 h-8 transition-all cursor-pointer hover:ring-2 hover:ring-primary/20">
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1661695423331-817b8aadd1a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          className="object-cover"
                        />
                        <AvatarFallback>
                          <AvatarImage
                            src="/no-avatar-user.png"
                            className="object-cover"
                            alt={`${user.firstName} ${user.lastName} Avatar`}
                          />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 border shadow-lg bg-background/95 backdrop-blur-xs"
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      avoidCollisions={true}
                    >
                      <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link to="/profile/me" className="w-full">
                            Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Link
                            to="/profile/settings/general-details"
                            className="w-full"
                          >
                            Settings
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        GitHub
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        Support
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center space-x-3">
                    {NOT_AUTHENTICATED_OPTIONS.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleClick(option?.to)}
                        variant={'secondary'}
                        size="sm"
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
