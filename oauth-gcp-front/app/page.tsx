"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthButton from "./components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
            OAuth GCP Demo
          </h1>
          <AuthButton />
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Autenticación con Google Auth Platform
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Este proyecto demuestra cómo implementar autenticación OAuth 2.0
            usando Google Auth Platform en una aplicación Next.js. Inicia sesión
            con tu cuenta de Google para acceder al dashboard protegido.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {session ? (
            <Link
              href="/dashboard"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 md:w-[200px]"
            >
              Ir al Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-white transition-colors hover:bg-blue-700 md:w-[200px]"
            >
              Iniciar Sesión
            </Link>
          )}
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[200px]"
            href="https://next-auth.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentación
          </a>
        </div>
      </main>
    </div>
  );
}
