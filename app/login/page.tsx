"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "登录失败");
      } else {

        setSuccess("登录成功 🎉");
        router.replace(`/playground?user-id=${data.user['user_id']}`)
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-7 h-7 text-sky-400"
          >
            <path d="M12 2L19 21H5L12 2z" />
          </svg>
          <span className="text-white text-2xl font-semibold">Linkie</span>
        </div>
        <h2 className="mt-8 text-2xl font-semibold text-white">Welcome Back</h2>
        <p className="text-gray-400 mt-1 text-sm">
          New to Linkie?{" "}
          <Link href="/register" className="text-sky-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md bg-[#141517] border border-[#1f2023] text-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-center">
            Log In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-9 bg-[#1a1b1e] border-[#2a2b2f] text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-9 bg-[#1a1b1e] border-[#2a2b2f] text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Error / Success */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium mt-4"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>

            {/* Options */}
            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center space-x-2 text-gray-400">
                <input type="checkbox" className="accent-[#2563eb]" />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-gray-400 hover:text-sky-400">
                Forgot Password?
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
