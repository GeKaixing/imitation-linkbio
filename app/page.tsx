import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { LineChart } from "@/components/AnalyticsDashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Lifetime Deal Banner */}
      <div className="bg-black text-white">
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-center py-2 px-4">
          <span className="text-sm font-medium">
            <Badge variant="secondary" className="bg-pink-500 text-white mr-2">Lifetime Deal</Badge>
            $30 for lifetime access to Linkie Plus
          </span>
        </div>

        <header className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔗</span>
            </div>
            <span className="text-xl font-bold">Linkie</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-white">
              Log in
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href={'/playground'}>
                Get your Linkie
              </Link>
            </Button>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-orange-200 text-orange-600">
              <span className="mr-2">🏆</span>
              FEATURED ON Product Hunt
              <span className="ml-2 font-bold">233</span>
            </Badge>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Like Linktree, but<br />
            <span className="text-gray-800">sexier and unbranded</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Claim your free link in bio page to showcase everything you do in one place.
          </p>

          <div className="flex items-center justify-center bg-white rounded-full border border-gray-200 p-2 max-w-md mx-auto shadow-lg">
            <span className="text-gray-500 pl-4">linkie.bio/</span>
            <Input
              placeholder="username"
              required
              type="text"
              className="border-0 focus-visible:ring-0 bg-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              <Link href={'/playground'}>
                Claim it
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Phone Mockup Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <div className="relative">
                <div className="bg-gray-100 rounded-3xl p-8 shadow-2xl max-w-sm mx-auto">
                  <div className="bg-black rounded-2xl p-6 text-white relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm">12:27</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-black text-2xl">🍕</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-1">The Neighbour</h3>
                      <p className="text-gray-400 text-sm">Restaurant in NYC 📍</p>
                      <p className="text-gray-400 text-xs mt-2">
                        Taste the delicacy of the mediterranean. 🌊<br />
                        Open daily from 12PM to 1AM.
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700 mt-4 text-sm">
                        Reserve Table
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-800 rounded-lg p-3 text-sm">
                        📍 Explore Our Menu
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">📍 40°41'46.7"N 73°58...</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-4 text-xs text-gray-400">
                      theneighbour.link
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="flex gap-2 mb-6 justify-center lg:justify-start flex-wra">
                <Badge className="bg-amber-100 text-amber-800">Personal Brand</Badge>
                <Badge className="bg-blue-100 text-blue-800">UGC Creator</Badge>
                <Badge className="bg-green-100 text-green-800">Business</Badge>
                <Badge className="bg-purple-100 text-purple-800">Influencer</Badge>
                <Badge className="bg-red-100 text-red-800">E-commerce</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Build your Linkie in minutes
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Personalize your profile, add clickable buttons, social links, and embedded content of your choice.
          </p>

          <div className="grid md:grid-cols-3 gap-8 ">
            <div className="text-center rounded-2xl bg-[#f0f8fe]  ">
              <div className="text-6xl font-light text-gray-300 mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3">Create Your Linkie</h3>
              <p className="text-gray-600">
                Sign up and pick your handle. (e.g. linkie.bio/yourname)
              </p>
              <div className="relative w-full h-[266px]">
                <Image fill className="object-contain absolute" alt="Sign up and pick your handle. (e.g. linkie.bio/yourname)" src={'https://framerusercontent.com/images/XyTFuLT8r4J87nJdNqC6bCOkLY.png?scale-down-to=1024&width=1500&height=1391'}></Image>
              </div>
            </div>

            <div className="text-center bg-[#f0f8fe] rounded-2xl">
              <div className="text-6xl font-light text-gray-300 mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3">Add Cards</h3>
              <p className="text-gray-600">
                Link your social posts, videos, websites, or custom embeds.
              </p>
              <div className="relative w-full h-[266px]">
                <Image
                  fill
                  className="object-contain absolute"
                  alt="Sign up and pick your handle. (e.g. linkie.bio/yourname)"
                  src={'https://framerusercontent.com/images/eQlZ4boQL7aoZDZfDHUnEP25nTc.png?scale-down-to=1024&width=3001&height=2539'}
                />
              </div>
            </div>

            <div className="text-center bg-[#f0f8fe] rounded-2xl">
              <div className="text-6xl font-light text-gray-300 mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">Share & Grow</h3>
              <p className="text-gray-600">
                Share it everywhere and track results in real time.
              </p>
              <div className="relative w-full h-[266px]">
                <Image fill className="object-contain absolute" alt="Sign up and pick your handle. (e.g. linkie.bio/yourname)"
                  src={'https://framerusercontent.com/images/LPEmurPAgL7PBmS1DWjEZJsgnE.png?scale-down-to=1024&width=1500&height=1319'}></Image>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One Link Section */}
      <section className="py-20 px-4 bg-pink-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            One link. Endless ways to<br />make it yours.
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Whether you're a creator, shop owner, or entrepreneur, Linkie helps you connect with your audience, your way.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black rounded-2xl p-8 text-white min-h-96">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Loom & Lane LLC.</h3>
                <p className="text-gray-300 text-sm mb-6">
                  At Loom & Lane, we create handcrafted style with care. Explore our latest collections.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 mb-6">
                  Shop Now 🛍️
                </Button>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-sm">Latest Collection</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="text-sm">Summer Vibes Session</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8 text-white min-h-96">
              <div className="text-left">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-semibold">Maya Brooks</h3>
                    <p className="text-gray-400 text-sm">Content Creator</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-6">
                  Helping you level up your marketing & SEO through simple content strategies.
                </p>
                <div className="space-y-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-sm">
                    📊 All Courses
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm">
                    🎯 Free Training
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-sm">
                    📧 Subscribe to My Monthly Strategy Tips
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Add all type of content
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Link and embed your <strong>social profiles</strong>, <strong>posts</strong>, <strong>websites</strong>, <strong>products</strong>, <strong>offers</strong>, <strong>location</strong>, <strong>booking page</strong>, and more.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Your Linkie takes visitors beyond your profile to anywhere else on the web.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href={'/playground'}>
                    Get Started For FREE →
                  </Link>

                </Button>
                <Button variant="outline">
                  <Link href={'/help'}>
                    Learn more
                  </Link>
                </Button>
              </div>
            </div>

            <div className="bg-black rounded-2xl p-8 text-white">
              <video src="https://framerusercontent.com/assets/4FCEIEfAwLTJhf92XulHP9o2vqI.mp4"
                autoPlay
                preload="auto"
                style={{
                  cursor: "auto",
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  display: "block",
                  objectFit: "cover",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  objectPosition: "50% 50%"
                }}
              ></video>
            </div>

          </div>
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-black rounded-2xl p-8 text-white">
                <video src="https://framerusercontent.com/assets/i2pT60cwDRMScnCQGx2P21kis.mp4"
                  autoPlay
                  preload="auto"
                  style={{
                    cursor: "auto",
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    display: "block",
                    objectFit: "cover",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    objectPosition: "50% 50%"
                  }}
                ></video>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Organize your layout with drag & drop
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Easily <strong>add, drag, and resize cards</strong>at any time to create the perfect Linkie layout for your brand. </p>
                <p className="text-lg text-gray-600 mb-8">
                  <strong>     Customize thumbnails and card text</strong>
                  down to the last detail.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href={'/playground'}>
                      Get Started For FREE →
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Link href={'/help'}>
                      Learn more
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Not your typical link-in-bio page. */}
      <section className="bg-[#f0f8fe]  py-12 px-4 text-black flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Not your typical link-in-bio page.</h2>
        <p className="text-xl text-gray-600 mb-16">Linkie goes beyond the basics, helping you look more professional and do more with your one link.</p>
        <div className="flex flex-wrap justify-around w-full max-w-[697px] gap-8 ">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl min-w-[200px] flex-1">
            <h3 className="font-semibold">
              Email collection
            </h3>
            <p>
              Grow your subscriber list directly from your Linkie.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl min-w-[200px] flex-1">
            <h3 className="font-semibold">
              Custom domain
            </h3>
            <p>
              Use your own domain to make your Linkie look professional.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl min-w-[200px] flex-1">
            <h3 className="font-semibold">
              No powered-by banner
            </h3>
            <p>
              Your Linkie stays clean, no branding, for free.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Track what matters with built-in analytics
          </h2>
          <p className="text-xl text-gray-600 mb-16">
            Understand how your Linkie performs with real-time and historical data you can actually use.
          </p>

          <div className="bg-black rounded-2xl p-8 text-white mb-12">
            <div className="text-left">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Analytics</h3>
                <span className="text-sm text-gray-400">Jun 18 - Jun 25</span>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-8">
                <div>
                  <div className="text-2xl font-bold">22.4k</div>
                  <div className="text-xs text-gray-400">Unique Visitors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">18.5k</div>
                  <div className="text-xs text-gray-400">Unique Clicks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">29k</div>
                  <div className="text-xs text-gray-400">Total Visitors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8%</div>
                  <div className="text-xs text-gray-400">Bounce Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.3k</div>
                  <div className="text-xs text-gray-400">Email Subscribers</div>
                </div>
              </div>

              <div className="h-32 rounded-lg mb-16">
                <div className="mt-6 h-48 w-full">
                  <LineChart></LineChart>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Sources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>📘 Facebook</span>
                      <span>6.8K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📱 TikTok</span>
                      <span>5.5K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>📷 Instagram</span>
                      <span>4.9K</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Countries</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>🇦🇱 Albania</span>
                      <span>7.2K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇺🇸 United States</span>
                      <span>6.3K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇽🇰 Kosovo</span>
                      <span>5.1K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">👁️</div>
              <h3 className="text-xl font-semibold mb-3">Visitor insights</h3>
              <p className="text-gray-600">
                See traffic, bounce rate, and top sources.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Button performance</h3>
              <p className="text-gray-600">
                Track total and unique button clicks by source.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Limited Lifetime Deal
          </h2>
          <h3 className="text-3xl font-bold mb-12">
            Pay once, use Linkie Plus forever!
          </h3>
          <p className="text-lg text-gray-300 mb-16">
            Get started for free with Linkie and add all your links in one landing page.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-700 p-8">
              <div className="text-left text-white">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-6">
                  $0 <span className="text-lg font-normal text-gray-400">/ forever</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Unlimited Links, Posts, Embeds</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>SEO Site Settings</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>No Powered-by Banner</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-3">○</span>
                    <span>Integration with Publer</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Get Started For FREE →
                </Button>
              </div>
            </Card>

            <Card className="bg-gray-800 border-pink-500 border-2 p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-pink-500 text-white px-4 py-1">
                  $30/lifetime (limited offer)
                </Badge>
              </div>

              <div className="text-left text-white">
                <h3 className="text-xl font-semibold mb-2">Plus</h3>
                <div className="text-3xl font-bold mb-2">
                  <span className="line-through text-gray-500">$10</span>
                </div>
                <div className="text-lg text-gray-400 mb-6">/ month</div>

                <div className="mb-6">
                  <span className="text-lg font-semibold">Everything in Free plus:</span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Custom Domain</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Email Collection</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Advanced Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Lifetime Deal</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-3">○</span>
                    <span>Dynamic Links</span>
                  </div>
                </div>

                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  Learn More
                </Button>
              </div>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              From the makers of <Link href="#" className="text-blue-400 hover:underline">Publer</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🔗</span>
              </div>
              <span className="text-xl font-bold">Linkie</span>
            </div>

            <p className="text-gray-400 text-center md:text-right">
              The ultimate link in bio platform for creators and businesses
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Kalemi Code. All rights reserved.
            </p>

            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white">Help center</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Terms of service</Link>
              <Link href="#" className="text-gray-400 hover:text-white">Privacy policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
