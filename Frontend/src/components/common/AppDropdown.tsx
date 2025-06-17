import { FC, ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

interface AppDropdownProps {
  trigger: ReactNode
  children: ReactNode
}

/**
 * AppDropdown component that wraps the Radix UI DropdownMenu
 * @component
 * @description
 * AppDropdown is a reusable component that provides a dropdown menu functionality.
 * It uses Radix UI's DropdownMenu components to create a customizable dropdown.
 * It accepts a trigger element and children elements that will be displayed in the dropdown.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.trigger - The element that triggers the dropdown
 * @param {ReactNode} props.children - The content of the dropdown
 *
 * @example
 * <AppDropdown trigger={<Button>Open Menu</Button>}>
 *   <DropdownMenuItem onClick={() => console.log('Item 1 clicked')}>
 *     Item 1
 *   </DropdownMenuItem>
 *   <DropdownMenuItem onClick={() => console.log('Item 2 clicked')}>
 *     Item 2
 *   </DropdownMenuItem>
 * </AppDropdown>
 *
 * @returns {JSX.Element} A dropdown menu with the specified trigger and content
 */

const AppDropdown: FC<AppDropdownProps> = ({ trigger, children }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AppDropdown
