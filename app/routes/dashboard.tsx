import { LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { Header } from "~/components/layout/header"
import { Sidebar } from "~/components/layout/sidebar"
import { getUser, requireUserId } from "~/lib/auth.server"

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUserId(request)
  const user = await getUser(request)
  
  if (!user) {
    throw new Response("User not found", { status: 404 })
  }

  return { user }
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
