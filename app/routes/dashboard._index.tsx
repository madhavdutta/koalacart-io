import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { getUser, requireUserId } from "~/lib/auth.server"
import { supabase } from "~/lib/supabase"
import { formatCurrency } from "~/lib/utils"

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - KoalaCart.io" },
    { name: "description", content: "Your KoalaCart dashboard overview" },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await getUser(request)

  // Get dashboard stats
  const { data: products } = await supabase
    .from('products')
    .select('id, status')
    .eq('user_id', userId)

  const { data: orders } = await supabase
    .from('orders')
    .select('id, status, total_amount')
    .eq('user_id', userId)

  const { data: customers } = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', userId)

  const stats = {
    totalProducts: products?.length || 0,
    activeProducts: products?.filter(p => p.status === 'active').length || 0,
    totalOrders: orders?.length || 0,
    totalRevenue: orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0,
    totalCustomers: customers?.length || 0,
  }

  return { user, stats }
}

export default function Dashboard() {
  const { user, stats } = useLoaderData<typeof loader>()

  const displayName = user.first_name && user.last_name 
    ? `${user.first_name} ${user.last_name}`
    : user.email.split('@')[0]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {displayName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-gray-500">
              {stats.activeProducts} active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with these common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Package className="mr-2 h-4 w-4" />
              Create New Product
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              View Checkout Pages
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Invite Affiliates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Product updated</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New affiliate joined</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
