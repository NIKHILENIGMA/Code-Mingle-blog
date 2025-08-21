import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { FaUserAlt } from 'react-icons/fa'
import { Pencil, Trash2Icon } from 'lucide-react'
import { FC, useState } from 'react'
import { SelectContent } from '@/components'
import { Checkbox } from '@/components'

const USER_TABLE_HEADERS = [
  'Name',
  'Username',
  'Role',
  'Status',
  'Last login',
  'Actions',
]

const USER_TABLE_DATA = [
  {
    name: 'Lulu Simpson',
    username: '@Eugenia',
    email: 'apte@hedos.net',
    avatar:
      'https://images.unsplash.com/photo-1543357530-d91dab30fa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmF3JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Susan Harper',
    username: '@Ray',
    email: 'itijukepa@uvahomi.pr',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Harry James',
    username: '@Ronald',
    email: 'cirawar@ba.eg',
    avatar:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Susie Brown',
    username: '@Chad',
    email: 'wujab@ub.dm',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Danny Rodriquez',
    username: '@Willie',
    email: 'jah@ir.sy',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Sam Walker',
    username: '@Floyd',
    email: 'herfiw@gal.gb',
    avatar:
      'https://images.unsplash.com/photo-1736194689767-9e3c4e7bd7f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Isabella Moreno',
    username: '@Leah',
    email: 'na@duz.so',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  {
    name: 'Hulda Watts',
    username: '@Henry',
    email: 'sefavrum@pi.edu',
    avatar:
      'https://images.unsplash.com/photo-1543132220-3ec99c6094dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8',
    role: 'USER',
    status: 'Active',
    lastLogin: '17:30',
  },
  // Add more user data as needed
]

const AdminUsers: FC = () => {
  const [searchUser, setSearchUser] = useState<string>('')
  // const [selectedUser, setSelectedUser] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const searchName = e.target.value.toString().toLocaleLowerCase()

    setSearchUser(searchName)
  }

  const handleCreateNewUser = () => {
    // Logic to handle creating a new user
    setIsModalOpen(true)
    console.log('Create New User clicked')
  }

  return (
    <div className="w-full p-10 bg-background text-secondary-foreground">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="mt-2 text-sm text-secondary-foreground/60">
          Manage system users and their permissions
        </p>
      </header>

      <section className="mb-6">
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search users..."
            className="w-64"
            value={searchUser}
            onChange={(e) => handleSearchChange(e)}
          />
          <Button variant={'default'} onClick={handleCreateNewUser}>
            <FaUserAlt />
            Add New User
          </Button>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="p-14">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new user account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2 text-sm text-secondary-foreground">
              <Label htmlFor="name">Full Name: </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                name="name"
                className="w-full bg-card"
              />
            </div>
            <div className="space-y-2 text-sm text-secondary-foreground">
              <Label htmlFor="username">Username: </Label>
              <Input
                id="username"
                type="text"
                name="username"
                autoComplete="off"
                placeholder="johndoe"
                className="w-full bg-card"
              />
            </div>
            <div className="space-y-2 text-sm text-secondary-foreground">
              <Label htmlFor="email">Email: </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                className="w-full bg-card"
              />
            </div>
            <div className="space-y-2 text-sm text-secondary-foreground">
              <Label htmlFor="password">Password: </Label>
              <Input
                id="password"
                name="password"
                autoComplete="off"
                type="password"
                placeholder="Password"
                className="w-full"
              />
            </div>
            <div className="space-y-2 text-sm text-secondary-foreground">
              <Label htmlFor="role">Role: </Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Rows" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select Role</SelectLabel>
                    <SelectItem value="MODERATOR">MODERATOR</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant={'outline'} onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant={'default'}>Create User</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <section className="rounded-lg shadow-sm bg-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y rounded-lg ">
            <thead className="text-secondary-foreground bg-card">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">
                  <Checkbox />
                </th>
                {USER_TABLE_HEADERS.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y bg-card">
              {USER_TABLE_DATA.map((user, index) => (
                <tr key={index + user.email} className="hover:bg-secondary/10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        className="object-cover w-10 h-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div>
                        <div className="text-sm font-medium text-secondary-foreground">
                          {user.name}
                        </div>
                        <div className="text-sm text-secondary-foreground/60">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      {user.lastLogin}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-2 whitespace-nowrap">
                    <Button variant={'outline'}>
                      <Pencil />
                    </Button>
                    <Button variant={'outline'}>
                      <Trash2Icon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t sm:px-6">
          <nav className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-foreground">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="">Previous</button>
              <button className="">Next</button>
            </div>
          </nav>
        </div>
      </section>
    </div>
  )
}

export default AdminUsers
