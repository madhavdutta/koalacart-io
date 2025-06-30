import { Link, useLocation } from "@remix-run/react"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  CreditCard,
  Tag,
  Webhook,
  UserCheck
} from "lucide-react"
import { cn } from "~/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Affiliates", href: "/dashboard/affiliates", icon: UserCheck },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Coupons", href: "/dashboard/coupons", icon: Tag },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <span className="text-sm font-bold text-white">K</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">KoalaCart</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
