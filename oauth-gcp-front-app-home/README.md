# Portal Institucional - OAuth GCP

Portal de acceso centralizado que facilita el acceso directo a las aplicaciones institucionales con autenticación Google Auth Platform.

## 🚀 Características

- ✅ Portal centralizado de acceso a aplicaciones institucionales
- ✅ Enlaces directos a aplicaciones (`oauth-gcp-front` y `oauth-gcp-front-2`)
- ✅ Autenticación con Google OAuth 2.0
- ✅ Dashboard personalizado con información del usuario
- ✅ Interfaz moderna con Tailwind CSS
- ✅ Soporte para modo oscuro
- ✅ Configuración flexible de URLs de aplicaciones

## 📋 Prerrequisitos

- Node.js 18+ y npm/yarn
- Una cuenta de Google Cloud Platform
- Credenciales OAuth 2.0 de Google
- Las aplicaciones institucionales deben estar ejecutándose en sus respectivos puertos

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

# URLs de las aplicaciones institucionales (opcional)
# Si no se configuran, se usan los valores por defecto
NEXT_PUBLIC_APP_1_URL=http://localhost:3001
NEXT_PUBLIC_APP_2_URL=http://localhost:3002
```

**Generar NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### 4. Configurar puertos de las aplicaciones

Para que el portal funcione correctamente, las aplicaciones deben ejecutarse en puertos diferentes:

- **Portal Institucional** (`oauth-gcp-front-3`): `http://localhost:3000`
- **Aplicación 1** (`oauth-gcp-front`): `http://localhost:3001`
- **Aplicación 2** (`oauth-gcp-front-2`): `http://localhost:3002`

Para cambiar los puertos, edita el `package.json` de cada aplicación:

```json
{
  "scripts": {
    "dev": "next dev -p 3001"  // Para oauth-gcp-front
    "dev": "next dev -p 3002"  // Para oauth-gcp-front-2
  }
}
```

O usa variables de entorno en `.env.local`:

```env
PORT=3001  # Para oauth-gcp-front
PORT=3002  # Para oauth-gcp-front-2
```

### 5. Ejecutar el proyecto

```bash
yarn dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
oauth-gcp-front-3/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts          # Configuración de NextAuth
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx              # Página de inicio de sesión
│   ├── components/
│   │   ├── AuthButton.tsx            # Componente de botón de autenticación
│   │   └── ApplicationCard.tsx        # Tarjeta de aplicación institucional
│   ├── config/
│   │   └── applications.ts           # Configuración de aplicaciones
│   ├── dashboard/
│   │   └── page.tsx                  # Dashboard del portal
│   ├── providers.tsx                 # Provider de NextAuth
│   ├── layout.tsx                    # Layout principal
│   └── page.tsx                      # Página principal del portal
├── types/
│   └── next-auth.d.ts                 # Tipos TypeScript para NextAuth
├── .env.local                        # Variables de entorno (no versionado)
└── package.json
```

## 🔐 Flujo de Autenticación

1. El usuario accede al portal institucional
2. Puede ver las aplicaciones disponibles sin autenticarse
3. Para acceder a funcionalidades adicionales, puede iniciar sesión con Google
4. Después de la autenticación, el usuario puede acceder directamente a las aplicaciones
5. Las aplicaciones se abren en nuevas pestañas con enlaces directos

## 🎨 Personalización

### Agregar nuevas aplicaciones

Edita `app/config/applications.ts`:

```typescript
export const applications: Application[] = [
  // ... aplicaciones existentes
  {
    id: "nueva-app",
    name: "Nueva Aplicación",
    description: "Descripción de la nueva aplicación",
    url: process.env.NEXT_PUBLIC_APP_3_URL || "http://localhost:3003",
    color: "purple",
  },
];
```

### Cambiar colores de las tarjetas

Los colores disponibles son: `blue`, `green`, `purple`. Puedes agregar más colores editando `ApplicationCard.tsx`.

## 📚 Recursos

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Documentation](https://nextjs.org/docs)

## 🐛 Solución de Problemas

### Las aplicaciones no se abren

- Verifica que las aplicaciones estén ejecutándose en los puertos correctos
- Verifica las URLs en `app/config/applications.ts` o en las variables de entorno
- Asegúrate de que las URLs sean accesibles desde tu navegador

### Error: "Invalid client secret"

- Verifica que `GOOGLE_CLIENT_SECRET` en `.env.local` sea correcto
- Asegúrate de que no haya espacios extra en las variables de entorno

### Error: "Redirect URI mismatch"

- Verifica que la URL de redirección en Google Cloud Console sea exactamente: `http://localhost:3000/api/auth/callback/google`
- Asegúrate de que `NEXTAUTH_URL` en `.env.local` sea `http://localhost:3000`

## 📝 Licencia

Este proyecto es una demostración educativa.
