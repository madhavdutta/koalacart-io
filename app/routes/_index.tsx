import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { ArrowRight, Check, Star } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { getUserId } from "~/lib/auth.server"
import { redirect } from "@remix-run/node"

export const meta: MetaFunction = () => {
  return [
    { title: "KoalaCart.io - Digital Selling Platform" },
    { name: "description", content: "The complete platform for selling digital products, managing affiliates, and growing your online business." },
  ]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/dashboard")
  return {}
}

export default function Index() {
  const features = [
    "Unlimited digital products",
    "Advanced affiliate management",
    "Real-time analytics",
    "Custom checkout pages",
    "Automated email delivery",
    "Coupon & discount system",
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Course Creator",
      content: "KoalaCart helped me scale my online course business to 6 figures in just 8 months!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Digital Marketer",
      content: "The affiliate management system is incredible. My partners love how easy it is to promote my products.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Software Developer",
      content: "Finally, a platform that handles everything I need for selling digital products. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">KoalaCart.io</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Sell Digital Products
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Like a Pro
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The complete platform for selling digital products, managing affiliates, and growing your online business. 
            Everything you need in one powerful, easy-to-use platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From product creation to affiliate management, we've got you covered with powerful features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by creators worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful entrepreneurs using KoalaCart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription>"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to start selling?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of creators who trust KoalaCart to power their digital business.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="ml-2 text-xl font-bold">KoalaCart.io</span>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2024 KoalaCart.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
