import { Form, useLoaderData } from "@remix-run/react"
import { Search, Bell, User, LogOut } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

interface HeaderProps {
  user: {
    id: string
    email: string
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  }
}

export function Header({ user }: HeaderProps) {
  const displayName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}`
    : user.email

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products, orders, customers..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </Button>

        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            {user.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={displayName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User className="h-4 w-4 text-white" />
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        <Form action="/logout" method="post">
          <Button variant="ghost" size="icon" type="submit">
            <LogOut className="h-5 w-5" />
          </Button>
        </Form>
      </div>
    </header>
  )
}
