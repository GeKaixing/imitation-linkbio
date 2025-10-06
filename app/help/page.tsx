import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Star, ChevronRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const frequentlyReadArticles = [
        "How to add website links to Linkie",
        "How to connect a custom domain",
        "How to embed Mastodon posts",
        "How to edit/change your username",
        "How to subscribe to a Linkie account",
        "How to embed Cal.com calendar/link to Linkie"
    ];

    const categories = [
        {
            title: "Account Settings",
            description: "Manage your Linkie profile/account settings.",
            icon: "https://ext.same-assets.com/587514942/127826521.png"
        },
        {
            title: "Linkie Cards",
            description: "Share content, posts, links, embeds and tools in one place.",
            icon: "https://ext.same-assets.com/587514942/576856852.png"
        },
        {
            title: "Email Collections",
            description: "Learn how to collect, manage, and sync email subscribers.",
            icon: "https://ext.same-assets.com/587514942/4261721988.png"
        },
        {
            title: "Analytics",
            description: "View engagement, growth, and key metrics in one place.",
            icon: "https://ext.same-assets.com/587514942/3109105972.png"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-[#1f68d5] text-white">
                <div className="max-w-5xl mx-auto px-6 py-6">
                    {/* Top navigation */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#1f68d5]">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-xl font-semibold">Linkie</span>
                        </div>
                        <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 px-6 py-2">
                            <Link href={'/'}>
                                Go to website
                            </Link>
                        </Button>
                    </div>

                    {/* Title and Search */}
                    <div className="text-center pb-8">
                        <h1 className="text-4xl font-normal mb-8">How can we help you?</h1>
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search our help center..."
                                className="pl-14 py-5 text-base bg-white border-0 rounded-2xl shadow-sm"
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                {/* Frequently Read Articles */}
                <section className="mb-16">
                    <div className="flex items-center mb-6">
                        <Star className="w-6 h-6 text-gray-400 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900">Frequently Read Articles</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {frequentlyReadArticles.map((article, index) => (
                            <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 bg-white">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-800 font-medium">{article}</span>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Browse All Categories */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse All Categories</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {categories.map((category, index) => (
                            <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200 bg-white">
                                <div className="flex items-start space-x-4">
                                    <img
                                        src={category.icon}
                                        alt={category.title}
                                        className="w-12 h-12 rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <div className="bg-[#1f68d5] text-white px-3 py-1 rounded-md text-sm font-medium mb-2 inline-block">
                                            {category.title}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {category.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Not finding what you are looking for?
                            </h3>
                            <p className="text-gray-600">Send us an email.</p>
                        </div>
                        <Button className="bg-[#1f68d5] hover:bg-[#1557c1] text-white">
                            <Mail className="w-4 h-4 mr-2" />
                            Send us an email
                        </Button>
                    </div>
                </div>
                <div className="border-t border-gray-200 py-4">
                    <div className="max-w-4xl mx-auto px-6">
                        <p className="text-center text-gray-500 text-sm">© 2025 Linkie</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
