"use client";

import { Application } from "../config/applications";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:hover:bg-blue-900/30",
    green: "bg-green-50 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:border-green-800 dark:hover:bg-green-900/30",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:border-purple-800 dark:hover:bg-purple-900/30",
  };

  const buttonColorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <div
      className={`rounded-lg border-2 p-6 transition-all duration-200 ${colorClasses[application.color as keyof typeof colorClasses] || colorClasses.blue}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${buttonColorClasses[application.color as keyof typeof buttonColorClasses] || buttonColorClasses.blue} text-white`}
        >
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-black dark:text-zinc-50">
          {application.name}
        </h3>
      </div>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        {application.description}
      </p>
      <a
        href={application.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${buttonColorClasses[application.color as keyof typeof buttonColorClasses] || buttonColorClasses.blue}`}
      >
        Acceder
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
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}

