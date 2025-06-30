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
    { title: "Sign Up - KoalaCart.io" },
    { name: "description", content: "Create your KoalaCart account" },
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
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" }
  }

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    if (!data.user) {
      return { error: "Failed to create account" }
    }

    // Create user record in our users table
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        role: 'admin',
        first_name: firstName as string || null,
        last_name: lastName as string || null,
      })

    if (insertError) {
      return { error: "Failed to create user profile" }
    }

    return createUserSession(data.user.id, "/dashboard")
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export default function Signup() {
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
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Get started</CardTitle>
            <CardDescription>
              Create your account to start selling digital products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 6 characters
                </p>
              </div>

              {actionData?.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                  {actionData.error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
