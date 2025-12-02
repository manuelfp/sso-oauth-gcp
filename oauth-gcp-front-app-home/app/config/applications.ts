export interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  color: string;
}

export const applications: Application[] = [
  {
    id: "oauth-gcp-front",
    name: "Aplicación Institucional 1",
    description: "Sistema de gestión y administración institucional",
    url: process.env.NEXT_PUBLIC_APP_1_URL || "http://localhost:3000",
    color: "blue",
  },
  {
    id: "oauth-gcp-front-2",
    name: "Aplicación Institucional 2",
    description: "Plataforma de servicios y recursos institucionales",
    url: process.env.NEXT_PUBLIC_APP_2_URL || "http://localhost:3001",
    color: "green",
  },
];

