"use client";

// URL del portal institucional (oauth-gcp-front-3)
// Por defecto: http://localhost:3000
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3002";

export default function HomeButton() {
  return (
    <a
      href={PORTAL_URL}
      className="flex items-center gap-2 rounded-lg bg-zinc-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      title="Volver al Portal Institucional"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
      Home
    </a>
  );
}

