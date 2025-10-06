"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "操作失败");
      } else {
        setMessage(`✅ 临时密码: ${data.tempPassword}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("服务器错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-10">
        <h2 className="mt-8 text-2xl font-semibold text-white">Forgot Password</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Remember your password?{" "}
          <Link href="/login" className="text-sky-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>

      <Card className="w-full max-w-md bg-[#141517] border border-[#1f2023] text-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-center">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleForgot}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  className="pl-9 bg-[#1a1b1e] border-[#2a2b2f] text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium mt-4"
            >
              {loading ? "Processing..." : "Send Reset Password"}
            </Button>

            {message && (
              <p
                className={`text-sm text-center mt-3 ${
                  message.startsWith("✅") ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
