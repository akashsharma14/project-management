import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col items-center justify-center p-4 font-body">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
      </div>

      <main className="w-full max-w-md">
        <div className="bg-surface rounded-xl shadow-sm border border-outline-variant/50 overflow-hidden">
          <div className="p-8 md:p-10">

            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl mb-4">
                🚀
              </div>
              <h1 className="text-2xl font-extrabold font-headline">
                SmartPM
              </h1>
              <p className="text-on-surface-variant text-sm mt-1">
                Manage your workflow with elegance
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Password</label>
                  <span className="text-xs text-primary cursor-pointer hover:text-on-primary-fixed-variant">
                    Forgot password?
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
              </div>

              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-on-surface-variant">
                  Remember me for 30 days
                </span>
              </div>

              <button className="w-full bg-primary hover:bg-on-primary-fixed-variant text-white font-bold py-3.5 rounded-lg transition active:scale-[0.98]"
              onClick={() => navigate("/dashboard")}
>
  Login
</button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="border-t border-outline-variant/50" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-surface px-4 text-xs text-on-surface-variant">
                OR CONTINUE WITH
              </span>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzltpjWzGrf-QiLNTjlxtbGuty7Xr4iTfDixy7jhZCkYySfqOycDn_2ahQ-MsQQkFDhzjhoOii_0lEt8TG5AqN_ZoHWiEP4e60dSQt1DSpBVX0a-LpCdrYgsPcf8rA8M3fdGaK9voN4QLB50Nkxjc9EFv-IsEbWINurvemjNuqqpLzUWP_kZsEwuyItkVyLrqtCtJ4O8iicuv_DKm1eU9cuGPFd_Xi5L79YNNYcNped69ZII68BtXQhgeXKtbmeygeFl0-llxiyTgq"
                  className="w-5 h-5"
                />
                Google
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-outline-variant rounded-lg hover:bg-surface-container">
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Don't have an account?
          <span className="ml-1 text-primary font-bold cursor-pointer">
            Sign Up
          </span>
        </p>

        <footer className="flex flex-col md:flex-row justify-center items-center gap-6 py-8 text-sm text-gray-500">
          <span>© 2024 Violet Prism AI. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-primary">Privacy Policy</span>
            <span className="cursor-pointer hover:text-primary">Terms of Service</span>
            <span className="cursor-pointer hover:text-primary">Help Center</span>
          </div>
        </footer>
      </main>
    </div>
  );
}