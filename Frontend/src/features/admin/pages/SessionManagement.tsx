import { FC, useState } from 'react'
import {
  Button,
  Input,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components'
import { Checkbox } from '@/components'
import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import { SESSION_DATA } from '@/constants'

const SESSION_HEADER = [
  'Session ID',
  'User Id',
  'Browser Info',
  'IP Address',
  'Status',
  'Access Token',
  'Refresh Token',
]

const SessionManagement: FC = () => {
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsToShow, setRowsToShow] = useState<number>(5)
  const [searchSession, setSearchSession] = useState<string>('')

  const totalPages = Math.ceil(SESSION_DATA.length / rowsToShow)
  const startIndex = (currentPage - 1) * rowsToShow
  const endIndex = startIndex + rowsToShow
  const filteredSessions = SESSION_DATA.filter((session) =>
    Object.values(session).some((value) =>
      value.toString().toLowerCase().includes(searchSession),
    ),
  )
  const paginatedData = filteredSessions.slice(startIndex, endIndex)

  const handleSelectAll = () => {
    if (selectedSessions.length === SESSION_DATA.length) {
      setSelectedSessions([])
    } else {
      setSelectedSessions(SESSION_DATA.map((session) => session.id))
    }
  }

  const handleRowCheckboxChange = (id: string) => {
    if (selectedSessions.includes(id)) {
      setSelectedSessions(
        selectedSessions.filter((sessionId) => sessionId !== id),
      )
    } else {
      setSelectedSessions([...selectedSessions, id])
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchSession = e.target.value.toString().toLocaleLowerCase()
    setSearchSession(searchSession)
    setCurrentPage(1)
  }

  return (
    <div className="w-full h-full p-10 text-secondary-foreground bg-background">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Session Management</h1>
        <p className="text-secondary-foreground/70">
          View and manage all active login sessions across devices
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search sessions..."
            onChange={handleSearchChange}
            className="w-full py-2 pl-10 pr-4 border rounded-lg bg-card text-secondary-foreground focus:outline-hidden focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {/* Filter */}
        <div className="flex items-center space-x-4">
          <Select
            onValueChange={(value) => {
              setRowsToShow(Number(value))
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rows" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>No of rows</SelectLabel>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select
            onValueChange={(value) => {
              // Handle column selection logic here
              console.log(`Selected column: ${value}`)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Columns" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sessions Columns</SelectLabel>
                <SelectItem value="user-id">User Id</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blueberry">Expired</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative w-full rounded-lg shadow-md bg-card">
        <table className="min-w-full overflow-x-auto border divide-y">
          <thead className="bg-card">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-primary">
                <Checkbox
                  checked={selectedSessions.length === SESSION_DATA.length}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {SESSION_HEADER.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 font-medium tracking-wider text-left uppercase text-md text-secondary-foreground whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-x-auto divide-y text-secondary-foreground/70 hover:bg-card/20">
            {paginatedData.slice(0, rowsToShow).map((session, index) => (
              <tr
                key={session.id + index}
              className="odd:bg-background even:bg-card"
              >
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <Checkbox
                    checked={selectedSessions.includes(session.id)}
                    onCheckedChange={() => handleRowCheckboxChange(session.id)}
                  />
                </td>
                {Object.entries(session).map(([key, value], idx) => (
                  <td
                    key={idx + value}
                    className="px-6 py-4 text-sm truncate text-start whitespace-nowrap"
                  >
                    {key === 'access' || key === 'refresh' ? (
                      `${value.toString().slice(0, 19)}...`
                    ) : key === 'status' ? (
                      <span
                        className={`inline-flex px-2 text-xs font-semibold leading-5 border rounded-full ${
                          value === 'active'
                            ? 'text-green-800 bg-green-100 border-green-700'
                            : 'text-red-800 bg-red-100 border-red-700'
                        }`}
                      >
                        {value === 'active' ? 'Active' : 'Expired'}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}

                <td>
                  <Button
                    variant="outline"
                    className="px-3 py-1 rounded-md text-secondary-foreground hover:bg-card/20"
                    onClick={() => {
                      // Handle session management actions here
                      console.log(`Manage session: ${session.id}`)
                    }}
                  >
                    Manage
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end p-4">
          <Pagination className="w-1/4">
            <PaginationContent>
              <PaginationItem
                className={Number(currentPage) == 1 ? 'cursor-not-allowed' : ''}
              >
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                />
              </PaginationItem>
              {[...Array(totalPages)].slice(0, totalPages).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink>
                    <Button
                      variant={'outline'}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === index + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'text-secondary-foreground hover:bg-card/20'
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(currentPage + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* </div> */}
      </div>
    </div>
  )
}

export default SessionManagement
