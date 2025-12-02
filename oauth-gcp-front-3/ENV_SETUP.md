# Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Google OAuth Credentials
# Obtén estas credenciales desde Google Cloud Console:
# https://console.cloud.google.com/apis/credentials

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# URLs de las aplicaciones institucionales (opcional)
# Si no se configuran, se usan los valores por defecto:
# - oauth-gcp-front: http://localhost:3001
# - oauth-gcp-front-2: http://localhost:3002
NEXT_PUBLIC_APP_1_URL=http://localhost:3001
NEXT_PUBLIC_APP_2_URL=http://localhost:3002
```

## Pasos para obtener las credenciales de Google:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea o selecciona un proyecto
3. Habilita la API de Google+ (o Google Identity Platform)
4. Ve a "APIs & Services" > "Credentials"
5. Crea un "OAuth client ID" de tipo "Web application"
6. Configura las URLs autorizadas:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
7. Copia el Client ID y Client Secret

## Generar NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

O usa cualquier string aleatorio seguro de al menos 32 caracteres.

## Configuración de Puertos

Para que el portal funcione correctamente con las aplicaciones, configura los puertos:

### Portal Institucional (oauth-gcp-front-3)
- Puerto: `3000` (por defecto)
- URL: `http://localhost:3000`

### Aplicación 1 (oauth-gcp-front)
- Puerto: `3001`
- URL: `http://localhost:3001`
- Para cambiar el puerto, edita `package.json`:
  ```json
  {
    "scripts": {
      "dev": "next dev -p 3001"
    }
  }
  ```

### Aplicación 2 (oauth-gcp-front-2)
- Puerto: `3002`
- URL: `http://localhost:3002`
- Para cambiar el puerto, edita `package.json`:
  ```json
  {
    "scripts": {
      "dev": "next dev -p 3002"
    }
  }
  ```

## Ejecutar todas las aplicaciones

En terminales separadas:

```bash
# Terminal 1 - Portal
cd oauth-gcp-front-3
yarn dev

# Terminal 2 - Aplicación 1
cd oauth-gcp-front
yarn dev -- -p 3001

# Terminal 3 - Aplicación 2
cd oauth-gcp-front-2
yarn dev -- -p 3002
```
