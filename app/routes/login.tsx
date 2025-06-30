import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Form, Link, useActionData, useNavigation } from "@remix-run/react"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { createUserSession, getUserId } from "~/lib/auth.server"
import { supabase } from "~/lib/supabase"
import { redirect } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "Login - KoalaCart.io" },
    { name: "description", content: "Sign in to your KoalaCart account" },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/dashboard")
  return {}
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" }
  }

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    if (!data.user) {
      return { error: "Authentication failed" }
    }

    // Check if user exists in our users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (!userData) {
      // Create user record if it doesn't exist
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          role: 'admin',
        })

      if (insertError) {
        return { error: "Failed to create user record" }
      }
    }

    return createUserSession(data.user.id, "/dashboard")
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)

  const isSubmitting = navigation.state === "submitting"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-4">
            <span className="text-2xl font-bold text-white">K</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">KoalaCart.io</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {actionData?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {actionData.error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
