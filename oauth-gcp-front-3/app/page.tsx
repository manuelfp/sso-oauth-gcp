"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthButton from "./components/AuthButton";
import ApplicationCard from "./components/ApplicationCard";
import { applications } from "./config/applications";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-black dark:text-zinc-50">
                Portal Institucional
              </h1>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black dark:text-zinc-50">
            Bienvenido al Portal Institucional
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Accede de forma rápida y segura a todas las aplicaciones
            institucionales. Selecciona la aplicación que necesites para
            comenzar.
          </p>
        </div>

        {/* Applications Grid */}
        <div className="mb-8">
          <h3 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
            Aplicaciones Disponibles
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </div>

        {/* Authentication Section */}
        {!session && (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
            <h3 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              Acceso Seguro
            </h3>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Inicia sesión con tu cuenta de Google para acceder a todas las
              funcionalidades del portal y las aplicaciones institucionales.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Iniciar Sesión con Google
            </Link>
          </div>
        )}

        {/* User Info Section */}
        {session && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-black dark:text-zinc-50">
                    {session.user?.name}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Ver Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

