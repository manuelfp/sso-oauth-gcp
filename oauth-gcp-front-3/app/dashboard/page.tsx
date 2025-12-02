import { auth, signOut } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApplicationCard from "../components/ApplicationCard";
import { applications } from "../config/applications";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 text-xl font-semibold text-black dark:text-zinc-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <svg
                    className="h-5 w-5"
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
                Portal Institucional
              </Link>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Avatar"
                className="h-16 w-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
                Bienvenido, {session.user?.name || "Usuario"}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                {session.user?.email}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
            <p className="text-sm text-green-700 dark:text-green-400">
              ✓ Autenticado exitosamente con Google Auth Platform
            </p>
          </div>
        </div>

        {/* Applications Section */}
        <div className="mb-8">
          <h3 className="mb-6 text-2xl font-semibold text-black dark:text-zinc-50">
            Aplicaciones Institucionales
          </h3>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Accede directamente a las aplicaciones institucionales disponibles.
            Haz clic en cualquier aplicación para abrirla en una nueva pestaña.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
            Acciones Rápidas
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Volver al Portal
            </Link>
            <a
              href="mailto:support@institucion.com"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Contactar Soporte
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

