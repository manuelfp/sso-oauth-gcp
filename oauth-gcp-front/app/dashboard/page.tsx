import { auth, signOut } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              Dashboard
            </h1>
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
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
          <h2 className="mb-6 text-2xl font-bold text-black dark:text-zinc-50">
            Bienvenido, {session.user?.name || "Usuario"}
          </h2>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                Información de la Sesión
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-black dark:text-zinc-50">
                  <span className="font-medium">Nombre:</span> {session.user?.name}
                </p>
                <p className="text-black dark:text-zinc-50">
                  <span className="font-medium">Email:</span> {session.user?.email}
                </p>
                {session.user?.image && (
                  <div className="mt-4">
                    <img
                      src={session.user.image}
                      alt="Avatar"
                      className="h-20 w-20 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                Estado de Autenticación
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                ✓ Autenticado exitosamente con Google Auth Platform
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

