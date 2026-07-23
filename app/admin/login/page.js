"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Field, TextInput, Btn } from "../../../components/admin/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend only for now — real email/password auth is wired up in the next step.
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px]">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/image/logo.jpg" alt="Imvunwa" width={64} height={64} className="h-16 w-16 rounded-xl object-contain shadow-card" />
          <h1 className="mt-4 text-[22px] font-black text-ink">Admin Login</h1>
          <p className="mt-1 text-[13px] text-muted">Sign in to manage your website</p>
        </div>

        {/* Card */}
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-7 shadow-card">
          <Field label="Email address" htmlFor="email">
            <TextInput
              id="email"
              type="email"
              placeholder="you@imvunwa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Field>

          <Field label="Password" htmlFor="password">
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Field>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[12.5px] text-muted">
              <input type="checkbox" className="h-4 w-4 rounded border-line accent-signal" />
              Keep me signed in
            </label>
            <button type="button" className="text-[12.5px] font-bold text-signal-dark hover:underline">
              Forgot password?
            </button>
          </div>

          <Btn type="submit" className="w-full">Sign in</Btn>

          <p className="pt-1 text-center text-[11.5px] leading-relaxed text-muted">
            Preview mode — login isn&apos;t connected yet. Enter anything and press{" "}
            <strong className="font-bold">Sign in</strong> to explore the dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}
