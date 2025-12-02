# OAuth GCP - Demostración de Autenticación con Google Auth Platform

Este proyecto demuestra cómo implementar autenticación OAuth 2.0 usando Google Auth Platform en una aplicación Next.js con NextAuth.js.

## 🚀 Características

- ✅ Autenticación con Google OAuth 2.0
- ✅ Protección de rutas con NextAuth.js
- ✅ Dashboard protegido que muestra información del usuario
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Soporte para modo oscuro

## 📋 Prerrequisitos

- Node.js 18+ y npm/yarn
- Una cuenta de Google Cloud Platform
- Credenciales OAuth 2.0 de Google

## 🔧 Configuración

### 1. Instalar dependencias

```bash
yarn install
# o
npm install
```

### 2. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google+:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google+ API" y habilítala
4. Crea credenciales OAuth 2.0:
   - Ve a "APIs & Services" > "Credentials"
   - Haz clic en "Create Credentials" > "OAuth client ID"
   - Selecciona "Web application"
   - Agrega las siguientes URLs autorizadas:
     - **Authorized JavaScript origins**: `http://localhost:3000`
     - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
5. Copia el **Client ID** y **Client Secret**

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google OAuth Credentials
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-key-aqui
```

**Generar NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

O puedes usar cualquier string aleatorio seguro.

### 4. Ejecutar el proyecto

```bash
yarn dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
oauth-gcp-front-2/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Configuración de NextAuth
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx              # Página de inicio de sesión
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard protegido
│   ├── components/
│   │   └── AuthButton.tsx            # Componente de botón de autenticación
│   ├── providers.tsx                 # Provider de NextAuth
│   ├── layout.tsx                    # Layout principal
│   └── page.tsx                      # Página principal
├── types/
│   └── next-auth.d.ts                 # Tipos TypeScript para NextAuth
├── .env.local                        # Variables de entorno (no versionado)
└── package.json
```

## 🔐 Flujo de Autenticación

1. El usuario hace clic en "Iniciar Sesión" en la página principal
2. Es redirigido a la página de signin (`/auth/signin`)
3. Al hacer clic en "Continuar con Google", se inicia el flujo OAuth
4. Google redirige al usuario para autenticarse
5. Después de la autenticación, Google redirige de vuelta a `/api/auth/callback/google`
6. NextAuth crea una sesión y redirige al usuario al dashboard
7. El dashboard muestra la información del usuario autenticado

## 🛡️ Protección de Rutas

El dashboard está protegido usando el servidor de Next.js:

```typescript
const session = await auth();

if (!session) {
  redirect("/auth/signin");
}
```

## 🎨 Personalización

### Cambiar la URL de redirección después del login

Edita `app/auth/signin/page.tsx`:

```typescript
signIn("google", { callbackUrl: "/tu-ruta-personalizada" })
```

### Agregar más proveedores OAuth

Edita `app/api/auth/[...nextauth]/route.ts` y agrega más proveedores:

```typescript
import GitHub from "next-auth/providers/github";

providers: [
  Google({ ... }),
  GitHub({ ... }),
]
```

## 📚 Recursos

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Documentation](https://nextjs.org/docs)

## 🐛 Solución de Problemas

### Error: "Invalid client secret"

- Verifica que `GOOGLE_CLIENT_SECRET` en `.env.local` sea correcto
- Asegúrate de que no haya espacios extra en las variables de entorno

### Error: "Redirect URI mismatch"

- Verifica que la URL de redirección en Google Cloud Console sea exactamente: `http://localhost:3000/api/auth/callback/google`
- Asegúrate de que `NEXTAUTH_URL` en `.env.local` sea `http://localhost:3000`

### La sesión no persiste

- Verifica que `NEXTAUTH_SECRET` esté configurado correctamente
- Asegúrate de que las cookies estén habilitadas en tu navegador

## 📝 Licencia

Este proyecto es una demostración educativa.
